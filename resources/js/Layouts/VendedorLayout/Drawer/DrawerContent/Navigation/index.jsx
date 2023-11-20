// material-ui
import {Box} from '@mui/material';

// project import
import NavGroup from './NavGroup.jsx';
import menuItem from '@/Layouts/VendedorLayout/menu-items/index';

const Navigation = ({menu}) => {
    const navGroups = menuItem.items.map((item) => {

        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} menu={menu}/>;
            default:
                return '';
        }
    });

    return <Box sx={{pt: 2}}>{navGroups}</Box>;
};

export default Navigation;
