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
  startDate: string;
  description: string;
  status: string;
  eventURL: string;
  icon: string; //club icon
  clubName: string; //club name
}

const MyComponent = ({
  key,
  image,
  title,
  startDate,
  description,
  status,
  eventURL,
  icon,
  clubName,
}: componentProps) => {
  const [liked, setLiked] = useState(false);

  const parsedDate = new Date(startDate);

  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
        <Group gap="xs" align="center">
          <img
            src={icon}
            alt={`${clubName} icon`}
            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
          />
          <Text size="sm" c="dimmed">
            {clubName}
          </Text>
        </Group>
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
