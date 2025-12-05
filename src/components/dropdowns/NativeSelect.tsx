import React from "react";
import { FaChevronDown } from 'react-icons/fa';
import './NativeSelect.css';

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
	props,
	ref
) {
	return (
		<div className="native-select-container">
			<select
				ref={ref}
				className="native-select"
				{...props}
			/>
			<FaChevronDown className="native-select-chevron" aria-hidden="true" />
		</div>
	);
});

export default NativeSelect;
