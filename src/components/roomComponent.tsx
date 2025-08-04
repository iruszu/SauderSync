import {
    Card,
    Image,
    Text,
    Button,
    Group,
    ScrollArea,
  } from '@mantine/core';
  import { Link } from 'react-router-dom';
  
  interface componentProps {
    image: string;
    title: string;
    date: string;
    description: string;
    roomPath: string;
    eventTime: string; 
  }
  
  const roomComponent = ({
    image,
    title,
    date,
    description,
    roomPath,
    eventTime,
  }: componentProps) => {
    
  
    const parsedDate = new Date(date);
  
    const formattedDate = parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <Card
        shadow="md"
        padding="lg"
        radius="xl"
        withBorder
        style={{ height: '400px', maxWidth: '400px', margin: '0 auto' }}
      >
        <Card.Section>
          <Image src={image} alt={title} fit="cover" height="175" width="100%" />
        </Card.Section>
  
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{title}</Text>
            <Text size="sm" c="dimmed">
              {eventTime}
            </Text>
        </Group>
  
        <Text size="sm" c="dimmed">
          {formattedDate}
        </Text>
  
        <ScrollArea h="200px" type="hover" style={{ marginTop: '10px' }}>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </ScrollArea>
  
        <Group mt="md" mb="xs">
          <Button
            radius="lg"
            style={{ flex: 1, backgroundColor: '#62BB45', color: 'white' }}
            component={Link}
            to={`/bookings?roomId=${roomPath}`}
            >
            Change
          </Button>
        </Group>
      </Card>
    );
  };
  export default roomComponent;
  