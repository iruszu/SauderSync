import { useState } from 'react';
import {
  IconHomeFilled,
  IconBriefcase2Filled,
  IconInfoSquareRoundedFilled,
  IconLogout,
  IconBookmarksFilled,
  IconSettings,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimple.module.css';
import logo from './ubcSauder.jpg'; // Adjust the path as needed

const data = [
  { link: '', label: 'Home', icon: IconHomeFilled },
  { link: '', label: 'Opportunities', icon: IconBriefcase2Filled },
    { link: '', label: 'Room Bookings', icon: IconBookmarksFilled },
    { link: '', label: 'About', icon: IconInfoSquareRoundedFilled },

];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
            <img src={logo} alt="Logo" />
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
