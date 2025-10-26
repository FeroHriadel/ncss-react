import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '../buttons/CloseButton';

export interface FullScreenViewProps {
  children: React.ReactNode;
  header?: string | React.ReactNode;
  isOpen?: boolean;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

const FullScreenView: React.FC<FullScreenViewProps> = ({
  children,
  header,
  isOpen: controlledIsOpen,
  trigger,
  onClose,
}) => {
  // Internal state for uncontrolled mode
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine if controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Handle open (for trigger)
  const handleOpen = () => {
    if (!isControlled) {
      setInternalIsOpen(true);
    }
  };

  // Handle close
  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (!isControlled) {
      setInternalIsOpen(false);
    }
  }, [onClose, isControlled]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);


  // Render trigger if provided
  const renderTrigger = () => {
    if (!trigger) return null;

    // Clone trigger element and add onClick handler
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
        onClick: (e: React.MouseEvent) => {
          // Call original onClick if it exists
          const originalOnClick = (trigger as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props?.onClick;
          if (originalOnClick) {
            originalOnClick(e);
          }
          handleOpen();
        },
      });
    }
    return trigger;
  };


  // Render the full screen view
  const renderFullScreenView = () => {
    if (!isOpen) return null;

    return (
      <div
        className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-white z-[50] flex flex-col overflow-hidden'
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {/* Header */}
        <div
          className="bg-gray-200 relative w-full flex items-center flex-shrink-0 min-h-[60px]"
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {typeof header === 'string' ? (
            <>
              <h2 className="text-xl font-semibold ml-4">{header}</h2>
              <CloseButton onClick={handleClose} className='absolute right-4 top-1/2 transform -translate-y-1/2' />
            </>
          ) : (
            header
          )}
        </div>

        {/* Scrollable Content */}
        <style>{`
          .fullscreen-content-wrapper {
            flex: 1;
            overflow: auto;
            padding: 0 !important;
            margin: 0 !important;
            width: 100%;
            height: 100%;
            display: block;
            line-height: 0;
          }
          .fullscreen-content-wrapper > *:first-child {
            margin-top: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-bottom: 0 !important;
            display: block !important;
          }
          .fullscreen-content-wrapper h1,
          .fullscreen-content-wrapper h2,
          .fullscreen-content-wrapper h3,
          .fullscreen-content-wrapper h4,
          .fullscreen-content-wrapper h5,
          .fullscreen-content-wrapper h6,
          .fullscreen-content-wrapper p,
          .fullscreen-content-wrapper div {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          .fullscreen-content-wrapper h1:first-child,
          .fullscreen-content-wrapper h2:first-child,
          .fullscreen-content-wrapper h3:first-child,
          .fullscreen-content-wrapper h4:first-child,
          .fullscreen-content-wrapper h5:first-child,
          .fullscreen-content-wrapper h6:first-child,
          .fullscreen-content-wrapper p:first-child,
          .fullscreen-content-wrapper div:first-child {
            margin-left: 0 !important;
            padding-left: 0 !important;
          }
        `}</style>
        <div className='fullscreen-content-wrapper'>
          {children}
        </div>
      </div>
    );
  };


  return (
    <>
      {renderTrigger()}
      {isOpen && createPortal(renderFullScreenView(), document.body)}
    </>
  );
};

export default FullScreenView;
