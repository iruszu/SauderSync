
import { Card, Text, Title, Button } from '@mantine/core';


interface componentProps {
    title: string;
    date: string;
    description: string;
  }
  

const MyComponent = ({ title, date, description }: componentProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>{title}</Title>
          <Text c="dimmed" size="sm" mt="xs">{date}</Text>
          <Text mt="sm">{description}</Text>
          <Button mt="md" variant="light">Learn More</Button>
        </Card>
      );
};
export default MyComponent;