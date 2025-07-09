import { ReactElement } from 'react';
import MyComponent from '@components/oppComponent'
import NavigationBar from '@components/navBar';
import { Grid, Box, Flex, Title } from '@mantine/core';

const opportunities = [
    {
        title: "nwHacks",
        date: "2026-01-17/18",
        description: "Everyone is welcome at nwHacks, whether you are just getting into tech or are a seasoned hacker. Join us in-person on January 17-18, 2026 for a weekend of ...",
        image: 'https://i.ytimg.com/vi/yXU19LzAQyo/maxresdefault.jpg',
        status: 'active',
        button: 'https://nwhacks.io/'
    },
    {
        title: "YouCode",
        date: "2025-04-07",
        description: "youCode aims to provide an equal opportunity to beginner and advanced level students to engage with their technical abilities. This is an environment for ...",
        image: 'https://ubcyoucode.com/_next/image?url=%2Fassets%2Flogowithtext.png&w=1920&q=75',
        status: 'upcoming',
        button: 'https://ubcyoucode.com/'
    },
    {
        title: "Elevate",
        date: "2025-03-07",
        description: "Looking to explore entrepreneurship but don’t know where to start? 😵‍💫 ELEVATE is your first step in entrepreneurship and learning how to pitch 🛗 Undergo the entire process of developing an elevator pitch through interactive workshops and beginner-friendly frameworks ⚡️",
        image: 'https://amsclubs.ca/eprojects/wp-content/uploads/sites/312/2024/04/Screen-Shot-2024-09-27-at-4.35.26-PM-1440x436.png',
        status: 'finished',
        button: 'https://www.ubceprojects.com/'
    },
    {
        title: "nwHacks",
        date: "2026-01-17/18",
        description: "Everyone is welcome at nwHacks, whether you are just getting into tech or are a seasoned hacker. Join us in-person on January 17-18, 2026 for a weekend of ...",
        image: 'https://i.ytimg.com/vi/yXU19LzAQyo/maxresdefault.jpg',
        status: 'active',
        button: 'https://nwhacks.io/'
    },
    {
        title: "YouCode",
        date: "2025-04-07",
        description: "youCode aims to provide an equal opportunity to beginner and advanced level students to engage with their technical abilities. This is an environment for ...",
        image: 'https://ubcyoucode.com/_next/image?url=%2Fassets%2Flogowithtext.png&w=1920&q=75',
        status: 'upcoming',
        button: 'https://ubcyoucode.com/'
    },
    {
        title: "Elevate",
        date: "2025-03-07",
        description: "Looking to explore entrepreneurship but don’t know where to start? 😵‍💫 ELEVATE is your first step in entrepreneurship and learning how to pitch 🛗 Undergo the entire process of developing an elevator pitch through interactive workshops and beginner-friendly frameworks ⚡️",
        image: 'https://amsclubs.ca/eprojects/wp-content/uploads/sites/312/2024/04/Screen-Shot-2024-09-27-at-4.35.26-PM-1440x436.png',
        status: 'finished',
        button: 'https://www.ubceprojects.com/'
    }
];


export const Opportunities = (): ReactElement => { 
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