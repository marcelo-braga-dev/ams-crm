import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';

const DialogMui = ({open, onClose, title, content, onConfirm, href}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Typography variant="h6" component="div" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {title}
                    <IconButton aria-label="close" onClick={onClose} sx={{color: 'gray'}}>
                        <Close/>
                    </IconButton>
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                {content}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="info">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} variant="contained" color="success">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogMui;
