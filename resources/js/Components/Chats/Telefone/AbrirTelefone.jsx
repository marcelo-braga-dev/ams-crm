import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import {Check, CheckCircle, CheckCircleFill, Telephone, X, XCircle, XCircleFill} from "react-bootstrap-icons";
import {Badge, IconButton, Menu, Stack, Typography} from "@mui/material";
import {router} from "@inertiajs/react";

function AbrirTelefone({telefones}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ativarTelefone = (id) => {
        router.post(route('admin.leads.alterar-status.telefone', {id}),
            {status: true, _method: 'PUT'}, {preserveScroll: true})
    }

    const inativarTelefone = (id) => {
        router.post(route('admin.leads.alterar-status.telefone', {id}),
            {status: false, _method: 'PUT'}, {preserveScroll: true})
    }

    return (
        <>
            <Badge badgeContent={telefones.length} color="info"
                   anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'right',
                   }}>
                {telefones.length > 0
                    ? <Telephone size={24} cursor="pointer" color="blue" onClick={handleClick}/>
                    : <Telephone size={24} color="gray"/>}
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
                {telefones.map(({id, status_telefone, telefone_padronizado}) => status_telefone !== 0 && (
                        <Stack key={id} direction="row" spacing={0} alignItems="center" marginInlineStart={1}>
                            <IconButton size="small" onClick={() => ativarTelefone(id)} sx={{padding: 0, margin: 0}}>
                                {status_telefone === 1
                                    ? <CheckCircleFill color="green" size={18}/>
                                    : <Check color="green" size={18}/>
                                }
                            </IconButton>
                            <IconButton size="small" onClick={() => inativarTelefone(id)}>
                                {status_telefone === 0
                                    ? 'X'
                                    : <X color="red" size={18}/>
                                }
                            </IconButton>
                            <MenuItem>
                                <Typography>{telefone_padronizado}</Typography>
                            </MenuItem>
                        </Stack>
                    )
                )}
            </Menu>
        </>
    )
}

export default AbrirTelefone;



