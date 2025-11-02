export interface TextareaProps {
  name?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  label?: string;
  width?: string;
  height?: string;
  rows?: number;
  errorMessage?: string;
  message?: string;
}

export default function Textarea({ 
  name, 
  className, 
  id, 
  style, 
  value, 
  onChange = () => {}, 
  placeholder, 
  disabled, 
  required, 
  title, 
  label, 
  width, 
  height,
  rows = 4,
  errorMessage, 
  message 
}: TextareaProps) {

  if (!id) id=`ncss-textarea-${Math.random().toString(10)}`;

  return (
    <div className={`w-full ${className || ''}`} style={width ? { width } : undefined}>
      {label && <label htmlFor={id} className="block mb-2 text-sm text-gray-600">{label}{required && <span className="ml-1">*</span>}</label>}
      <div className="relative">
        <textarea
          name={name}
          className={`outline-none border border-gray-300 rounded-md text-base bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-200 placeholder:text-gray-600 placeholder:font-light placeholder:italic w-full p-3 resize-y ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          id={id}
          style={height ? { height, ...style } : style}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          title={title}
          rows={rows}
        />
        {errorMessage && <span className="text-xs text-red-900 absolute left-0 top-full">{errorMessage}</span>}
        {message && <span className="text-xs text-gray-600 absolute left-0 top-full">{message}</span>}
      </div>
    </div>
  );
}
