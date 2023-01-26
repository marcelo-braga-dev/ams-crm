import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Supervisor/Layout';
import {useForm} from "@inertiajs/inertia-react";

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
    },
    {
        name: 'Nome/Nome Fantasia',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Razão Social',
        selector: row => row.razao_social,
        sortable: true,
    },
    {
        name: 'Consultor',
        selector: row => row.consultor,
        sortable: true,
    },
    {
        name: 'Data',
        selector: row => row.data_criacao,
        sortable: true,
    },
];

export default function Filtering({dados, consultores}) {
    // Form
    const {data, post, setData} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('supervisor.clientes.leads.update-consultor'))
    }

    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            razao_social: items.cliente.razao_social,
            consultor: items.consultor.nome,
            data_criacao: items.infos.data_criacao,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const filteredItems = linhas.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
        );
    }, [filterText]);

    const handleChange = row => {
        setData('leads', row.selectedRows)
    };

    return (
        <Layout>
            <div className="container bg-white p-2 py-4 rounded">

                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationPerPage={25}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />

            </div>
        </Layout>
    );
};
