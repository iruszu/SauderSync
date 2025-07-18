import { ReactElement, useMemo, useState } from 'react';
import { Flex, Title, Box, Select } from '@mantine/core';
import { DateTab } from '@components/roomBookings/DateSelector';
import RoomTabs from '@components/roomBookings/RoomTabs'; 
import { ViewTab } from '@components/roomBookings/ViewSelector'; 

export const RoomBookings = (): ReactElement => { 

    return (
        <Flex>
            
            <Box p="md" style={{ flex: 1 }}>
                <h1> Book a Room </h1>
                <Flex mb="md" gap="md">
                    <RoomTabs /> 
                    <ViewTab />
                    <h3>Date</h3>
                    <DateTab />
                </Flex>
                
            </Box>
        </Flex>
      );
};

export default RoomBookings;