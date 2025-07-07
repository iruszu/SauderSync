import { ReactElement } from 'react';
import MyComponent from '@components/component';
import { Grid } from '@mantine/core';


export const Home = (): ReactElement => { 
    return (
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
        justify="center" 
        align="center"
        style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}

        >
          <Grid.Col span={4}>
          <MyComponent
                title="Sample Title"
                date="2025-07-07"
                description="This is a sample description."
            />
          </Grid.Col>
          <Grid.Col span={4}>
          <MyComponent
                title="Sample Title"
                date="2025-07-07"
                description="This is a sample description."
            />
          </Grid.Col>
          <Grid.Col span={4}>
          <MyComponent
                title="Sample Title"
                date="2025-07-07"
                description="This is a sample description."
            />
          </Grid.Col>
        </Grid>
      );
}





  

export default Home;