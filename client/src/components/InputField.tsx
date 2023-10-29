type Props = {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: string | undefined;
  touched: boolean | undefined;
};

const inputField = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  errors,
  touched,
}: Props) => {
  return (
    <div className="relative h-14 w-full min-w-[200px] mb-4">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="peer h-10 w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
      />
      <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-10 w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        {label}
      </label>
      {errors && touched && (
        <div className="text-red-500 text-sm mt-1">{errors}</div>
      )}
    </div>
  );
};

export default inputField;
