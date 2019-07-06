import { IFormField } from './useForm';

export type IInputValidatorNames = 'isEmail' | 'isRequired' | 'isNumber' | 'isMinLength' | 'isMaxLength';
export type IInputValidatorFunction =
  | ((value: string, message: string) => string | undefined)
  | ((value: string, message: string, param?: any) => string | undefined);

export type IConstraint = [IInputValidatorNames, string] | [IInputValidatorNames, any, string];

//  ---------- INPUT VALIDATORS

const validationRule: { [key in IInputValidatorNames]: IInputValidatorFunction } = {
  isEmail: (value: string, message: string): string | undefined => {
    const emailPattern = /(^$|(^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
    return !emailPattern.test(value) ? message : undefined;
  },
  isRequired: (value: string, message: string): string | undefined => {
    const isEmpty = value === '' || value === undefined || value === null;
    return isEmpty ? message : undefined;
  },
  isNumber: (value: string, message: string): string | undefined => {
    const isEmpty = value === '' || value === undefined || value === null;
    const numberPattern = /^[0-9]+$/;
    return !isEmpty && !numberPattern.test(value) ? message : undefined;
  },
  isMinLength: (value: string, message: string, param?: any): string | undefined => {
    return value.length < +param ? message : undefined;
  },
  isMaxLength: (value: string, message: string, param?: any): string | undefined => {
    const isEmpty = value === '' || value === undefined || value === null;
    return !isEmpty && value.length > +param ? message : undefined;
  }
};

export const validateField = (field: IFormField): string => {
  let errorMessage: string = '';
  console.log('validate');
  if (field.constraints && !field.disableValidation) {
    for (const constraint of field.constraints) {
      console.log('loop constraints');
      if ('string' !== typeof field.value) {
        continue;
      }
      const trimmedValue = (field.value as string).trim();

      let result;

      // Validation without params
      if (constraint.length === 2) {
        const [rule, message] = constraint;
        result = validationRule[rule](trimmedValue, message);
      }
      // Validation with params
      if (constraint.length === 3) {
        const [rule, param, message] = constraint;
        result = validationRule[rule](trimmedValue, message, param);
      }

      // always return the first error encountered
      if (result) {
        errorMessage = result;
        break;
      }
    }
  }

  return errorMessage;
};
