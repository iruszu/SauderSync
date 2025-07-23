import { ReactElement, useEffect, useState } from 'react';
import MyComponent from '@components/oppComponent';
import { Grid, Box, Flex, Title } from '@mantine/core';
import { getFirestoreCollection } from '@packages/firestoreAsQuery/firestoreRequests';

type Opportunity = {
  key: string;
  image: string;
  title: string;
  date: string;
  description: string;
  status: string;
  eventURL: string;
};

export const Opportunities = (): ReactElement => {
  const [opportunities, setOpportunities] = useState<
    {
      key: string;
      image: string;
      title: string;
      date: string;
      description: string;
      status: string;
      eventURL: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // 1. Fetch all clubs
        const clubs = await getFirestoreCollection<{ id: string }>('clubs');
        let allOpportunities: Opportunity[] = [];

        // 2. For each club, fetch its opportunities subcollection
        for (const club of clubs) {
          const clubOpportunities = await getFirestoreCollection<Opportunity>(
            `clubs/${club.id}/opportunities`,
          );
          allOpportunities = allOpportunities.concat(clubOpportunities);
        }

        setOpportunities(allOpportunities);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <Flex>
      <Box p="sm" style={{ flex: 1 }}>
        <Title order={2} mb="md">
          Opportunities
        </Title>
        <Grid
          gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
          justify="center"
          align="center"
          style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}
        >
          {opportunities.map((opportunity, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 5, lg: 4 }}>
              <MyComponent {...opportunity} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Opportunities;
