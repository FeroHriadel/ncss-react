import './Textarea.css';

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
    <div className={`textarea-wrapper ${className || ''}`} style={width ? { width } : undefined}>
      {label && <label htmlFor={id} className="textarea-label">{label}{required && <span className="textarea-required">*</span>}</label>}
      <div className="textarea-container">
        <textarea
          name={name}
          className={`textarea-field ${disabled ? 'textarea-disabled' : ''}`}
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
        {errorMessage && <span className="textarea-error-message">{errorMessage}</span>}
        {message && <span className="textarea-message">{message}</span>}
      </div>
    </div>
  );
}
