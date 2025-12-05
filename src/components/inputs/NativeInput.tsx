import React from "react";
import './NativeInput.css';

export type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const NativeInput = React.forwardRef<HTMLInputElement, NativeInputProps>(function NativeInput(
	props,
	ref
) {
  const className = `native-input ${props.className ? props.className : ''}`.trim();  
  const propsCopy = { ...props };
  delete propsCopy.className;

	return (
		<input
			ref={ref}
			className={className}
			{...propsCopy}
		/>
	);
});

export default NativeInput;
