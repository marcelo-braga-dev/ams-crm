import React from 'react';

// MoreMenu
import {
    IconButton,
    // Link,
    Menu,
    MenuItem,
} from '@mui/material';
import {Link} from "@inertiajs/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// MoreMenu - fim

export default function MenuMore({id, status}) {
    // MoreMenu
    const moreMenu = [
        {title: 'Ver Informações', url: route('admin.pedidos.show', id)},
        status !== 'conferencia' ? {title: 'Retroceder Pedido', url: route('admin.retroceder.edit', id)} : {},
        status !== 'entregue' ? {title: 'Carcelar Pedido', url: route('admin.cancelado.show', id)} : {},
        {title: 'Abrir SAC', url: route('admin.chamados.create', {pedido_id: id})},
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
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
                {moreMenu.map(({title, url}, index) => {
                    return (
                        title && <Link key={index} href={url} underline="none" color="inherit">
                            <MenuItem onClick={handleClose}>
                                {title}
                            </MenuItem>
                        </Link>
                    )
                })}
            </Menu>
        </div>)
}
