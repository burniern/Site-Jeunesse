import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: z.ZodError) => void;
}

export const useFormValidation = <T extends Record<string, any>>(
  options: UseFormValidationOptions<T>
) => {
  const { schema, onSuccess, onError } = options;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (data: unknown) => {
      try {
        const validData = schema.parse(data);
        setErrors({});
        onSuccess?.(validData);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach(err => {
            if (err.path[0]) {
              newErrors[err.path[0].toString()] = err.message;
            }
          });
          setErrors(newErrors);
          onError?.(error);
        }
        return false;
      }
    },
    [schema, onSuccess, onError]
  );

  return {
    errors,
    validate,
    clearErrors: () => setErrors({})
  };
};