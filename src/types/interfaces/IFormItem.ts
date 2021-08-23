export interface IFormItem<T> {
  name: T;
  value: any;
  label?: string;
  validation?: string;
  required?: boolean;
  errorMsg?: string;
  inputProps?: any;
}
