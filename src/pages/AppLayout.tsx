import { NavbarSimple } from '@components/navigationBar';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{ background: '#fff' }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar p="xs" withBorder={false}>
        <NavbarSimple />
      </AppShell.Navbar>

      <AppShell.Main style={{ background: '#fff' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Home;
