




export interface InputProps {
  type?: 'text' | 'password' | 'email'
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  title?: string;
  label?: string;
  width?: string;
}



export default function Input({ type, name, className, id, style, value, onChange = () => {}, placeholder, disabled, title, label, width }: InputProps) {

  if (!id) id=`ncss-input-${Math.random().toString(10)}`;

  return (
    <div className={`flex flex-col items-center w-full`} style={width ? { width } : {}}>
      {label && <label htmlFor={id} className="mb-2 text-sm text-gray-600">{label}</label>}
      <input
        type={type || 'text'}
        name={name}
        className={`outline-none border border-gray-300 rounded-md text-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 placeholder:text-gray-600 placeholder:font-light w-full h-10 indent-3 italic ${className}`}
        id={id}
        style={width ? { width, ...style } : { ...style }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        title={title}
      />
    </div>
  );
}