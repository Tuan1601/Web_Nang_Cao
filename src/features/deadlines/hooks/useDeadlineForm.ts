import { useState, useCallback } from 'react';
import type { DeadlineFormValues, DeadlineFormErrors, Priority } from '../types/deadline.types';

const INITIAL_VALUES: DeadlineFormValues = {
  subject: '',
  title: '',
  dueDate: '',
  priority: 'medium',
};

interface UseDeadlineFormReturn {
  values: DeadlineFormValues;
  errors: DeadlineFormErrors;
  isSubmitting: boolean;
  handleChange: (field: keyof DeadlineFormValues, value: string | Priority) => void;
  handleSubmit: (onSuccess: (values: DeadlineFormValues) => void) => void;
  resetForm: () => void;
}

export function useDeadlineForm(initialValues?: Partial<DeadlineFormValues>): UseDeadlineFormReturn {
  const [values, setValues] = useState<DeadlineFormValues>({
    ...INITIAL_VALUES,
    ...initialValues,
  });
  const [errors, setErrors] = useState<DeadlineFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (vals: DeadlineFormValues): DeadlineFormErrors => {
    const errs: DeadlineFormErrors = {};
    if (!vals.subject.trim()) errs.subject = 'Vui lòng nhập tên môn học';
    if (!vals.title.trim())   errs.title   = 'Vui lòng nhập tên bài tập';
    if (!vals.dueDate)        errs.dueDate  = 'Vui lòng chọn hạn nộp';
    if (!vals.priority)       errs.priority = 'Vui lòng chọn độ ưu tiên';
    return errs;
  };

  const handleChange = useCallback(
    (field: keyof DeadlineFormValues, value: string | Priority) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (onSuccess: (values: DeadlineFormValues) => void) => {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setIsSubmitting(true);
      onSuccess(values);
      setIsSubmitting(false);
    },
    [values]
  );

  const resetForm = useCallback(() => {
    setValues({ ...INITIAL_VALUES, ...initialValues });
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return { values, errors, isSubmitting, handleChange, handleSubmit, resetForm };
}
