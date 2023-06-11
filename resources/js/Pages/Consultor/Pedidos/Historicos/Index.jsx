import React from 'react';
import DataTable from 'react-data-table-component';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/Consultor/Layout';

const FilterComponent = ({filterText, onFilter}) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
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
        selector: row => row.valor,
        sortable: true,
    }, {
        cell: row =>
            <a className="btn btn-primary btn-sm py-1 px-2 mt-3"
               href={route('consultor.pedidos.show', row.id)}>
                Ver
            </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

export default function Filtering({pedidos}) {

    // Dados
    const linhas = pedidos.map(function (items) {
        return {
            id: items.pedido.id,
            cliente: items.cliente.nome,
            consultor: items.consultor.nome,
            integrador: items.integrador.nome,
            valor: 'R$ ' + items.preco.convertido,
            status: items.pedido.status,
            data_criacao: items.pedido.data_criacao,

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
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
        );
    }, [filterText]);


    return (
        <Layout container titlePage="Histórico de Pedidos">

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
