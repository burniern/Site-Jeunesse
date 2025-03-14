import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

interface UseButtonClickOptions {
  delay?: number;
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useButtonClick = (
  onClick: () => Promise<void> | void,
  options: UseButtonClickOptions = {}
) => {
  const {
    delay = 300,
    confirmMessage,
    successMessage,
    errorMessage = 'Une erreur est survenue'
  } = options;

  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(
    debounce(async () => {
      if (confirmMessage && !window.confirm(confirmMessage)) {
        return;
      }

      try {
        setLoading(true);
        await onClick();
        if (successMessage) {
          toast.success(successMessage);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : errorMessage;
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }, delay),
    [onClick, confirmMessage, successMessage, errorMessage, delay]
  );

  return {
    loading,
    handleClick
  };
};