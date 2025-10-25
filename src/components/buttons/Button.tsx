


export interface ButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  variant?: 'dark' | 'transparent';
}


const Button: React.FC<ButtonProps> = ({
  className,
  id,
  style,
  onClick,
  children,
  disabled,
  title,
  size = 'md',
  width,
  variant = 'dark',
}) => {

  function getButtonHeight() {
    switch (size) {
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
    switch (size) {
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

  function getVariantClass() {
    if (variant === 'transparent') return 'bg-transparent text-gray-700 border border-gray-500 hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100';
    if (variant === 'dark') return 'bg-gray-900 text-white border border-black hover:bg-gray-950 active:bg-gray-950 focus:bg-gray-950';
    return ''
  }


  return (
    <button
      className={
        'appearance-none rounded p-0 px-4 m-0 shadow-none outline-none min-h-8 flex justify-center items-center font-medium ' +
        getButtonHeight() + ' ' +
        getTextSize() + ' ' +
        getVariantClass() + ' ' +
        (className || '')
      }
      id={id}
      style={{ width, ...style }}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span className="leading-none p-0 m-0 flex justify-center items-center -translate-y-[1px]">
        {children}
      </span>
    </button>
  );
};

export default Button;