import { useState } from 'react';
import {
  IconHomeFilled,
  IconBriefcase2Filled,
  IconInfoSquareRoundedFilled,
  IconLogout,
  IconBookmarksFilled,
  IconSettings,
  IconLibraryFilled,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import logo from './ubcSauder.jpg'; // Adjust the path as needed
import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';



// <NavLink
//   label="Home"
//   component={Link}
//   to="/"
// />

const data = [
  { link: '/', label: 'Home', icon: IconHomeFilled },
  { link: '/opportunities', label: 'Opportunities', icon: IconBriefcase2Filled },
  { link: '/roomBookings', label: 'Room Bookings', icon: IconBookmarksFilled },
  { link: '/createOpportunity', label: 'Library Catalog', icon: IconLibraryFilled },
  { link: '', label: 'About', icon: IconInfoSquareRoundedFilled },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      label={item.label}
      component={Link}
      to={item.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
      leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}

    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img src={logo} className={classes.logo} />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
