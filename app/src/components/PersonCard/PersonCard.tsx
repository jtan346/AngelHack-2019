import React, { useState } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import './PersonCard.scss';
interface IProps extends React.Props<{}> {
  remove: () => void;
  image: string;
  name: string;
  age: number;
  contact: string;
  lastKnown: string;
  status: string;
  submitted: string;
}

//<span onClick={props.remove} className="remove-button">&#10006;</span>

const PersonCard: React.SFC<IProps> = (props: IProps) => {
  return (
    <Card className='personcard'>

      <Image src={props.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {props.name}, {props.age}
        </Card.Header>
        <Card.Meta>Last Known Position: {props.lastKnown}</Card.Meta>
        <Card.Description>
          Status: <strong>{props.status}</strong>
          <br />
          Contact: {props.contact}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        Submitted: {props.submitted}
      </Card.Content>
    </Card>
  );
};

export default PersonCard;
