import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/Layout';
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";
import {CardText, Eye} from "react-bootstrap-icons";
import {Stack, Typography} from "@mui/material";

function atualizarPagina(forcededorId, setorId, get) {
    get(route('admin.historico.index', {setor: setorId, fornecedor: forcededorId}))
}

export default function Filtering({setores,}) {
    const [registros, setRegistros] = useState([])
    const [paginate, setPaginate] = useState(1)
    const [paginateDados, setPaginateDados] = useState()
    const [filtro, setFiltro] = useState('id')
    const [filtroValor, setFiltroValor] = useState()
    const [filtroSetor, setFiltroFiltroSetor] = useState()

    useEffect(() => {
        axios.get(route('admin.pedidos.historico-registros', {
            page: paginate,
            filtros: {
                filtro: filtro,
                filtro_valor: filtroValor,
                setor: filtroSetor,
            }
        }))
            .then(res => {
                setRegistros(res.data.dados)
                setPaginateDados(res.data.paginate)
            })
    }, [paginate, filtroSetor, filtro, filtroValor]);

    return (
        <Layout container titlePage="Histórico de Pedidos" menu="pedidos" submenu="pedidos-historico">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-3">
                            <TextField label="Setores" select size="small" fullWidth onChange={e => setFiltroFiltroSetor(e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-4">
                            <Stack direction="row">
                                <TextField label="Filtro" select defaultValue="id" size="small" fullWidth sx={{width: '10rem'}}
                                           onChange={event => setFiltro(event.target.value)}>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="cliente">Cliente</MenuItem>
                                    <MenuItem value="integrador">Integrador</MenuItem>
                                    <MenuItem value="consultor">Consultor</MenuItem>
                                    {/*<MenuItem value="valor">Valor</MenuItem>*/}
                                </TextField>
                                <TextField placeholder="Pesquisar..." fullWidth
                                           onChange={e => setFiltroValor(e.target.value)} size="small"/>
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
            <CardContainer>
                <CardTable title="Histórico de Pedidos" icon={<CardText size={22}/>}
                           paginate={paginate} setPaginate={setPaginate} paginateDados={paginateDados}>
                    <table className="table-1 table-hover">
                        <thead>
                        <tr>
                            <th className="text-center" style={{width: 100}}>ID</th>
                            <th></th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Setor</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {registros.map(item => (
                            <tr key={item.id} className="cursor-pointer" onClick={() => router.get(route('admin.pedidos.show', item.id))}>
                                <td className="text-center"><Typography variant="body2">#{item.id}</Typography></td>
                                <td>
                                    {item.cliente_nome && <Typography variant="body2">Cliente: {item.cliente_nome}</Typography>}
                                    {item.lead_id && <Typography variant="body2">Integrador: {item.lead_nome} [#{item.lead_id}]</Typography>}
                                    <Typography variant="body2">Consultor: {item.consultor_nome}</Typography>
                                </td>
                                <td>
                                    <Typography variant="body2">R$ {item.preco}</Typography>
                                </td>
                                <td><Typography variant="body2">{item.status}</Typography></td>
                                <td><Typography variant="body2">{item.setor.nome}</Typography></td>
                                <td><Typography variant="body2">{item.data}</Typography></td>
                                <td style={{width: 50}}><Eye size={22}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    );
};
