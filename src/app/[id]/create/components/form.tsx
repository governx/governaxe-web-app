"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { Calendar } from "@/components/ui/calendar";

import { useAccount } from "wagmi";
import { snapshotClient } from "@/lib/snapshotClient";
import { useWeb3Provider } from "@/lib/ethers";
import { FormSchema, ProposalType, chainList } from "@/lib/form";
import moment from "moment";

export function InputForm({ spaceId }: { spaceId: string }) {
  const { address } = useAccount();
  const provider = useWeb3Provider();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!provider) {
      // Handle the case when provider is undefined
      toast({
        title: "Web3Provider is undefined",
        description: "Please connect your wallet",
      });
      return;
    }

    if (!address) {
      toast({
        title: "Address is undefined",
        description: "Please connect your wallet",
      });
      return;
    }

    console.log("data", data);
    const startTime = moment(data.start_time).add(data.start_time_2, "hours").unix();
    const endTime = moment(data.end_time).add(data.end_time_2, "hours").unix();

    console.log("endTime", endTime);

    console.log("Date endTime", new Date(endTime * 1000));
    const endTimeDate = moment(endTime).format("YYYY-MM-DDTHH:mm:ss.sssZ");

    let proposalType = data.type as ProposalType;
    // console.log("startTime", startTimeDate);
    console.log("endTimeDate", endTimeDate);
    try {
      const receipt = await snapshotClient.proposal(provider, address, {
        space: spaceId,
        type: proposalType,
        title: data.title,
        body: data.description,
        choices: ["For", "Against", "Abstain"],
        start: startTime,
        end: endTime,
        snapshot: data.snapshot_block, //snapshot is block number
        plugins: JSON.stringify({}),
        discussion: "",
      });
      console.log("receipt", receipt);
      const res = await fetch("/api/proposal", {
        method: "POST",
        body: JSON.stringify({
          src_chain: data.src_chain,
          proposals: data.proposals,
          run_at: endTimeDate,
        }),
      });
      console.log("res", res);
    } catch (e) {
      console.log("e", e);
      console.log("error");
    }

    // toast({
    //   title: "Success",
    //   description: "Your proposal has been submitted",
    // });
  }

  const proposals = useFieldArray({
    name: "proposals",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='md:w-3/4 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select disabled>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue defaultValue='basic' placeholder='Basic Voting' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='basic'>Basic Voting</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={form.control}
              name='start_time'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Voting Start time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <Icons.caldendar className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-4'>
            <FormField
              control={form.control}
              name='start_time_2'
              render={({ field }) => (
                <FormItem className='mt-5 w-20'>
                  <FormControl>
                    <Input {...field} placeholder='10:00' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4'>
            <FormField
              control={form.control}
              name='end_time'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Voting End time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <Icons.caldendar className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-4'>
            <FormField
              control={form.control}
              name='end_time_2'
              render={({ field }) => (
                <FormItem className='mt-5 w-20'>
                  <FormControl>
                    <Input {...field} placeholder='11:00' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='snapshot_block'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snapshot Block</FormLabel>
              <FormControl>
                <Input placeholder='0' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-6 gap-4'>
          <FormField
            control={form.control}
            name='src_chain'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='w-[200px]'>Source Chain</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          "justify-between w-[200px]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? chainList.find((chain) => chain.value === field.value)?.label
                          : "Select chain"}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=' p-0'>
                    <Command>
                      <CommandInput placeholder='Search framework...' />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {chainList.map((chain) => (
                          <CommandItem
                            value={chain.label}
                            key={chain.value}
                            onSelect={() => {
                              form.setValue(`src_chain`, chain.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                chain.value === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {chain.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-12 '>
          <div className='col-span-12 mt-8 gap-2 flex flex-col '>
            {proposals.fields.map((field, index) => {
              return (
                <>
                  <div className='flex flex-row gap-4'>
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`proposals.${index}.dst_chain`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Destination Chain
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant='outline'
                                  role='combobox'
                                  className={cn(
                                    "justify-between w-[200px]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? chainList.find((chain) => chain.value === field.value)?.label
                                    : "Select chain"}
                                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className=' p-0'>
                              <Command>
                                <CommandInput placeholder='Search framework...' />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {chainList.map((chain) => (
                                    <CommandItem
                                      value={chain.label}
                                      key={chain.value}
                                      onSelect={() => {
                                        form.setValue(`proposals.${index}.dst_chain`, chain.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          chain.value === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {chain.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`proposals.${index}.dst_contract`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Destination Contract
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='0x1234...5678' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`proposals.${index}.calls.func_selector`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Function Selector
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='function' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`proposals.${index}.calls.args`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>Arguments</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='value' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`proposals.${index}.calls.value`}
                      render={({ field }) => (
                        <FormItem className='w-[80px]'>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>Value</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='value' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* //TODO: add remove button */}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className=' bg-red-700 mt-8'
                      onClick={() => {
                        proposals.remove(index);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </>
              );
            })}
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={() => {
                proposals.append({
                  calls: {
                    args: "",
                    func_selector: "",
                    target: "",
                    value: 0,
                  },
                  dst_chain: "",
                  dst_contract: "",
                });
              }}
            >
              Add Proposal
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name='discussion'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discussion (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder='https://forum.governaxe.xyz/proposal/1' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
