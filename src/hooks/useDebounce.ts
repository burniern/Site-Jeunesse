import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  return useCallback(
    debounce((...args: Parameters<T>) => {
      callback(...args);
    }, delay),
    [callback, delay]
  );
};