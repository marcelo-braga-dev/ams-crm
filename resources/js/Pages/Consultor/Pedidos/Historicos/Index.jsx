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
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Cliente',
        selector: row => row.cliente,
        sortable: true,
    },
    {
        name: 'Consultor',
        selector: row => row.consultor,
        sortable: true,
    },
    {
        name: 'Integrador',
        selector: row => row.integrador,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Valor',
        selector: row => row.valor,
        sortable: true,
    },
    {
        name: 'Data',
        selector: row => row.data_criacao,
        sortable: true,
        grow: 2,
    },
    {
        cell: row => <a className="btn btn-link btn-sm" href={route('consultor.pedidos.show', row.id)}>
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
        <Layout container titlePage="Hist??rico de Pedidos">

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
