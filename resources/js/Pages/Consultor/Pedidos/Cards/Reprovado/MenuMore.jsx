import React from 'react';

// MoreMenu
import {
    IconButton,
    Link,
    Menu,
    MenuItem,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

// MoreMenu - fim

export default function MenuMore({id}) {
    // MoreMenu
const moreMenu = [
    {title: 'Ver Informações', url: route('consultor.pedidos.show', id)},
];
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) =>  setAnchorEl(event.currentTarget);
const handleClose = () => setAnchorEl(null);
// MoreMenu - fim

    return (
        <div>
            <IconButton className='p-0' id="long-button" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{'aria-labelledby': 'long-button',}}
                anchorEl={anchorEl} open={open} onClose={handleClose}
                PaperProps={{style: {minWidth: '10rem'}}}>
                    {moreMenu.map(({title, url}) => {
                        return (
                        <Link key={id}  href={url} underline="none" color="inherit">
                            <MenuItem key={id} onClick={handleClose}>{title}</MenuItem>
                        </Link>)
                    })}
            </Menu>
        </div>)
}
