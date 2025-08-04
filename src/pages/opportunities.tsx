import { ReactElement, useEffect, useState } from 'react';
import MyComponent from '@components/oppComponent';
import {
  Grid,
  Box,
  Flex,
  Title,
  Button,
  Group,
  TextInput,
  SegmentedControl,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { getFirestoreCollection } from '@packages/firestoreAsQuery/firestoreRequests';

type Opportunity = {
  key: string;
  image: string;
  title: string;
  date: string;
  description: string;
  status: string;
  eventURL: string;
  icon: string; // club icon
  clubName: string; // club name
};

export const Opportunities = (): ReactElement => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState<'all' | 'past' | 'future'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getFirestoreCollection<{
          key: string;
          image: string;
          title: string;
          date: string;
          description: string;
          status: string;
          eventURL: string;
        }>('opportunities');
        setOpportunities(data);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  // Filter opportunities based on date and search query
  const filteredOpportunities = opportunities.filter((opportunity) => {
    // First apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.clubName.toLowerCase().includes(query);

      if (!matchesSearch) return false;
    }

    // Then apply date filter
    if (filter === 'all') return true;

    try {
      // Parse the date from the opportunity
      // The date format appears to be something like "Jan 16, 2026"
      const eventDate = new Date(opportunity.date);
      const today = new Date();

      // Check if date is valid
      if (isNaN(eventDate.getTime())) {
        console.error(
          `Invalid date format for ${opportunity.title}: ${opportunity.date}`,
        );
        return true; // Include invalid dates in results to be safe
      }

      // Compare dates
      if (filter === 'past') {
        return eventDate < today;
      } else if (filter === 'future') {
        return eventDate >= today;
      }
    } catch (error) {
      console.error('Error parsing date:', opportunity.date, error);
      return true; // Include in results if there's an error
    }

    return true;
  });

  return (
    <Flex>
      <Box p="sm" style={{ flex: 1 }}>
        <Group mb="lg" justify="space-between">
          <SegmentedControl
            radius="xl"
            size="md"
            value={filter}
            onChange={(value) => setFilter(value as 'all' | 'past' | 'future')}
            data={[
              { value: 'all', label: 'All' },
              { value: 'future', label: 'Future' },
              { value: 'past', label: 'Past' },
            ]}
            classNames={classes}
          />

          <TextInput
            placeholder="Search opportunities..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ width: '500px' }}
            radius="16px"
          />
        </Group>
        <Grid
          gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
          justify="center"
          align="center"
          style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}
        >
          {filteredOpportunities.map((opportunity, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 5, lg: 4 }}>
              <MyComponent startDate={opportunity.date} {...opportunity} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Opportunities;
