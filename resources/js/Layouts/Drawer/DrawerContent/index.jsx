import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const style = {
    '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
    }
}

const DrawerContent = ({menu, submenu, permissoes}) => (
    <SimpleBar sx={style}>
        <Navigation menu={menu} submenu={submenu} permissoes={permissoes}/>
    </SimpleBar>
);

export default DrawerContent;
