import { Fieldset, TextInput, Title } from '@mantine/core';

function CreateOpportunity() {
  return (
    <Fieldset>
      <Title order={4} mb="md">Create Opportunity</Title>
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}

export default CreateOpportunity;