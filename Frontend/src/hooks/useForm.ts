import { useState } from "react";

type FormFields<T> = {
  [K in keyof T]: T[K];
};

export const useForm = <T extends Record<string, string>>(initialValues: T) => {
  const [formValues, setFormValues] = useState<FormFields<T>>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormValues(initialValues);

  return { formValues, handleChange, resetForm, setFormValues };
};
