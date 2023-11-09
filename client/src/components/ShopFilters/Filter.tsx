import { Checkbox } from "primereact/checkbox";

type Props = {
  name: string;
  checked: boolean;
  onChange: () => void;
};

const Filter = ({ name, checked, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <span>{name}</span>
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
};

export default Filter;
