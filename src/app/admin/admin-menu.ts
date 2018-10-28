import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'Menu',
    icon: 'nb-menu',
    link: '/admin/menu',
  },
  {
    title: 'Users',
    icon: 'nb-locked',
    link: '/admin/users',
  },
  {
    title: 'Settings',
    icon: 'nb-gear',
    link: '/admin/settings',
  },
];
