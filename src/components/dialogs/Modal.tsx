import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from 'react-dom';
import CloseButton from "../buttons/CloseButton";
import './Modal.css';

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  width?: string;
}



export default function Modal({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  children,
  className,
  style,
  id,
  trigger
}: ModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);


  // Determine open state and close handler
  const isControlled = typeof isOpenProp === "boolean" && typeof onCloseProp === "function";
  const isOpen = isControlled ? isOpenProp : internalOpen;
  const onClose = useCallback(() => {
    if (isControlled) {
      if (onCloseProp) onCloseProp();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, onCloseProp]);

  // Close on Esc key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management and focus trap
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Save currently focused element
      const previouslyFocused = document.activeElement as HTMLElement;
      
      // Focus the dialog
      const getFocusableElements = () => {
        if (!dialogRef.current) return [];
        return Array.from(
          dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];
      };

      const focusableElements = getFocusableElements();
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Focus trap handler
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener('keydown', handleTab);

      // Return focus when closed
      return () => {
        window.removeEventListener('keydown', handleTab);
        if (previouslyFocused) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isOpen]);

  // Close on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Render the Overlay & Dialog
  function renderModal() {
      return (
        /* Overlay */
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          role="presentation"
        >

          {/* Dialog */}
          <div
            ref={dialogRef}
            className={`modal-content ${className || ''}`}
            id={id}
            style={style}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={id ? `${id}-title` : undefined}
            aria-label={id ? undefined : "Dialog"}
          >

            {/* Close Button */}
            <CloseButton
              className="modal-close-button"
              onClick={onClose}
              title="Close"
              aria-label="Close modal"
            />

            {/* Content */}
            {children}
          </div>
        </div>
      );
  }

  // Render trigger if provided
  if (trigger) {
    return (
      <>
        <span className="modal-trigger" onClick={() => setInternalOpen(true)}>
          {trigger}
        </span>
        {isOpen && createPortal(renderModal(), document.body)}
      </>
    );
  }

  if (isOpen) return createPortal(renderModal(), document.body);
  return null;
}