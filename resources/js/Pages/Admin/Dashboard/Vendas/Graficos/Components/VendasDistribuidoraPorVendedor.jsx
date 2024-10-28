import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { Truck } from 'react-bootstrap-icons';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { DialogContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MetasDistribuidoras from '@/Pages/Admin/Dashboard/Vendas/Graficos/MetasDistribuidoras.jsx';
import axios from 'axios';
import { useState } from 'react';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import Dialog from '@mui/material/Dialog';

const VendasDistribuidoraPorVendedor = ({consultores,  filters}) => {
    const [vendasUsuarioDistribuidora, setVendasUsuarioDistribuidora] = useState()

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchUsuario = (id) => {
        axios.get(route('admin.dashboard.get-vendas.fornecedores-usuario', {
            usuario: id,
            mes: filters.mesesSelecionado,
            ano: filters.anoSelecionado,
            setor: filters.setorSelecionado,
            mesComp: filters.mesesSelecionadoComp,
            anoComp: filters.anoSelecionadoComp,
        }))
            .then(res => setVendasUsuarioDistribuidora(res.data))
    }

    return (
        <CardContainer>
            <CardTitle title="Vendas Distribuidora por Vendedor" icon={<Truck size="22"/>}/>
            <CardBody>
                <TextField select sx={{width: 250, marginBottom: 2}} size="small"
                           onChange={e => fetchUsuario(e.target.value)}>
                    {consultores?.map(item => (
                        <MenuItem key={item.user_id} value={item.user_id}>
                            <Stack direction="row" spacing={1}>
                                <Avatar src={item.foto} sx={{width: 20, height: 20}}/>
                                <Typography>{item.nome}</Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </TextField>

                {vendasUsuarioDistribuidora && (
                    <div className="row">
                        <div className="col text-end">
                            <button className="btn btn-warning btn-sm" onClick={handleClickOpen}>Abrir tabela</button>
                            <MetasDistribuidoras vendasDistribuidoras={vendasUsuarioDistribuidora}/>
                        </div>
                    </div>
                )}
            </CardBody>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>
                                Distribuidora
                            </th>
                            <th>
                                Valor
                            </th>
                            <th>
                                Margem
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {vendasUsuarioDistribuidora?.map(item => {
                            const total = vendasUsuarioDistribuidora.reduce((acc, item) => acc + item.valor, 0);
                            return (<tr>
                                <td>{item?.fornecedor_nome}</td>
                                <td>R$ {convertFloatToMoney(item?.valor)}</td>
                                <td>{convertFloatToMoney((item.valor / total) * 100)}%</td>
                            </tr>)
                        })}
                        {vendasUsuarioDistribuidora && <tr className="bg-light">
                            <td><Typography fontWeight="bold">TOTAL</Typography></td>
                            <td>
                                <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasUsuarioDistribuidora.reduce((acc, item) => acc + item.valor, 0))}</Typography>
                            </td>
                            <td></td>
                        </tr>}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        </CardContainer>
    )
}
export default VendasDistribuidoraPorVendedor
