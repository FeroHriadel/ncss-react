import React from "react";
import { FaCheck as FaTick } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../buttons/Button';
import './Select.css';

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
	label?: string;
	required?: boolean;
	name?: string;
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
		width = '200px',
		label,
		required = false,
		name = 'ncss-select'
	},
	ref
) {
	// State and Refs
	const [open, setOpen] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const [selectedOption, setSelectedOption] = React.useState<string | null>(preselectedOption);
	const [focusedIndex, setFocusedIndex] = React.useState(-1);
	const menuRef = React.useRef<HTMLDivElement>(null);

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

	// Autofocus menu when it opens
	React.useEffect(() => {
		if (open && menuRef.current) {
			menuRef.current.focus();
		}
	}, [open]);

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
		if (openX === "right") return true;
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

	function toggleDropdownOpen() { 
		setOpen((prev) => {
			if (!prev) {
				// Opening - focus first option or selected option
				const selectedIndex = selectedOption 
					? options.findIndex(opt => opt.value === selectedOption)
					: 0;
				setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
			} else {
				// Closing
				setFocusedIndex(-1);
			}
			return !prev;
		});
	}

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
				setFocusedIndex(-1);
			}
		}
		
		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setOpen(false);
				setFocusedIndex(-1);
			}
		}
		
		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscapeKey);
		}
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
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

	const selectId = id || `ncss-select-${Math.random().toString(10)}`;
	const menuId = `${selectId}-menu`;

	// Keyboard navigation for dropdown menu
	function handleMenuKeyDown(e: React.KeyboardEvent) {
		if (!open) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setFocusedIndex(prev => (prev + 1) % options.length);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
				break;
			case 'Home':
				e.preventDefault();
				setFocusedIndex(0);
				break;
			case 'End':
				e.preventDefault();
				setFocusedIndex(options.length - 1);
				break;
			case ' ':
				e.preventDefault();
				if (focusedIndex >= 0 && focusedIndex < options.length) {
					const focusedOption = options[focusedIndex];
					handleOptionClick(focusedOption.value);
				}
				break;
			case 'Enter':
				e.preventDefault();
				if (focusedIndex >= 0 && focusedIndex < options.length) {
					const focusedOption = options[focusedIndex];
					handleOptionClick(focusedOption.value);
				}
				break;
		}
	}

		return (
			<div 
				className={`select-wrapper ${className || ''}`}
				style={{ width, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', ...style }} 
				ref={dropdownRef} 
				id={selectId}
			>
				<input type="hidden" name={name} value={selectedOption || ''} />
				{label && (
					<label
						htmlFor={selectId}
						className="select-label"
					>
						{label}
						{required && <span className="select-required-mark">*</span>}
					</label>
				)}
				{
					trigger 
					?
					/* Custom Trigger */
					<span 
						ref={triggerRef} 
						onClick={disabled ? undefined : toggleDropdownOpen} 
						className="select-trigger-custom"
						role="button"
						tabIndex={0}
						aria-haspopup="listbox"
						aria-expanded={open}
						aria-controls={menuId}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								if (!disabled) toggleDropdownOpen();
							}
							if (e.key === 'ArrowDown' && !open) {
								e.preventDefault();
								if (!disabled) {
									setOpen(true);
									setFocusedIndex(0);
								}
							}
							if (e.key === 'ArrowUp' && !open) {
								e.preventDefault();
								if (!disabled) {
									setOpen(true);
									setFocusedIndex(options.length - 1);
								}
							}
						}}
					>
						{trigger}
					</span>
					:
					/* Default Trigger */
					<span 
						ref={triggerRef} 
						className="select-trigger-default"
						onKeyDown={(e: React.KeyboardEvent) => {
							if (e.key === 'ArrowDown' && !open) {
								e.preventDefault();
								setOpen(true);
								setFocusedIndex(0);
							}
							if (e.key === 'ArrowUp' && !open) {
								e.preventDefault();
								setOpen(true);
								setFocusedIndex(options.length - 1);
							}
						}}
					>
						<Button
							onClick={toggleDropdownOpen}
							disabled={disabled}
							title={title}
              				variant="outline"
							className="!justify-start active:scale-[1] w-full overflow-hidden"
              				style={{ width: width ? width : '200px', ...style }}
							ariaHaspopup="listbox"
							ariaExpanded={open}
						>
							{/* Invisible placeholder to maintain button height */}
							<span className="select-button-placeholder">-</span>
						</Button>
						{/* Text overlay */}
						<span 
							className="select-text-overlay"
							style={{ maxWidth: 'calc(100% - 64px)' }}
						>
							{selectedOption
								? options.find(opt => opt.value === selectedOption)?.displayValue
								: title
							}
						</span>
						<FaChevronDown className="select-chevron" aria-hidden="true" />
					</span>
				}

				{/* Options Menu */}
				{open && (
					<div
						ref={menuRef}
						id={menuId}
						className={`select-options ${hasSpaceBelow() ? 'select-options-bottom' : 'select-options-top'} ${hasSpaceOnRight() ? 'select-options-left' : 'select-options-right'} ${optionsClassName || ''}`}
						style={{ zIndex: 50, minWidth: `${effectiveMinWidth}px`, ...optionsStyle }}
						role="listbox"
						aria-label={title}
						onKeyDown={handleMenuKeyDown}
						tabIndex={-1}
					>
						{/* Header title */}
						<div className="select-header">
							<span className="select-header-text">{headerTitle || title}</span>
						</div>

						{/* Options List */}
						<div className="select-options-wrap">
							<ul className="select-options-list" role="presentation">
								{options.map((opt, index) => {
									const isFocused = focusedIndex === index;
									return (
										<li 
											key={opt.value} 
											onClick={() => handleOptionClick(opt.value)}
											onMouseEnter={() => setFocusedIndex(index)}
											role="option"
											aria-selected={selectedOption === opt.value}
											className={isFocused ? 'select-option-focused' : ''}
										>
											<span className="select-option">
												<span className="select-option-text">{opt.displayValue}</span>
												{selectedOption === opt.value
													? <FaTick className="select-option-icon" aria-hidden="true" />
													: <span className="select-option-spacer"></span>
												}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				)}
				<div
					ref={measurerRef}
					aria-hidden="true"
					className="select-measurer"
				>
					<div className="select-measurer-content">
						<div className="select-header">
							<span className="select-header-text">{title}</span>
						</div>
						<div className="select-options-wrap">
							<ul className="select-options-list">
								{options.map(opt => (
									<li key={opt.value}>
										<div className="select-measurer-option">
											<span className="select-measurer-option-text">{opt.displayValue}</span>
											{selectedOption === opt.value ? (
												<FaTick className="select-measurer-icon" aria-hidden="true" />
											) : (
												<span className="select-measurer-spacer" />
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
