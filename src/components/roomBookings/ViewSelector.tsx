import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

export function ViewTab() { 
  const [value, setValue] = useState('day');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' }
      ]}
    />
  );
}