import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {
    Backdrop,
    CircularProgress,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText, Select,
    TextField
} from "@mui/material";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";

import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

import FormControl from '@mui/material/FormControl';

const FilterComponent = ({filterText, onFilter, setFiltro}) => (
    <>
        <TextField
            id="outlined-select-currency"
            select
            placeholder="asas"
            label="Filtro"
            defaultValue="nome"
            size="small"
            onChange={event => setFiltro(event.target.value)}
        >
            <MenuItem value="id">
                ID
            </MenuItem>
            <MenuItem value="nome">
                Nome/Razão Social
            </MenuItem>
            <MenuItem value="cnpj">
                CNPJ
            </MenuItem>
            <MenuItem value="consultor">
                Consultor
            </MenuItem>
            <MenuItem value="cidade">
                Cidade
            </MenuItem>
            <MenuItem value="ddd">
                DDD
            </MenuItem>
            <MenuItem value="telefone">
                Telefone
            </MenuItem>

        </TextField>
        <TextField
            id="search"
            type="text"
            placeholder="Pesquisar..."
            value={filterText}
            onChange={onFilter}
            size="small"
        />
    </>
);


export default function Filtering({dados, consultores, categorias, categoriaAtual}) {
    // loading
    const [open, setOpen] = useState(false);

    // Form
    const {data, post, setData} = useForm({
        'leads': []
    });

    const [leadsChecked, setLeadsChecked] = React.useState([]);
    const [consultorSelecionado, setConsultorSelecionado] = React.useState();

    const handleToggle = (value) => () => {
        const currentIndex = leadsChecked.indexOf(value);
        const newChecked = [...leadsChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setLeadsChecked(newChecked);
    };

    const columns = [
        {
            cell: row => <div className="row w-100 g-4">
                <div className="col p-0">
                    <ListItem
                        key={1} disablePadding
                        secondaryAction={
                            <a className="btn btn-primary btn-sm mt-2"
                               href={route('admin.clientes.leads.leads-main.show', row.id)}>
                                Abrir
                            </a>
                        }>
                        <ListItemButton role={undefined} onClick={handleToggle(row.id)} dense>
                            <div className="row w-100 py-1">
                                <div className="col-auto">
                                    <ListItemIcon className="d-block ">
                                        <Checkbox
                                            edge="start"
                                            checked={leadsChecked.indexOf(row.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                </div>
                                <div className="col-auto">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td><PersonIcon sx={{fontSize: 25}}/></td>
                                            <td>
                                                <span className="d-block"
                                                      style={{fontSize: 14}}><b>{row.name}</b></span>
                                                <span style={{fontSize: 15}}>{row.razao_social}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <small className="me-4">ID: #{row.id}</small>
                                                <small className="me-4">{row.data_criacao}</small>
                                            </td>
                                        </tr>
                                        {row.cnpj && <tr>
                                            <td>
                                                <AssignmentOutlinedIcon sx={{fontSize: 20}}/>
                                            </td>
                                            <td>
                                                <span className="d-block">CNPJ: {row.cnpj}</span>
                                            </td>
                                        </tr>}
                                        {row.telefone && <tr>
                                            <td>
                                                <LocalPhoneOutlinedIcon sx={{fontSize: 20}}/>
                                            </td>
                                            <td>
                                                <span className="d-block">{row.telefone}</span>
                                            </td>
                                        </tr>}

                                        {(row.cidade || row.estado) && <tr>
                                            <td>
                                                <FmdGoodOutlinedIcon sx={{fontSize: 20}}/>
                                            </td>
                                            <td>
                                                <span className="d-block">{row.cidade} {row.estado &&
                                                    <span>- {row.estado}</span>}</span>
                                            </td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </ListItemButton>
                    </ListItem>
                </div>
            </div>,
        },
    ];
    console.log(leadsChecked)
    console.log(consultorSelecionado)

    function submit() {
        if (consultorSelecionado && leadsChecked) {
            setOpen(!open);
            router.post(route('admin.clientes.leads.update-consultor',
                {leadsSelecionados: leadsChecked, consultor: consultorSelecionado}))
        }
        router.on('success', (event) => {
            setLeadsChecked([])
            setConsultorSelecionado()
            setOpen(false)
        })
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            razao_social: items.cliente.razao_social,
            cnpj: items.cliente.cnpj,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const [filtro, setFiltro] = useState('nome');

    const filteredItems = linhas.filter(
        item => filtro === 'id' &&
            item.id && item.id.toString() === filterText
            || filtro === 'id' && filterText === ''

            || filtro === 'nome' &&
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'nome' &&
            item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'telefone' &&
            item.telefone && item.telefone.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'cidade' &&
            item.cidade && item.cidade.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'consultor' &&
            item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'cnpj' &&
            item.cnpj && item.cnpj.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'ddd' &&
            item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === ''
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText}
                             setFiltro={setFiltro}/>
        );
    }, [filterText]);

    const handleChange = row => {
        setData('leads', row.selectedRows)
    };

    // Form Excluir
    function excluir() {
        post(route('admin.clientes.leads.delete'))
        window.location.reload();
    }

    // Form Excluir - fim

    // Form Ocultar
    function ocultar() {
        post(route('admin.clientes.leads.ocultar'))
        window.location.reload();
    }

    // Form Ocultar - fim

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            Enviar <b>{leadsChecked.length}</b> Leads Selecionados para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    return (
        <Layout container titlePage="Enviar Leads para Consultores" menu="leads" submenu="leads-encaminhar">
            <h6>Setores</h6>
            <div className="btn-group mb-4" role="group" aria-label="Basic outlined example">
                {categorias.map((categoria, index) => {
                    return (
                        <a type="button" key={index}
                           href={route('admin.clientes.leads.leads-main.index', {categoria: categoria.id})}
                           className={(categoria.id == categoriaAtual ? 'active' : '') + " btn btn-outline-dark"}>
                            {categoria.nome}
                        </a>
                    )
                })}
            </div>

            <form onSubmit={submit}>
                <div className="row justify-content-between mb-4">
                    <div className="col-md-6">
                        <div className="row mx-3">
                            <div className="col-8 ml-4">
                                <TextField label="Selecione o Consultor..." select
                                           value={consultorSelecionado ?? ''}
                                           fullWidth required
                                           onChange={e => setConsultorSelecionado(e.target.value)}>
                                    {consultores.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            #{option.id} - {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-4 p-0">
                                <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                        data-bs-target="#modalEnviar">
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-auto ">
                        <button type="button" className="btn btn-link" data-bs-toggle="modal"
                                data-bs-target="#modalEsconder">
                            <VisibilityOffIcon/>
                            OCULTAR
                        </button>
                        <button type="button" className="btn btn-link text-danger" data-bs-toggle="modal"
                                data-bs-target="#modalExcluir">
                            <DeleteIcon/>
                            EXCLUIR
                        </button>
                    </div>
                </div>
            </form>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationPerPage={25}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                style={{width: '100%'}}
                // selectableRows
                // persistTableHead
                // onSelectedRowsChange={handleChange}
                // striped
                // highlightOnHover
                // selectableRowsHighlight
                // selectableRowsComponent={Checkbox}
            />

            {/*MODAL ENVIAR*/}
            <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enviar Leads</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                            {!leadsChecked.length &&
                                <div className="alert alert-danger text-white">Selecione os Leads</div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary me-4"
                                    data-bs-dismiss="modal">Fechar
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()} disabled={!leadsChecked.length || !consultorSelecionado}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL EXCLUIR*/}
            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Leads</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {leadsChecked.length ?
                                <>EXCLUIR LEADS SELECIONADOS?</> :
                                <div className="alert alert-danger text-white">Selecione os leads para excluir.</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluir()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL ESCONDER*/}
            <div className="modal fade mt-5" id="modalEsconder" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ocultar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {leadsChecked.length ?
                                <>Ocultar Leads Selecionados?</> :
                                <div className="alert alert-danger text-white">Selecione os leads para ocultar.</div>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => ocultar()}>
                                Ocultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
        </Layout>
    );
};
