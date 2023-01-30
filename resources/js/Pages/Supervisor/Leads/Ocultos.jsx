import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Supervisor/Layout';
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

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
        name: 'Data',
        selector: row => row.data_criacao,
        sortable: true,
    },
];

export default function Filtering({dados}) {
    // Form
    const {data, post, setData} = useForm();
    // form - fim

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            razao_social: items.cliente.razao_social,
            data_criacao: items.infos.data_criacao,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const filteredItems = linhas.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            || item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())
            || item.id && item.id.toString() === filterText,
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText}/>
        );
    }, [filterText]);

    const handleChange = row => {
        setData('leads', row.selectedRows)
    };

    // Form Restaurar
    function restaurar() {
        post(route('supervisor.clientes.leads.restaurar'))
    }

    // Form Restaurar - fim

    return (
        <Layout titlePage="Encaminhar Leads">
            <div className="container bg-white p-2 py-4 rounded">

                <h5 className="mx-4 mb-3">Leads Ocultos</h5>
                <div className="row justify-content-between mx-4">
                    <div className="col-md-auto ">
                        <button type="button" className="btn btn-primary"
                                onClick={() => restaurar()}>
                            Restaurar Selecionados
                        </button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationPerPage={25}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    persistTableHead
                    onSelectedRowsChange={handleChange}
                />

            </div>

        </Layout>
    );
};
