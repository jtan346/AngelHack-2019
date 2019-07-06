import * as React from 'react';
import Field from './Field';
import { IFormFunctions } from './useForm';
import { Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

interface IFormInputProps {
  field: string;
  form: IFormFunctions;
  title?: string;
  placeholder?: string;
  icon?: string;
  errorMessage?: string;
  onBlurHandler?: () => void;
}

const FormInput = (props: IFormInputProps): JSX.Element => {
  console.log('FormInput', props.field);

  const formField = props.form.getField(props.field);
  console.log(formField.error);
  const key = formField ? formField.key : '';
  let id = key + '_form_input';
  // console.log(formField);
  const errorMessage = formField ? formField.error : '';
  // console.log(errorMessage);
  const value = formField ? formField.value : '';

  const onBlurHandler = async (): Promise<void> => {
    await props.form.validateFieldValue(formField);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    props.form.updateFieldValue(key, value);
  };

  return (
    <Field name={props.field} title={props.title} errorMessage={errorMessage}>
      <Input
        icon={props.icon}
        iconPosition='left'
        placeholder={props.placeholder}
        id={id}
        type={formField.type}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value as string}
      />
    </Field>

    // <Input
    //   {...props}
    //   bindRef={bindRef}
    //   textarea={type === 'textarea' ? true : false}
    //   componentId={id}
    //   name={key}
    //   maxChar={maxChar}
    //   errorMessage={errorMessage}
    //   value={value as string}
    //   onTextChange={onChangeHandler}
    //   onBlur={onBlurHandler}
    //   disabled={isSubmitting}
    //   type={formField.type}
    // />
  );
};

export default FormInput;
