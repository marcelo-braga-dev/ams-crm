import React from 'react';

// Modal
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
// Modal - fim

// MoreMenu
import {
    IconButton,
    Link,
    Menu,
    MenuItem, Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { router } from '@inertiajs/react'
import Box from "@mui/material/Box";

// MoreMenu - fim

export default function MenuMore({id}) {
    // MoreMenu
    const moreMenu = [
        {title: 'Ver Informações', url: route('admin.pedidos.show', id)},
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

// MoreMenu - fim

    // Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    // Modal - fim

    function destroy(id) {
        router.post(route('admin.pedidos.destroy', id), {
            _method: 'delete',
        })
    }

    function restaurar(id) {
        router.post(route('admin.retroceder.update', id), {
            _method: 'put',
        })
    }

    return (
        <>
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
                    return (<Link key={index} href={url} underline="none" color="inherit">
                        <MenuItem onClick={handleClose}>
                            {title}
                        </MenuItem>
                    </Link>)
                })}
                <Link key="restaurar" href="#" underline="none" color="inherit" onClick={() => restaurar(id)}>
                    <MenuItem onClick={handleClose}>
                        Restaurar Pedido
                    </MenuItem>
                </Link>
                <Link key="excluir" href="#" underline="none" color="error" onClick={handleOpenModal}>
                    <MenuItem onClick={handleClose}>
                        Excluir
                    </MenuItem>
                </Link>
            </Menu>
        </div>
            {/*MODALS*/}
            {/*Excluir*/}
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style} >
                        <div className="mb-4">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Excluir o pedido ID: #{id} DEFINITIVAMENTE?
                            </Typography>
                            <Typography></Typography>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-secundary" onClick={handleCloseModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={() => destroy(id)}>Excluir</button>
                        </div>
                    </Box>
                </Modal>
            </div>
            {/*Excluir - fim */}
        </>)
}
