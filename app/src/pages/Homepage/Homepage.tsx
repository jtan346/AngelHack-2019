import React, { useState, useEffect } from 'react';
import PersonCard from '../../components/PersonCard';
import './Homepage.scss';
import { Grid, Dropdown, Icon } from 'semantic-ui-react';
import api from '../../api';

export interface Person {
  id: number;
  image: string;
  name: string;
  age: number;
  contact: string;
  lastKnown: string;
  status: string;
  submitted: string;
}

const Homepage: React.SFC<{}> = () => {
  const [personsState, setPersonsState] = useState([] as Person[]);

  //Hook version of componentDidMount
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await api.getAllMissing(); //dummy api for now
      console.log(response);
    } catch (e) {}
    // if(response){}
    setPersonsState([
      {
        id: 1,
        image:
          'https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/public/missing/15624358227424991737201046222595.jpg',
        name: 'Seng Cheong',
        age: 25,
        contact: '81234567',
        lastKnown: 'Hubei, China',
        status: 'Missing',
        submitted: '6/25/2019 15:22'
      },
      // {
      //   id: 2,
      //   image:
      //     'https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/public/missing/15624360594694550317863296543365.jpg',
      //   name: 'Saklani',
      //   age: 25,
      //   contact: '81234567',
      //   lastKnown: 'Bombay, India',
      //   status: 'Missing',
      //   submitted: '4/7/2016 07:20'
      // },
      {
        id: 3,
        image:
          'https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/public/missing/15624359068686769426589858910801.jpg',
        name: 'Daniel',
        age: 25,
        contact: '81234567',
        lastKnown: 'Nagoya, Japan',
        status: 'Missing',
        submitted: '5/3/2019 10:20'
      },
      {
        id: 4,
        image:
          'https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/public/missing/15624360193214926059653773792687.jpg',
        name: 'Yong Wei',
        age: 25,
        contact: '81234567',
        lastKnown: 'Xingjiang, China',
        status: 'Missing',
        submitted: '6/2/2019 11:34'
      }
      // {
      //   id: 5,
      //   image:
      //     'https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/public/missing/15624358643934411481403951089680.jpg',
      //   name: 'Benji',
      //   age: 25,
      //   contact: '81234567',
      //   lastKnown: 'Singapore',
      //   status: 'Missing',
      //   submitted: '12/25/2011 15:22'
      // }
    ]);
  };

  const removePersonHandler = (index: number) => {
    const tempPersonsData = [...personsState];
    tempPersonsData.splice(index, 1);
    setPersonsState(tempPersonsData);
  };

  const [openFilter, setOpenFilter] = useState(false);

  const openFilterHandler = () => {
    setOpenFilter(true);
  };

  const closeFilterHandler = () => {
    setOpenFilter(false);
  };

  let persons = personsState.map((person: any, index: any) => {
    return (
      <PersonCard
        key={index}
        remove={() => removePersonHandler(index)}
        image={person.image}
        name={person.name}
        age={person.age}
        contact={person.contact}
        lastKnown={person.lastKnown}
        status={person.status}
        submitted={person.submitted}
      />
    );
  });

  const options = [{ key: '0', text: 'All', value: 'All' }, { key: '1', text: 'My', value: 'My' }];

  return (
    <div>
      <Grid>
        <Grid.Row columns={16}>
          <Grid.Column mobile={16} computer={16}>
            <div className='title-container'>
              <h2 className='title'>Missing People Bulletin</h2>
              <div className='filter'>
                <Icon name='filter' />
                Showing <Dropdown downward='true' floating inline options={options} defaultValue='All' /> Posts
              </div>
            </div>
            <div className='personcard-collection'>{persons}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Homepage;
