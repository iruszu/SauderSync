import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  IconHomeFilled,
  IconBriefcase2Filled,
  IconInfoSquareRoundedFilled,
  IconLogout,
  IconBookmarksFilled,
  IconSettings,
  IconLibraryFilled,
} from '@tabler/icons-react';
import { Group } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import logo from './logo.png';

const data = [
  { link: '/', label: 'Home', icon: IconHomeFilled },
  { link: '/opportunities', label: 'Opportunities', icon: IconBriefcase2Filled },
  { link: '/roomBookings', label: 'Room Bookings', icon: IconBookmarksFilled },
  { link: 'https://library.ubc.ca/', label: 'Library Catalog', icon: IconLibraryFilled, external: true },
  { link: '/createOpportunity', label: 'Create Opportunity', icon: IconInfoSquareRoundedFilled },
];

function NavbarSimple() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    // Update active state when the route changes
    setActive(location.pathname);
  }, [location]);

  const links = data.map((item) =>
    item.external ? (
      <a
        key={item.label}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </div>
      </a>
    ) : (
      <NavLink
        className={classes.link}
        to={item.link}
        data-active={item.link === active || undefined}
        key={item.label}
        onClick={() => setActive(item.link)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </div>
      </NavLink>
    )
  );

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

export default NavbarSimple;