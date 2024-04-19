import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const DrawerContent = ({ menu, permissoes }) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation menu={menu} permissoes={permissoes} />
  </SimpleBar>
);

export default DrawerContent;
