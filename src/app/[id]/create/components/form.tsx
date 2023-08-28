"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import * as z from "zod";

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
import moment from "moment";

const chainList = [
  { label: "Ethereum", value: "ETH" },
  { label: "Optimism", value: "OP" },
  { label: "Base", value: "BASE" },
  { label: "Arbitrum", value: "ARB" },
] as const;

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  discussion: z
    .string()
    .min(2, {
      message: "Discussion must be at least 2 characters.",
    })
    .optional(),
  snapshot_block: z.coerce.number(),
  execution_block: z.coerce.number(),
  contracts: z.array(
    z.object({
      value: z.string().min(2, { message: "Please enter a valid URL." }),
    })
  ),
  chains: z.array(
    z.object({
      value: z.string().min(2, { message: "Please enter a valid URL." }),
    })
  ),
  values: z.array(
    z.object({
      value: z.string().min(2, { message: "Please enter a valid URL." }),
    })
  ),
  functions: z.array(
    z.object({
      value: z.string().min(2, { message: "Please enter a valid URL." }),
    })
  ),
  start_time: z.date(),
  end_time: z.date(),
});

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

    // const now = moment();
    // const start = now.unix(); // Current timestamp
    // const end = now.add(1, "hour").unix(); // Timestamp 1 hour from now

    // console.log("start", start);
    // console.log("end", end);
    try {
      const receipt = await snapshotClient.proposal(provider, address, {
        space: spaceId,
        type: "single-choice",
        title: data.title,
        body: data.description,
        choices: ["Alice", "Bob", "Carol"],
        start: moment(data.start_time).unix(),
        end: moment(data.end_time).unix(),
        snapshot: data.snapshot_block, //snapshot is block number
        plugins: JSON.stringify({}),
        discussion: "",
      });
      console.log("receipt", receipt);
    } catch (e) {
      console.log("error");
      // toast({
      //   title: "Error",
      // });
    }
    // toast({
    //   title: "Success",
    //   description: "Your proposal has been submitted",
    // });
  }

  const contracts = useFieldArray({
    name: "contracts",
    control: form.control,
  });

  const chains = useFieldArray({
    name: "chains",
    control: form.control,
  });

  const values = useFieldArray({
    name: "values",
    control: form.control,
  });

  const functions = useFieldArray({
    name: "functions",
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
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <FormField
          control={form.control}
          name="execution_block"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Execution Block</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-3'>
            {contracts.fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`contracts.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Contracts (multi-chain)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='0x1234...5678' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={() => {
                contracts.append({ value: "" });
                chains.append({ value: "" });
                values.append({ value: "" });
                functions.append({ value: "" });
              }}
            >
              Add Chain
            </Button>
          </div>
          <div className='col-span-3 mt-8 gap-2 flex flex-col'>
            {chains.fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`chains.${index}.value`}
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              "w-[200px] justify-between",
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
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search framework...' />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {chainList.map((chain) => (
                              <CommandItem
                                value={chain.label}
                                key={chain.value}
                                onSelect={() => {
                                  form.setValue(`chains.${index}.value`, chain.value);
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
            ))}
          </div>
          <div className='col-span-3 mt-8 gap-2 flex flex-col'>
            {values.fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`values.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder='value' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className='col-span-3 mt-8 gap-2 flex flex-col'>
            {functions.fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`functions.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder='function' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
