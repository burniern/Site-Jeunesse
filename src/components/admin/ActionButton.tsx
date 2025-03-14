import React from 'react';
import { LoaderIcon } from 'lucide-react';
import { useButtonClick } from '../../hooks/useButtonClick';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onAction: () => Promise<void>;
  confirmMessage?: string;
  successMessage?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onAction,
  confirmMessage,
  successMessage,
  icon,
  variant = 'primary',
  children,
  ...props
}) => {
  const { loading, handleClick } = useButtonClick(async () => {
    if (confirmMessage && !window.confirm(confirmMessage)) {
      return;
    }
    
    await onAction();
    
    if (successMessage) {
      toast.success(successMessage);
    }
  });

  const baseStyles = 'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'text-white bg-primary hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
  };

  return (
    <button
      {...props}
      onClick={() => handleClick()}
      disabled={loading || props.disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${props.className || ''}
        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        <LoaderIcon className="animate-spin h-4 w-4 mr-2" />
      ) : icon}
      {children}
    </button>
  );
};

export default ActionButton;