import { TextInput } from '@mantine/core';

export function MainSearch() {
  return (
    <>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <TextInput
          placeholder="Search..."
          radius="16px"
          size="md"
          style={{
            maxWidth: '100%',
            marginBottom: '1rem',
            width: '97%',
            margin: '0 auto',
          }}
          styles={{
            input: {
              backgroundColor: 'white',
              borderColor: '#ced4da',
              '&:focus': {
                borderColor: '#ced4da',
                boxShadow: 'none',
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default MainSearch;
