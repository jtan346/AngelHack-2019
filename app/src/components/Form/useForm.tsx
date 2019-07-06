import * as React from 'react';
import { validateField, IConstraint } from './Form.Validation';
export interface IFormInput {
  type: 'text';
  constraints?: IConstraint[];
  disableValidation?: boolean;
}
export interface IFormSchema {
  [key: string]: IFormInput;
}

export interface IFormField extends IFormInput {
  key: string;
  value: string;
  isSubmitting: boolean;
  error?: string;
}
export interface IFormFieldHashMap {
  [key: string]: IFormField;
}
export interface IFormFieldValue {
  key: string;
  value: any;
}

export interface IFormFunctions {
  setupFormFields: (fields: IFormSchema, initialDataToLoad?: { [key: string]: any }) => void;
  getField: (key: string) => IFormField;
  getFormData: () => IFormFieldValue[];
  validateAllFields: () => Promise<boolean>;
  updateFieldValue: (key: string, value: string) => void;
  validateFieldValue: (field: IFormField) => string;
}

export interface IFormProps {
  // fields: IFormFieldHashMap;
  form: IFormFunctions;
}
export interface IState {
  fields: IFormFieldHashMap;
}
const useForm = (): IFormFunctions => {
  const [fields, setFields] = React.useState({} as IFormFieldHashMap);

  const form = (): IFormFunctions => ({
    setupFormFields,
    getField,
    getFormData: getFormData,
    validateAllFields: validateAllFields,
    updateFieldValue,
    validateFieldValue
  });

  const setupFormFields = (fields: IFormSchema, initialDataToLoad?: { [key: string]: any }): void => {
    const formFields: IFormFieldHashMap = {};
    const data = initialDataToLoad || {};

    Object.keys(fields).forEach((fieldKey: any) => {
      const fieldData = fields[fieldKey];
      const value = data[fieldKey] ? data[fieldKey] : '';

      formFields[fieldKey] = {
        ...fieldData,
        key: fieldKey,
        value,
        isSubmitting: false,
        error: ''
      };
    });

    setFields(formFields);
  };
  const getField = (key: string): IFormField => {
    return (
      fields[key] || {
        key: '',
        value: '',
        error: '',
        type: 'text'
      }
    );
  };
  const getFormData = (): IFormFieldValue[] => {
    const formData = [] as IFormFieldValue[];

    for (const fieldName in fields) {
      const fieldKeyValue: IFormFieldValue = {
        key: fieldName,
        value: fields[fieldName].value
      };
      formData.push(fieldKeyValue);
    }
    return formData;
  };

  const validateAllFields = async (): Promise<boolean> => {
    const newFields: IFormFieldHashMap = {};
    let formIsValid: boolean = true;
    Object.keys(fields).forEach((fieldKey: any) => {
      const field = fields[fieldKey];
      field.error = validateFieldValue(field);
      newFields[field.key] = field;
      if (field.error) {
        formIsValid = false;
      }
    });

    setFields(newFields);
    return formIsValid;
  };

  const updateFieldValue = (key: string, value: string): void => {
    updateFieldsObject(key, { value });
  };
  const updateFieldsObject = (key: string, newFieldKeyValue: object): void => {
    setFields({
      ...fields,
      [key]: {
        ...fields[key],
        ...newFieldKeyValue
      }
    });
  };

  const validateFieldValue = (field: IFormField): string => {
    const error = validateField(field);
    updateFieldsObject(field.key, { error: error });
    return error;
  };

  return form();
};
export default useForm;
