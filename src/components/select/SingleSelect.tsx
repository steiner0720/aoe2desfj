import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SingleSelectProps = {
  onChange: (value: string) => void;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
};

function SingleSelect({
  onChange,
  defaultValue,
  options,
  placeholder = "Select a option",
  label,
}: Readonly<SingleSelectProps>) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label ? <SelectLabel>{label}</SelectLabel> : null}
          {options?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default SingleSelect;
