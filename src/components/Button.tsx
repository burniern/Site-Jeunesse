import React from 'react';
import { Loader2 } from 'lucide-react';
import { useButtonClick } from '../hooks/useButtonClick';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  onClick?: () => Promise<void> | void;
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading: propLoading,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  onClick,
  confirmMessage,
  successMessage,
  errorMessage,
  className = '',
  disabled,
  ...props
}) => {
  const { loading: hookLoading, handleClick } = useButtonClick(
    onClick || (() => {}),
    { confirmMessage, successMessage, errorMessage }
  );

  const isLoading = propLoading || hookLoading;

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={onClick ? () => handleClick() : undefined}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
          Chargement...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;