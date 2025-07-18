import { ReactElement, useMemo, useState } from 'react';
import { Flex, Title, Box, Select } from '@mantine/core';
import { DateTab } from '@components/roomBookings/DateSelector';
import RoomTabs from '@components/roomBookings/RoomTabs'; 
import { ViewTab } from '@components/roomBookings/ViewSelector'; 
export const RoomBookings = (): ReactElement => { 

    return (
        <Flex>
            
            <Box p="md" style={{ flex: 1 }}>
                <Title order={2} mb="md">Book a Room</Title>
                <Flex mb="md" gap="md">
                    <RoomTabs /> 
                    <ViewTab />
                    <Title order={3} mb="md">Date</Title>
                    <DateTab />
                </Flex>
                
            </Box>
        </Flex>
      );
};

export default RoomBookings;