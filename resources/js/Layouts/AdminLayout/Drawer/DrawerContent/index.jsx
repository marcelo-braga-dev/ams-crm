import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const DrawerContent = ({ menu, submenu, permissoes }) => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation menu={menu} submenu={submenu} permissoes={permissoes} />
    </SimpleBar>
);

export default DrawerContent;
