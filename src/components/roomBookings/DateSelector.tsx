import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

export function DateTab() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}