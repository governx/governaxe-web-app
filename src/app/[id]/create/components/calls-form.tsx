// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";

// import { FormSchema, ProposalType, chainList } from "@/lib/form";

// export function ExecutionForm() {
//   return (
//     <>
//       <div className='col-span-3 mt-8 gap-2 flex flex-col'>
//         {chains.fields.map((field, index) => (
//           <FormField
//             key={field.id}
//             control={form.control}
//             name={`chains.${index}.value`}
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant='outline'
//                         role='combobox'
//                         className={cn(
//                           "w-[200px] justify-between",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         {field.value
//                           ? chainList.find((chain) => chain.value === field.value)?.label
//                           : "Select chain"}
//                         <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0'>
//                     <Command>
//                       <CommandInput placeholder='Search framework...' />
//                       <CommandEmpty>No framework found.</CommandEmpty>
//                       <CommandGroup>
//                         {chainList.map((chain) => (
//                           <CommandItem
//                             value={chain.label}
//                             key={chain.value}
//                             onSelect={() => {
//                               form.setValue(`chains.${index}.value`, chain.value);
//                             }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 chain.value === field.value ? "opacity-100" : "opacity-0"
//                               )}
//                             />
//                             {chain.label}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}
//       </div>
//       <div className='col-span-3 mt-8 gap-2 flex flex-col'>
//         {values.fields.map((field, index) => (
//           <FormField
//             control={form.control}
//             key={field.id}
//             name={`values.${index}.value`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input {...field} placeholder='value' />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}
//       </div>
//       <div className='col-span-3 mt-8 gap-2 flex flex-col'>
//         {functions.fields.map((field, index) => (
//           <FormField
//             control={form.control}
//             key={field.id}
//             name={`functions.${index}.value`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input {...field} placeholder='function' />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}
//       </div>
//     </>
//   );
// }
