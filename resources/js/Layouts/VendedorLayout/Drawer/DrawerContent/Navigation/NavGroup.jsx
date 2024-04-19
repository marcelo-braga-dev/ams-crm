// material-ui
import { Box, List, Typography } from '@mui/material';

// project import
import NavItem from './NavItem.jsx';

const NavGroup = ({ item, menu, permissoes }) => {

    const navCollapse = item.children?.map((menuItem) => {
        const menuSelected = menuItem.id === menu


        switch (menuItem.type) {
            case 'collapse':
                return (
                    <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
                        collapse - only available in paid version
                    </Typography>
                );
            case 'item':
                return permissoes?.[menuItem.id] ? <NavItem key={menuItem.id} item={menuItem} level={1} menuSelected={menuSelected} /> : '';
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        error
                    </Typography>
                );
        }
    });

    return (

        <List
            subheader={
                item.title && (
                    <Box sx={{ pl: 2, mb: 0.1 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.title}
                        </Typography>
                    </Box>
                )
            }
            sx={item.title ? { mb: 2, py: 0, zIndex: 0 } : { mb: 0, py: 0, zIndex: 0 }}
        >
            {navCollapse}
        </List>

    );
};

export default NavGroup;
