import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

export default function RoomTabs() {
  const [value, setValue] = useState('birm');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'Birmingham', value: 'birm' },
        { label: '4th Floor', value: '4' },
        { label: 'CLC', value: 'clc' },
        { label: 'Floor 0', value: '0' },
      ]}
    />
  );
}