import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { useId } from 'react';
import { JsonSeaLogoTitle } from './JsonSeaLogoTitle';
import { SettingsButton } from './SettingsButton';
import { ThemeToggle } from './ThemeToggle';

const _GlobalNav = () => {
  /**
   * Set id prop of each `Navbar.Item` component to resolve below warning message.
   * @warning - Warning: Prop `id` did not match. Server: "react-aria-1" Client: "react-aria-2"
   */
  const navItemId1 = useId();
  const navItemId2 = useId();
  const navItemId3 = useId();

  return (
    <Navbar isBordered maxWidth="full" height={'3.375rem'}>
      <NavbarContent justify="start">
        <NavbarItem id={navItemId1} />
      </NavbarContent>

      <NavbarContent justify="center">
        <JsonSeaLogoTitle />
      </NavbarContent>

      <NavbarContent className="gap-2" justify="end">
        <NavbarItem id={navItemId2}>
          <ThemeToggle />
        </NavbarItem>

        <NavbarItem id={navItemId3}>
          <SettingsButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export const GlobalNav = _GlobalNav;
