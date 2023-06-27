import React from 'react';
import DataTable from 'react-data-table-component';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/Admin/Layout';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

function atualizarPagina(forcededorId, setorId, get) {

    get(route('admin.historico.index', {setor: setorId, fornecedor: forcededorId}))
}
const FilterComponent = ({filterText, onFilter, setores, setorAtual, get}) => (
    <div className="row">
        <div className="col-6">
        <TextField select label="Setores" size="small" fullWidth
                   defaultValue={setorAtual ?? ''}
                   onChange={e => atualizarPagina(null, e.target.value, get)}
        >
            <MenuItem value="todos">Todos</MenuItem>
            {setores.map((setor, index) => {
                return (
                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                )
            })}
        </TextField></div>
        <div className="col-6">
        <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
    </div>
    </div>
);

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: 0,
    }, {
        name: 'Status',
        selector: row => <>
            <span>
                {row.status}<br/>
                {row.data_criacao}
            </span>
        </>,
        sortable: true,
    }, {
        name: '',
        selector: row => <>
            <span className="text-bold">Cliente: </span>{row.cliente}<br/>
            <span className="text-bold">Consultor: </span>{row.consultor}<br/>
            <span className="text-bold">Integrador: </span>{row.integrador}<br/>
        </>,
        sortable: false,
        grow: 2,
    }, {
        name: 'Valor',
        selector: row => <>
            <span className="text-bold"></span>{row.valor}<br/>
            <span className="text-bold">Setor:<br/> </span>{row.setor}<br/>
        </>,
        sortable: true,
        grow: 1,
    }, {
        cell: row =>
            <a className="btn btn-primary btn-sm py-1 px-2 mx-0 mt-3"
               href={route('admin.pedidos.show', row.id)}>
                Ver
            </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export default function Filtering({pedidos, setores, setorAtual}) {
    const {get} = useForm();
    // Dados
    const linhas = pedidos.map(function (items) {
        return {
            id: items.id,
            cliente: items.cliente.nome,
            consultor: items.consultor,
            integrador: items.integrador,
            valor: 'R$ ' + items.preco,
            status: items.status,
            setor: items.setor.nome,
            data_criacao: items.data,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const filteredItems = linhas.filter(
        item => item.cliente && item.cliente.toLowerCase().includes(filterText.toLowerCase())
            || item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())
            || item.integrador && item.integrador.toLowerCase().includes(filterText.toLowerCase())
            || item.id && item.id.toString() === filterText
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText} setores={setores} setorAtual={setorAtual} get={get}/>
        );
    }, [filterText]);


    return (
        <Layout container titlePage="Histórico de Pedidos" menu="pedidos" submenu="historico">

            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationPerPage={25}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                striped
                highlightOnHover
                selectableRowsHighlight
            />
        </Layout>
    );
};
