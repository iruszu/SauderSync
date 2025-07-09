
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
          label="Debugger"
          component={Link}
          to="/debugger"
        />
        <NavLink
          label="Branding"
          component={Link}
          to="/branding"
        />
      </>
    );
  };


export default NavigationBar;



