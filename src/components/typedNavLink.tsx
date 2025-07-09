
import { forwardRef } from 'react';
import { NavLink as MantineNavLink, NavLinkProps } from '@mantine/core';
import { Link, LinkProps } from 'react-router-dom';
import { PolymorphicComponentProps } from '@mantine/utils';


type LinkNavProps = PolymorphicComponentProps<'a', NavLinkProps> & LinkProps;


const TypedNavLink = forwardRef<HTMLAnchorElement, LinkNavProps>((props, ref) => (
  <MantineNavLink component={Link} ref={ref} {...props} />
));

export default TypedNavLink;