import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from 'react-dom';
import CloseButton from "../buttons/CloseButton";



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
          className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60"
          style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >

          {/* Dialog */}
          <div
            ref={dialogRef}
              className={
                "modal-content relative p-5 sm:p-8 bg-white rounded min-w-[260px] sm:min-w-[320px] min-h-[180px] sm:min-h-[200px] shadow-lg max-w-[95%] max-h-[95%] overflow-auto z-[101] " +
                (className || "")
            }
            id={id}
            style={style}
            onClick={e => e.stopPropagation()}
          >

            {/* Close Button */}
            <CloseButton
              className="absolute top-2 right-2 z-[102]"
              onClick={onClose}
              title="Close"
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
        <span style={{ display: "inline-block" }}onClick={() => setInternalOpen(true)}>
          {trigger}
        </span>
        {isOpen && createPortal(renderModal(), document.body)}
      </>
    );
  }

  if (isOpen) return createPortal(renderModal(), document.body);
  return null;
}