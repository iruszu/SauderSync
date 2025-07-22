import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ScrollArea,
  ActionIcon,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface componentProps {
  key: string;
  image: string;
  title: string;
  date: string;
  description: string;
  status: string;
  eventURL: string;
}

const MyComponent = ({
  key,
  image,
  title,
  date,
  description,
  status,
  eventURL,
}: componentProps) => {
  const [liked, setLiked] = useState(false);
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
        <Badge color={getBadgeColor(status)}>{status}</Badge>
      </Group>

      <Text c="dimmed" size="sm" mt="xs">
        Event date: {date}
      </Text>
      <ScrollArea h={100} type="scroll" scrollbarSize={8}>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </ScrollArea>
      <Group mt="xs">
        <Button
          radius="lg"
          style={{ flex: 1, backgroundColor: '#62BB45', color: 'white' }}
          component={Link}
          to={eventURL}
        >
          Show details
        </Button>
        <ActionIcon
          variant="transparent"
          radius="lg"
          size={36}
          style={{
            color: liked ? 'red' : 'var(--mantine-color-red-6)',
            width: '20px',
            height: '20px',
          }}
          onClick={() => setLiked(!liked)} // Toggle between true and false
        >
          <IconHeart fill={liked ? 'red' : 'none'} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
export default MyComponent;
