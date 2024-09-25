import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import {Check, CheckCircle, CheckCircleFill, Telephone, X, XCircle, XCircleFill} from "react-bootstrap-icons";
import {Badge, IconButton, Menu, Stack, Typography} from "@mui/material";
import {router} from "@inertiajs/react";

function AbrirTelefone({telefones, atualizarCards}) {
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

    const ativarTelefone = (id) => {
        axios.post(route('auth.chats.telefone.alterar-status', {id}),
            {status: true, _method: 'PUT'}, {preserveScroll: true})
        atualizarCards()
    }

    const inativarTelefone = (id) => {
        router.post(route('auth.chats.telefone.alterar-status', {id}),
            {status: false, _method: 'PUT'}, {preserveScroll: true})
        atualizarCards()
    }

    return (
        <>
            <Badge badgeContent={telefones.length}
                   sx={{
                       '& .MuiBadge-badge': {
                           backgroundColor: (indices.length > 0 ? 'blue' : '#aaa'),
                           color: 'white',
                       },
                   }}
                   anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'right',
                   }}>
                {indices.length > 0
                    ? <Telephone size={24} cursor="pointer" color="blue" onClick={handleClick}/>
                    : <Telephone size={24} cursor="pointer" color="gray" onClick={handleClick}/>}
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
                {telefones.map(({id, status_telefone, telefone}) => (
                        <Stack key={id} direction="row" spacing={0} alignItems="center" marginInlineStart={1}>
                            <IconButton size="small" onClick={() => ativarTelefone(id)} sx={{padding: 0, margin: 0}}>
                                {status_telefone === 2
                                    ? <CheckCircleFill color="green" size={18}/>
                                    : <Check color="green" size={18}/>
                                }
                            </IconButton>
                            <IconButton size="small" onClick={() => inativarTelefone(id)}>
                                {status_telefone === 0
                                    ? <XCircleFill color="red" size={18}/>
                                    : <X color="red" size={18}/>
                                }
                            </IconButton>
                            <MenuItem>
                                <Typography color={status_telefone === 0 ? '#ccc' : 'black'}>{telefone}</Typography>
                            </MenuItem>
                        </Stack>
                    )
                )}
            </Menu>
        </>
    )
}

export default AbrirTelefone;



