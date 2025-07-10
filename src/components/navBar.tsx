
import {  NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
      <>
        <NavLink
          label="Home"
          component={Link}
          to="/"
        />
        <NavLink
          label="Opportunities"
          component={Link}
          to="/opportunities"
        />
        <NavLink
          label="News"
          component={Link}
          to="/news"
        />
        <NavLink
          label="Room Bookings"
          component={Link}
          to="/roombookings"
        />
        <NavLink
          label="Authentication"
          component={Link}
          to="/authentication"
        />
      </>
    );
  };


export default NavigationBar;



