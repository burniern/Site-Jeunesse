import React from 'react';
import { Loader2 } from 'lucide-react';
import Button from '../Button';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  loadingText = 'Chargement...',
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
          {loadingText}
        </>
      ) : children}
    </Button>
  );
};

export default LoadingButton;