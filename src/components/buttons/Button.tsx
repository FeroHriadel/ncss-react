


import './Button.css';

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
  variant?: 'dark' | 'outline' | 'transparent' | 'red';
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaHaspopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  type?: 'button' | 'submit' | 'reset';
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
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaHaspopup,
  type = 'button',
}) => {

  function getButtonHeight() {
    switch (size) {
      case 'sm':
        return 'button-height-sm';
      case 'md':
        return 'button-height-md';
      case 'lg':
        return 'button-height-lg';
      default:
        return 'button-height-md';
    }
  }

  function getTextSize() {
    switch (size) {
      case 'sm':
        return 'button-text-sm';
      case 'md':
        return 'button-text-md';
      case 'lg':
        return 'button-text-lg';
      default:
        return 'button-text-md';
    }
  }

  function getVariantClass() {
    switch (variant) {
      case 'dark': 
        return 'button-variant-dark';
      case 'outline': 
        return 'button-variant-outline';
      case 'red':
        return 'button-variant-red'
      case 'transparent': 
        return 'button-variant-transparent';
      default: 
        return '';
    }
  }

  // If className contains bg-*, text-*, or border-*, remove the default bg/text/border classes
  function filterVariantClass(variantClass: string, className?: string) {
    if (!className) return variantClass;
    let filtered = variantClass;
    // Remove variant class if custom background is provided
    if (/\bbg-\S+/.test(className) || /background/.test(className)) {
      filtered = '';
    }
    return filtered;
  }


  return (
    <button
      type={type}
      className={
        [
          'button-base',
          disabled ? 'button-cursor-not-allowed' : 'button-cursor-pointer',
          getButtonHeight(),
          getTextSize(),
          filterVariantClass(getVariantClass(), className),
          className
        ].filter(Boolean).join(' ')
      }
      id={id}
      style={{ width, ...style }}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      aria-disabled={disabled}
    >
      <span className="button-content">
        {children}
      </span>
    </button>
  );
};

export default Button;