import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {TextField} from "@mui/material";
import Layout from '@/Layouts/Admin/Layout';
import MenuItem from "@mui/material/MenuItem";
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
        post(route('admin.clientes.leads.update-consultor'))
    }

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

                <form onSubmit={submit}>
                    <h5 className="mx-4 mb-3">Enviar Leads para Consultores</h5>
                    <div className="row mx-3">
                        <div className="col-md-4 ml-4">
                            <TextField label="Selecione o Consultor..." select
                                       fullWidth required size="small"
                                       onChange={e => setData('consultor', e.target.value)}>
                                {consultores.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-auto p-0">
                            <button className="btn btn-primary" type="submit">Enviar</button>
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
                    selectableRows
                    persistTableHead
                    onSelectedRowsChange={handleChange}
                />

            </div>
        </Layout>
    );
};
