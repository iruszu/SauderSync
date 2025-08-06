import {
    Card,
    Image,
    Text,
    Button,
    Group,
  } from '@mantine/core';
  import { Link } from 'react-router-dom';
  import { format, parseISO } from 'date-fns';
  
  interface componentProps {
    image: string;
    title: string;
    date: string; // Should be in ISO format (e.g., "2024-05-20")
    area: string;
    description: string;
    eventTime: string; 
  }
  
  const roomComponent = ({
    image,
    title,
    date,
    area,
    description,
    eventTime,
  }: componentProps) => {
    
    // Safe date parsing with timezone handling
    const formatDisplayDate = (dateString: string) => {
      try {
        // If date includes time (ISO format), parse directly
        if (dateString.includes('T')) {
          return format(parseISO(dateString), 'MMMM d, yyyy');
        }
        // If just date (YYYY-MM-DD), add time component to prevent timezone shift
        return format(new Date(`${dateString}T12:00:00`), 'MMMM d, yyyy');
      } catch (e) {
        console.error('Error formatting date:', e);
        return 'Invalid date';
      }
    };
  
    const formattedDate = formatDisplayDate(date);
  
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
            {description}
        </Text>
        
        <Text size="sm" c="dimmed">
          {formattedDate} {/* Now shows correct date consistently */}
        </Text>
  
        <div>
            <Text fw={600}>
                Room Booking Policy
            </Text>
            <Text size="sm" c="dimmed">
                Max 2 hours per booking
            </Text>
            <Text size="sm" c="dimmed">
                Please cancel 2 hours in advance
            </Text>
        </div>
  
        <Group mt="md" mb="xs">
          <Button
            radius="lg"
            style={{ flex: 1, backgroundColor: '#62BB45', color: 'white' }}
            component={Link}
            to={`/roomBookings?date=${formattedDate}&area=${area}`}
          >
            Change
          </Button>
        </Group>
      </Card>
    );
  };
  
  export default roomComponent;