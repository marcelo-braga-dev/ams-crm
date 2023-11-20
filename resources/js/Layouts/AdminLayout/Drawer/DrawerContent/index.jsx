import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const DrawerContent = ({menu}) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation menu={menu} />
  </SimpleBar>
);

export default DrawerContent;
