// assets
import { IconAlertOctagon } from '@tabler/icons-react';

// constant
const icons = { IconAlertOctagon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'X2Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconAlertOctagon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
