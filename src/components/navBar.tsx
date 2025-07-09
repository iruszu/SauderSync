import { useState } from 'react';
import { IconGauge, IconDoor, IconActivity, IconZoomIn, IconHelp } from '@tabler/icons-react'
import { Box } from '@mantine/core';
import TypedNavLink from './typedNavLink'

const data = [
  { icon: IconGauge, label: 'Dashboard', description: 'Home Page', to: '/'
  },
  { icon: IconDoor,
    label: 'Room Bookings', to:'room-bookings'
  },
  { icon: IconZoomIn, label: 'Opportunities', description: 'Explore opportunities',  to:'/opportunities' },
  { icon: IconActivity, label: 'News', description: 'Get recent news updates', to: '/news' },
  { icon: IconGauge, label: 'Settings', description: 'Manage your account', to: '/settings' },
  { icon: IconHelp, label: 'Help', description: 'Get support', to: '/help' },
  
];


function NavigationBar() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <TypedNavLink
      key={item.label}
      to={item.to}
      active={index === active}
      label={item.label}
      description={item.description}
      leftSection={<item.icon size={16} stroke={1.5} />}
      onClick={() => setActive(index)}
      color="green"
    />
  ));

  return <Box w={220}>{items}</Box>;
}

export default NavigationBar;