import * as Select from '@radix-ui/react-select';

interface SelectDropdownProps {
 value: number;
 onChange: (value: string) => void;
 onDone: () => void;
 isError: boolean;
 readOnly: boolean;
 options?: { value: string; label: string }[];
}

export function SelectDropdown({
 value,
 onChange,
 onDone,
 isError,
 readOnly,
 options = [
   { value: "1", label: 'Option 1' },
   { value: "2", label: 'Option 2' },
   { value: "3", label: 'Option 3' }
 ]
}: SelectDropdownProps) {
 return (
   <Select.Root
     value={value.toString()}
     onValueChange={(newValue) => {
       onChange(newValue);
       onDone();
     }}
     disabled={readOnly}
   >
     <Select.Trigger
       className={`flex items-center justify-between px-3 py-2 border rounded-4 w-full ${
         isError ? 'border-secondary-four-500' : 'border-gray-300'
       } ${readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
     >
       <Select.Value />
       <Select.Icon>▼</Select.Icon>
     </Select.Trigger>
     
     <Select.Portal>
       <Select.Content className="bg-white border rounded shadow-lg z-50">
         <Select.Viewport className="p-1">
           {options.map((option) => (
             <Select.Item
               key={option.value}
               value={option.value.toString()}
               className="px-3 py-2 cursor-pointer hover:bg-gray-100 data-[highlighted]:bg-gray-100"
             >
               <Select.ItemText>{option.label}</Select.ItemText>
             </Select.Item>
           ))}
         </Select.Viewport>
       </Select.Content>
     </Select.Portal>
   </Select.Root>
 );
}