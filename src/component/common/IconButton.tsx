import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  'aria-label': string; // Make aria-label mandatory for accessibility
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  // Base classes for the button, ensuring it's a flex container for easy centering.
  // User-provided classNames will override or extend these.
  const baseClasses = 'flex items-center justify-center transition-colors duration-300';

  return (
    <button type="button" className={`${baseClasses} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};