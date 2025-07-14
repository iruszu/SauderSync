import { ReactElement, useEffect, useState } from 'react';
import MyComponent from '@components/oppComponent'
import NavigationBar from '@components/navBar';
import { Grid, Box, Flex, Title } from '@mantine/core';
import { getFirestoreCollection } from '@packages/firestoreAsQuery/firestoreRequests';



export const Opportunities = (): ReactElement => { 
    const [opportunities, setOpportunities] = useState<{ key: string; image: string; title: string; date: string; description: string; status: string; eventURL: string; }[]>([]);

    // Fetch opportunities from Firestore
    useEffect(() => {
        const fetchOpportunities = async () => {
          try {
            const data = await getFirestoreCollection<{ key: string; image: string; title: string; date: string; description: string; status: string; eventURL: string; }>('opportunities');
            setOpportunities(data);
          } catch (error) {
            console.error('Error fetching opportunities:', error);
          }
        };

        fetchOpportunities();
    }, []);
    
    return (
        <Flex>
            <Box w={300} p="md" bg="gray.0" h="100dvh">
                <NavigationBar />
            </Box>
            <Box p="md" style={{ flex: 1 }}>
                <Title order={2} mb="md">Opportunities</Title>
                <Grid 
                    gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
                    justify="center" 
                    align="center"
                    style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}

                    >
                    {opportunities.map((opportunity, index) => (
                        <Grid.Col 
                        key={index} 
                        span={{ base: 12, md: 6, lg: 4 }}>
                            <MyComponent {...opportunity} />
                        </Grid.Col>
                    ))}
                </Grid>  

            </Box>
        </Flex>
        
      );
};

export default Opportunities;