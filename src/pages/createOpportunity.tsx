import { Button, Fieldset, TextInput, Title } from '@mantine/core';
import { createFirestoreDocument } from '/Users/kellie/boilerplateRevised/src/packages/firestoreAsQuery/firestoreRequests.ts';
import { useState } from 'react';
import { nanoid as nano } from 'nanoid';

//createFirestoreDocument(path, data, true);
export const id = nano(5);

function CreateOpportunity() {
const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    

    const handleSubmit = async () => {
        await createFirestoreDocument(
          `opportunities/${id}`,
            { name, email },
          true
        );
        setName('');
        setEmail('');
        console.log('Opportunity created successfully');
      };
    
    
  return (
    <Fieldset>
      <Title order={4} mb="md">Create Opportunity</Title>
          <TextInput label="Your name" placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)} />
      <TextInput label="Email" placeholder="Email" mt="md"
          value={email}
              onChange={e => setEmail(e.target.value)} />
          <Button mt="md" onClick={handleSubmit}>Submit</Button>
    </Fieldset>
  );
}

export default CreateOpportunity;