




import './Input.css';

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
    <div className={`input-wrapper ${className || ''}`} style={width ? { width } : {}}>
      {label && <label htmlFor={id} className="input-label">{label}{required && <span className="input-required-mark">*</span>}</label>}
      <div className="input-field-wrapper">
        <input
          type={type}
          name={name}
          className="input-field"
          id={id}
          style={width ? { width, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style } : { opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text', ...style }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          title={title}
        />
        {errorMessage && <span className="input-error-message">{errorMessage}</span>}
        {message && <span className="input-message">{message}</span>}
      </div>
    </div>
  );
}