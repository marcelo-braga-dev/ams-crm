import React, { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Stack, Typography } from '@mui/material';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import SetorIcone from '@/Components/Icons/SetorIcone.jsx';
import VendedorIcone from '@/Components/Icons/VendedorIcone.jsx';

const Kanban = () => {

    const { filtros, filtrar, handleFiltrar } = useFunilVendas();

    return useMemo(() => (
        <div className="row">
            <div className="mb-4 col-md-4">
                <TextField
                    label="Representante"
                    select
                    fullWidth
                    value={filtrar.usuario ?? ''}
                    onChange={(e) => handleFiltrar({ usuario: e.target.value })}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             <VendedorIcone size={25} />
                    //         </InputAdornment>
                    //     ),
                    // }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {filtros?.usuarios?.map(({ id, nome, foto }) => (
                        <MenuItem key={id} value={id}>
                            <Stack direction="row" spacing={1}>
                                <Avatar src={foto} sx={{ width: 20, height: 20 }} />
                                <Typography>{nome}</Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="mb-4 col-md-3">
                <TextField
                    label="Setor"
                    select
                    fullWidth
                    value={filtrar.setor ?? ''}
                    onChange={(e) => handleFiltrar({ setor: e.target.value })}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             <SetorIcone size={25} />
                    //         </InputAdornment>
                    //     ),
                    // }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {filtros?.setores?.map(({ id, nome }) => (
                        <MenuItem key={id} value={id}> {nome} </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    ), [filtros, filtrar])
};
export default Kanban;
