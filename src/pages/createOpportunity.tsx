import { Button, Fieldset, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { nanoid as nano } from 'nanoid';
import { createFirestoreDocument } from '@packages/firestoreAsQuery';

export const id = nano(5);

function CreateOpportunity() {
    const [title, setTitle] = useState('');
    const [clubID, setClubID] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [url, setEventURL] = useState('');
    const [image, setImage] = useState('');

    

    const handleSubmit = async () => {
        await createFirestoreDocument(
          `opportunities/${id}`,
          { title: title, clubID: clubID, date: date, description: description, url: url, image: image }, 
          true
        );
        setTitle('');
        setClubID('');
        setDate('');
        setDescription('');
        setEventURL('');
        setImage('');
        console.log('Opportunity created successfully');
      };
    
    
  return (
    <Fieldset>
      <Title order={4} mb="md">Create Opportunity</Title>
      <TextInput label="Your name" placeholder="Your name"
        value={title}
        onChange={e => setTitle(e.target.value)} />
        <TextInput label="Email" placeholder="Email" mt="md"
        value={clubID}
        onChange={e => setClubID(e.target.value)} />
        <TextInput label="Date" placeholder="Date" mt="md"
        value={date}
        onChange={e => setDate(e.target.value)} />
        <TextInput label="Description" placeholder="Description" mt="md"
        value={description}
        onChange={e => setDescription(e.target.value)} />
        <TextInput label="EventURL" placeholder="EventURL" mt="md"
        value={url}
        onChange={e => setEventURL(e.target.value)} />
        <TextInput label="Image" placeholder="Image" mt="md"
        value={image}
        onChange={e => setImage(e.target.value)} />
        <Button mt="md" onClick={handleSubmit}>Submit</Button>
    </Fieldset>
  );
}

export default CreateOpportunity;