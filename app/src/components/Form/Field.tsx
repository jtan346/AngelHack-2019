import * as React from 'react';
import './Field.scss';

export interface IFieldProps extends React.Props<{}> {
  name: string;
  title?: string;
  errorMessage?: string;
}

const Field: React.SFC<IFieldProps> = (props: IFieldProps): JSX.Element => (
  <div>
    <div>
        {props.children}
    </div>
    {props.errorMessage && renderErrorMessage(props.errorMessage)}
  </div>
);

const renderErrorMessage = (errorMessage:string): JSX.Element => (
  <p><span className='input--error--text'>{errorMessage}</span></p>
);

export default Field;
