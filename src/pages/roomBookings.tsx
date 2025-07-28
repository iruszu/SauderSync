import { ReactElement, useMemo, useState } from 'react';
import { Flex, Title, Box, Select } from '@mantine/core';

export const RoomBookings = (): ReactElement => {
  return (
    <Flex>
      <Box p="md" style={{ flex: 1 }}>
        <h1> Book a Room </h1>
        <Flex mb="md" gap="md">
          <h3>Date</h3>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RoomBookings;
