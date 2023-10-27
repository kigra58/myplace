import { useState } from "react";

const useForm = (data:any) => {
  const [formData, setFormData] = useState({
    ...data,
  });
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    if (value) {
      setFormData((pre: typeof data) => {
        return { ...pre, [name]: value };
      });
    }
  };
  return { formData, onChangeHandler, setFormData };
};

export default useForm;
