import { ReactElement, useMemo, useState } from 'react';
import { Grid, Flex, Title, Box, Select } from '@mantine/core';

import MyComponent from '@components/oppComponent';
import NavigationBar from '@components/navBar';

const MOCK_OPPORTUNITIES = [
    {
        key: "1",
        title: "nwHacks",
        date: "2026-01-17/18",
        description: "Everyone is welcome at nwHacks, whether you are just getting into tech or are a seasoned hacker. Join us in-person on January 17-18, 2026 for a weekend of ...",
        image: 'https://i.ytimg.com/vi/yXU19LzAQyo/maxresdefault.jpg',
        status: 'active',
        eventURL: 'https://nwhacks.io/'
    },
    {
        key: "2",
        title: "YouCode",
        date: "2025-04-07",
        description: "youCode aims to provide an equal opportunity to beginner and advanced level students to engage with their technical abilities. This is an environment for ...",
        image: 'https://ubcyoucode.com/_next/image?url=%2Fassets%2Flogowithtext.png&w=1920&q=75',
        status: 'upcoming',
        eventURL: 'https://ubcyoucode.com/'
    },
    {
        key: "3",
        title: "Elevate",
        date: "2025-03-07",
        description: "Looking to explore entrepreneurship but don’t know where to start? 😵‍💫 ELEVATE is your first step in entrepreneurship and learning how to pitch 🛗 Undergo the entire process of developing an elevator pitch through interactive workshops and beginner-friendly frameworks ⚡️",
        image: 'https://amsclubs.ca/eprojects/wp-content/uploads/sites/312/2024/04/Screen-Shot-2024-09-27-at-4.35.26-PM-1440x436.png',
        status: 'finished',
        eventURL: 'https://www.ubceprojects.com/'
    },
    {
        key: "4",
        title: "nwHacks",
        date: "2026-01-17/18",
        description: "Everyone is welcome at nwHacks, whether you are just getting into tech or are a seasoned hacker. Join us in-person on January 17-18, 2026 for a weekend of ...",
        image: 'https://i.ytimg.com/vi/yXU19LzAQyo/maxresdefault.jpg',
        status: 'active',
        eventURL: 'https://nwhacks.io/'
    },
    {
        key: "5",
        title: "YouCode",
        date: "2025-04-07",
        description: "youCode aims to provide an equal opportunity to beginner and advanced level students to engage with their technical abilities. This is an environment for ...",
        image: 'https://ubcyoucode.com/_next/image?url=%2Fassets%2Flogowithtext.png&w=1920&q=75',
        status: 'upcoming',
        eventURL: 'https://ubcyoucode.com/'
    },
    {
        key: "6",
        title: "Elevate",
        date: "2025-03-07",
        description: "Looking to explore entrepreneurship but don’t know where to start? 😵‍💫 ELEVATE is your first step in entrepreneurship and learning how to pitch 🛗 Undergo the entire process of developing an elevator pitch through interactive workshops and beginner-friendly frameworks ⚡️",
        image: 'https://amsclubs.ca/eprojects/wp-content/uploads/sites/312/2024/04/Screen-Shot-2024-09-27-at-4.35.26-PM-1440x436.png',
        status: 'finished',
        eventURL: 'https://www.ubceprojects.com/'
    }
];


export const Home = (): ReactElement => { 
    const [statusFilter, setStatusFilter] = useState<string | null>('default')
    const [typeFilter, setTypeFilter] = useState<string | null>('default')

    const filteredEvents = useMemo(() => MOCK_OPPORTUNITIES.filter((opp) => {
        console.log('use memo running')
        if (statusFilter === 'default') { //if user has not selected a filter, show all opportunities
            return true;
        } else if (opp.status === 'upcoming' && statusFilter === 'upcoming') {
            return true; //if user has selected 'upcoming', show only upcoming opportunities
        } else if (opp.status === 'active' && statusFilter === 'active') {
            return true;
        } else if (opp.status === 'finished' && statusFilter === 'finished') {
            return true;
        } 
        return false;

    }), [statusFilter]) //dependencies array, so it only runs when statusFilter changes

    console.log('re-rendering component')

    return (
        <Flex>
            <Box w={300} p="md" bg="gray.0" h="100dvh">
                <NavigationBar />
            </Box>
            <Box p="md" style={{ flex: 1 }}>
                <Title order={2} mb="md">Home</Title>
                <Flex mb="md" gap="md">
                    <Select
                        label="Status Filter"
                        placeholder="Pick status"
                        data={[
                            { value: 'default', label: 'All Statuses' }, 
                            { value: 'active', label: 'Active' },
                            { value: 'upcoming', label: 'Upcoming' },
                            { value: 'finished', label: 'Finished' },
                        ]}
                        value={statusFilter}
                        onChange={(value) => (setStatusFilter(value ?? 'default' ))}
                    />
                </Flex>
                <Grid 
                    gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
                    justify="center" 
                    align="center"
                    style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}

                    >
                    {filteredEvents.map((opportunity, index) => ( // Map through the filtered opportunities so that only the ones that match the filter are displayed
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

export default Home;