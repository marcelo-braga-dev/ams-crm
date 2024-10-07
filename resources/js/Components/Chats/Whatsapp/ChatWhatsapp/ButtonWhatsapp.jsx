import { Badge, Menu } from '@mui/material';
import * as React from 'react';
import { TbBrandWhatsapp } from 'react-icons/tb';
import ItemsMenuSuspense from '@/Components/Chats/Whatsapp/ChatWhatsapp/MenuSuspense/ItemsMenuSuspense.jsx';

const ButtonWhatsapp = ({ telefones }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const indices = telefones
        .map((telefone, index) => (telefone.status_telefone >= 1 ? index : -1))
        .filter(index => index !== -1);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <Badge badgeContent={telefones.length}
               sx={{
                   '& .MuiBadge-badge': {
                       backgroundColor: (indices.length > 0 ? 'green' : '#aaa'),
                       color: 'white',
                   },
               }}
               anchorOrigin={{
                   vertical: 'bottom',
                   horizontal: 'right',
               }}>
            {indices.length > 0
                ? <TbBrandWhatsapp size={24} cursor="pointer" color="green" onClick={handleClick} />
                : <TbBrandWhatsapp size={24} cursor="pointer" color="gray" onClick={handleClick} />}
        </Badge>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {telefones.map(numero => <ItemsMenuSuspense key={numero.id} value={numero} />)}
        </Menu>
    </>);
};
export default ButtonWhatsapp;
