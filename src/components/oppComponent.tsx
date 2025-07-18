
import { Card, Image, Text, Badge, Button, Group, ScrollArea} from '@mantine/core';


interface componentProps {
    key: string;
    image: string;
    title: string;
    date: string;
    description: string;
    status: string;
    eventURL: string;
  }
  

const MyComponent = ({ key, image, title, date, description, status, eventURL }: componentProps) => {
    const getBadgeColor = (status: string) => {
        switch (status) {
          case 'active':
            return 'green';
          case 'upcoming':
            return 'yellow';
          case 'finished':
            return 'red';
          default:
            return 'gray';
        }
    };
    return (
        <Card shadow="sm" padding="lg" radius="xl" withBorder style={{ height: '100%', maxWidth: '380px', margin: '0 auto' }}>
            <div style={{ height: '160px', overflow: 'hidden' }}>

                <Image
                src={image}
                alt={title}
                fit="cover"
                height="100%"  
                width="100%"  
                style={{ objectFit: 'cover' }} 
                />
            </div>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
                <Badge color={getBadgeColor(status)}>{status}</Badge>
            </Group>
            
            <Text c="dimmed" size="sm" mt="xs">Event date: {date}</Text>
            <ScrollArea h={100} type="scroll" scrollbarSize={8}>
                <Text size="sm" c="dimmed">
                    {description}
                </Text>
            </ScrollArea>

            <Button color="blue" fullWidth mt="md" radius="md" component="a" href={eventURL} target="_blank">
                Click here to sign up
            </Button>
        </Card>
      );
};
export default MyComponent;



