import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../buttons/Button';

export interface DropdownOption {
	value: string;
	displayValue: string;
}

export interface SelectProps {
	id?: string;
	style?: React.CSSProperties;
	className?: string;
	optionsClassName?: string;
	optionsStyle?: React.CSSProperties;
	trigger?: React.ReactNode;
	disabled?: boolean;
	title?: string;
	headerTitle?: string; // Optional custom header text, if not provided uses title
	options: DropdownOption[];
	preselectedOption?: string;
	onChange?: (selectedOption: string | null) => void;
	openX?: "left" | "right";
	openY?: "up" | "down";
	width?: string;
}

export interface SelectHandle {
	getSelectedOption: () => string | null;
	setSelectedOption: (option: string | null) => void;
	clear: () => void;
	open: () => void;
	close: () => void;
}

const Select = React.forwardRef<SelectHandle, SelectProps>(function Select(
	{
		id,
		style,
		className,
		optionsClassName,
		optionsStyle,
		trigger,
		disabled,
		title = "Select Option",
		headerTitle,
		options,
		preselectedOption = null,
		onChange,
		openX,
		openY,
		width,
	},
	ref
) {
	// State and Refs
	const [open, setOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const [selectedOption, setSelectedOption] = React.useState<string | null>(preselectedOption);

	// Trigger width: ensure dropdown is at least as wide as the trigger (or 200px)
	const triggerRef = React.useRef<HTMLSpanElement | null>(null);
	const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

	// Measurer for actual menu width (may exceed the CSS min-width)
	const measurerRef = React.useRef<HTMLDivElement | null>(null);
	const [measuredMenuWidth, setMeasuredMenuWidth] = React.useState<number | null>(null);

	function measureMenuWidth(): void {
		const node = measurerRef.current;
		if (!node) return;
		const w = Math.max(node.offsetWidth || 0, 200);
		setMeasuredMenuWidth(w);
	}

	React.useEffect(() => {
		function measureAll() {
			const btn = triggerRef.current;
			if (btn) {
				const tw = Math.round(btn.getBoundingClientRect().width) || 0;
				setTriggerWidth(tw);
			}
			measureMenuWidth();
		}
		measureAll();
		const handleResize = () => window.requestAnimationFrame(measureAll);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [options, preselectedOption]);

	function hasSpaceBelow() {
		if (openY === "up") return false;
		if (!dropdownRef.current) return false;
		const margin = 4;
		const optionHeight = 36;
		const headerHeight = 40;
		const maxOptionsBeforeScroll = Math.min(options.length, 7);
		const dropdownHeight = maxOptionsBeforeScroll * optionHeight + headerHeight;
		const { bottom: dropdownBottom } = dropdownRef.current.getBoundingClientRect();
		const optionsBottom = dropdownBottom + margin + dropdownHeight;
		return optionsBottom <= window.innerHeight;
	}

	function hasSpaceOnRight() {
		if (openX === "left") return false;
		if (!triggerRef.current) return false;
		const { right: triggerRight } = triggerRef.current.getBoundingClientRect();
		const menuWidth = (measuredMenuWidth && measuredMenuWidth > triggerWidth)
			? measuredMenuWidth
			: Math.max(triggerWidth || 0, 200);
		const margin = 8;
		return triggerRight + menuWidth + margin <= window.innerWidth;
	}

	function handleOptionClick(value: string) {
		setSelectedOption(value);
		setOpen(false);
		if (onChange) onChange(value);
	}

	function toggleDropdownOpen() { setOpen((prev) => !prev); }

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
		}
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	React.useImperativeHandle(ref, () => ({
		getSelectedOption: () => selectedOption,
		setSelectedOption: (opt: string | null) => { setSelectedOption(opt); if (onChange) onChange(opt); },
		clear: () => { setSelectedOption(null); if (onChange) onChange(null); },
		open: () => setOpen(true),
		close: () => setOpen(false),
	}), [selectedOption, onChange]);

	const effectiveMinWidth = (measuredMenuWidth && measuredMenuWidth > triggerWidth)
		? measuredMenuWidth
		: Math.max(triggerWidth || 0, 200);

		return (
			<div className={className ? `${className} relative` : 'relative'} style={{ width, ...style }} ref={dropdownRef} id={id}>
				{trigger ? (
					<span ref={triggerRef} onClick={disabled ? undefined : toggleDropdownOpen} className="cursor-pointer inline-block">
						{trigger}
					</span>
				) : (
					<span ref={triggerRef} className="relative block">
						<Button
							onClick={toggleDropdownOpen}
							disabled={disabled}
							title={title}
              variant="outline"
							className="!justify-start active:scale-[1] w-full overflow-hidden"
              style={{ width: '100%' }}
						>
							{/* Invisible placeholder to maintain button height */}
							<span className="opacity-0">-</span>
						</Button>
						{/* Text overlay */}
						<span 
							className="absolute left-4 top-1/2 -translate-y-1/2 truncate text-left text-gray-700 text-md pointer-events-none"
							style={{ maxWidth: 'calc(100% - 64px)' }}
						>
							{selectedOption
								? options.find(opt => opt.value === selectedOption)?.displayValue
								: title
							}
						</span>
						<FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 text-xs pointer-events-none" aria-hidden="true" />
					</span>
				)}

				{/* Options Menu */}
				{open && (
					<div
						className={`absolute ${hasSpaceBelow() ? 'top-full mt-1' : 'bottom-full mb-1'} ${hasSpaceOnRight() ? 'left-0' : 'right-0'} bg-white border border-gray-300 rounded shadow-lg z-50 ${optionsClassName || ''}`}
						style={{ zIndex: 50, minWidth: `${effectiveMinWidth}px`, ...optionsStyle }}
					>
						{/* Header title */}
						<div className="p-2 border-b border-gray-200">
							<span className="text-sm font-medium text-gray-700">{headerTitle || title}</span>
						</div>

						{/* Options List */}
						<div className="options-wrap max-h-60 overflow-y-auto">
							<ul className="list-none m-0 p-0">
								{options.map(opt => (
									<li key={opt.value} onClick={() => handleOptionClick(opt.value)}>
										<span className="w-full text-left p-2 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm text-gray-700">
											<span className="truncate">{opt.displayValue}</span>
											{selectedOption === opt.value
												? <FaTick className="ml-3 text-gray-500 text-xs flex-shrink-0" aria-hidden="true" />
												: <span className="ml-6"></span>
											}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
				<div
					ref={measurerRef}
					aria-hidden="true"
					style={{
						position: 'absolute',
						top: -99999,
						left: -99999,
						visibility: 'hidden',
						pointerEvents: 'none',
					}}
				>
					<div className="bg-white border border-gray-300 rounded shadow-lg min-w-[200px]">
						<div className="p-2 border-b border-gray-200">
							<span className="text-sm font-medium text-gray-700">{title}</span>
						</div>
						<div className="options-wrap max-h-60">
							<ul className="list-none m-0 p-0">
								{options.map(opt => (
									<li key={opt.value}>
										<div className="w-full text-left p-2 flex items-center justify-between text-sm text-gray-700">
											<span className="truncate">{opt.displayValue}</span>
											{selectedOption === opt.value ? (
												<FaTick className="ml-3 text-black text-xs flex-shrink-0" aria-hidden="true" />
											) : (
												<span className="w-3" />
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
});

export default Select;
