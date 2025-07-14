import { Fieldset, TextInput } from '@mantine/core';

function CreateOpportunity() {
  return (
    <Fieldset legend="Personal information">
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}

export default CreateOpportunity;