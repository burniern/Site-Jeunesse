import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../Button';
import { useButtonSafety } from '../../hooks/useButtonSafety';

interface ConfirmButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onConfirm: () => Promise<void>;
  confirmMessage: string;
  confirmTitle?: string;
  variant?: 'primary' | 'danger';
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onConfirm,
  confirmMessage,
  confirmTitle = 'Confirmation',
  variant = 'danger',
  children,
  ...props
}) => {
  const { isSafeToClick, trackClick } = useButtonSafety();

  const handleClick = async () => {
    if (!isSafeToClick()) return;

    if (window.confirm(confirmMessage)) {
      trackClick();
      await onConfirm();
    }
  };

  return (
    <Button
      {...props}
      variant={variant}
      onClick={handleClick}
      icon={<AlertTriangle className="h-4 w-4" />}
    >
      {children}
    </Button>
  );
};

export default ConfirmButton;