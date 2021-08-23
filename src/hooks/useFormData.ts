import useSimpleEffect from "hooks/useSimpleEffect";
import { useCallback, useState } from "react";
import { IFormItem } from "types/interfaces/IFormItem";

const useFormData = <T>(initialValue: IFormItem<T>[]) => {
  const [formData, setFormData] = useState<IFormItem<T>[]>(initialValue);

  const resetForm = useCallback(() => {
    setFormData(initialValue);
  }, [initialValue]);

  const getFormItem = useCallback(
    (name: T) => {
      return formData.find((item) => item.name === name);
    },
    [formData]
  );

  const getFormValue = useCallback(
    (name: T) => {
      return getFormItem(name)?.value ?? null;
    },
    [getFormItem]
  );

  const getFormValues = (...name: T[]) => {
    return name.map((item) => getFormItem(item)?.value ?? null);
  };

  const getFormErrorMsg = useCallback(
    (name: T) => {
      return getFormItem(name)?.errorMsg ?? "";
    },
    [getFormItem]
  );

  const isFormItemError = (name: T) => {
    return getFormItem(name)?.errorMsg ? true : false;
  };

  const setFormErrorMsg = useCallback((name: T, errorMsg: string) => {
    setFormData((formData) => {
      const result = [...formData];
      const formItem = result.find((item) => item.name === name);
      if (formItem) {
        formItem.errorMsg = errorMsg;
      }
      return result;
    });
  }, []);

  const setFormItemRequired = useCallback((name: T, required: boolean) => {
    setFormData((formData) => {
      const result = [...formData];
      const formItem = result.find((item) => item.name === name);
      if (formItem) {
        formItem.required = required;
      }
      return result;
    });
  }, []);

  const validateFormItem = useCallback(
    (name?: T, value?: any) => {
      const formItem = formData.find((item) => item.name === name);
      if (!formItem) {
        return false;
      }

      let valid = true;
      value = value ?? formItem.value;

      if (
        formItem?.required &&
        (value === undefined || value === null || value === "")
      ) {
        setFormErrorMsg(formItem.name, "This field is required");
        valid = false;
      }

      if (valid && formItem.errorMsg !== "") {
        setFormErrorMsg(formItem.name, "");
      }

      return valid;
    },
    [formData, setFormErrorMsg]
  );

  const setFormValue = useCallback((name: T, value: any) => {
    setFormData((formData) => {
      const formItem = formData.find((item) => item.name === name);
      if (!formItem) {
        return formData;
      }

      const result = [...formData];
      formItem.value = value;
      formItem.errorMsg = "";
      return result;
    });
  }, []);

  const validateFormAll = useCallback(() => {
    let valid = true;
    formData.forEach((item) => {
      if (!validateFormItem(item.name)) {
        valid = false;
      }
    });

    return valid;
  }, [formData, validateFormItem]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name: any = e.target.name;
      setFormValue(name, e.target.value);
    },
    [setFormValue]
  );

  const getInputProps = useCallback(
    (name: T) => ({
      onChange: handleInputChange,
      onBlur: () => validateFormItem(name),
      value: getFormValue(name),
      name: name,
    }),
    [getFormValue, handleInputChange, validateFormItem]
  );

  return {
    formData,
    getFormItem,
    getFormValue,
    getFormValues,
    setFormItemRequired,
    setFormValue,
    setFormErrorMsg,
    getFormErrorMsg,
    isFormItemError,
    validateFormItem,
    validateFormAll,
    handleInputChange,
    getInputProps,
    resetForm,
  };
};

export default useFormData;
