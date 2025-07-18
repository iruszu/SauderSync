import  ComponentLayout from '@components/componentList';
import { NavbarSimple } from '@components/navigationBar';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import logo from '@components/ubcSauder.jpg'; 


function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
     
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
 
    >

              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
              <img src={logo} height={40} />
      </div>

          <AppShell.Navbar p="md">
              <NavbarSimple />
      </AppShell.Navbar>

          <AppShell.Main>
              <ComponentLayout />

      </AppShell.Main>
    </AppShell>
  );
}

export default Home;