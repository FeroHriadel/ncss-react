




export interface InputProps {
  type?: 'text';
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  label?: string;
  width?: string;
  errorMessage?: string;
  message?: string;
}



export default function Input({ type, name, className, id, style, value, onChange = () => {}, placeholder, disabled, required, title, label, width, errorMessage, message }: InputProps) {

  if (!id) id=`ncss-input-${Math.random().toString(10)}`;

  return (
    <div className={`w-full ${className || ''}`} style={width ? { width } : {}}>
      {label && <label htmlFor={id} className="mb-2 text-sm text-gray-600">{label}{required && <span className="ml-1">*</span>}</label>}
      <div className="relative">
        <input
          type={type}
          name={name}
          className={`outline-none border border-gray-300 rounded-md text-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 placeholder:text-gray-600 placeholder:font-light placeholder:italic w-full h-10 indent-3`}
          id={id}
          style={width ? { width, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style } : { opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          title={title}
        />
        {errorMessage && <span className="text-xs text-red-900 absolute left-0 top-full translate-y-1">{errorMessage}</span>}
        {message && <span className="text-xs text-gray-600 absolute left-0 top-full translate-y-1">{message}</span>}
      </div>
    </div>
  );
}