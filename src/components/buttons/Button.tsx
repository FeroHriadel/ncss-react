


export interface ButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  variant?: 'sm' | 'md' | 'lg';
  width?: string;
}


const Button: React.FC<ButtonProps> = ({
  className,
  id,
  style,
  onClick,
  children,
  disabled,
  title,
  variant='md',
  width
}) => {

  function getButtonHeight() {
    switch (variant) {
      case 'sm':
        return 'h-6';
      case 'md':
        return 'h-10';
      case 'lg':
        return 'h-12';
      default:
        return 'h-10';
    }
  }

  function getTextSize() {
    switch (variant) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-md';
    }
  }

  return (
    <button
      className={'appearance-none rounded bg-transparent border border-gray-500 p-0 px-4 m-0 shadow-none outline-none min-h-8 flex justify-center items-center hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100 font-medium ' + getButtonHeight() + ' ' + getTextSize() + ' ' + className}
      id={id}
      style={{ width, ...style }}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span className="leading-none p-0 m-0 flex justify-center items-center text-gray-700 -translate-y-[1px]">
        {children}
      </span>
    </button>
  );
};

export default Button;