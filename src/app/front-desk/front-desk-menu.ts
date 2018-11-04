import { NbMenuItem } from '../@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pending Orders',
    icon: 'nb-compose',
    link: '/frontdesk/pending',
    home: true,
  },
  {
    title: 'Completed Orders',
    icon: 'nb-lightbulb',
    link: '/frontdesk/completed',
  },
];
