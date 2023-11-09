type Props = {
  id: string;
  name: string;
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  touched: boolean | undefined;
};

const CheckBox = ({
  id,
  name,
  type = "checkbox",
  label,
  onChange,
  errors,
  touched,
}: Props) => {
  return (
    <>
      <div className="flex items-center mt-4">
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {errors && touched && (
        <div className="text-red-500 text-sm mt-1">{errors}</div>
      )}
    </>
  );
};

export default CheckBox;
