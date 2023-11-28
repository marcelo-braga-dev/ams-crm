import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const DrawerContent = ({menu, submenu}) => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation menu={menu} submenu={submenu}/>
    </SimpleBar>
);

export default DrawerContent;
