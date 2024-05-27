import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import DataTable from "react-data-table-component";
import React from "react";
import {TextField} from "@mui/material";

const FilterComponent = ({ filterText, onFilter }) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
)

export default function ({historicoLeads}) {
    const [filterText, setFilterText] = React.useState('');

    const linhas = historicoLeads.map(function (items) {
        return {
            nome: items.nome,
            data: items.data,
            msg: items.msg
        }
    });


    const columns = [
        {
            name: 'Data',
            selector: row => row.data,
            sortable: true,
            grow: 1,
        }, {
            name: 'Consultor(a)',
            selector: row => <b>{row.nome}</b>,
            sortable: true,
            grow: 2,
        }, {
            name: 'Mensagem',
            selector: row => <span>{row.msg}</span>,
            sortable: true,
            grow: 8,
        },
    ];

    const filteredItems = linhas.filter(
        item =>
            item.data && item.data.toLowerCase().includes(filterText.toLowerCase())
            || item.msg && item.msg.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText} />
        );
    }, [filterText]);

    return (
        <Layout titlePage="Históricos de Leads" menu="leads" submenu="leads-historico">
            <div className="row">
                <div className="col">
                    <div className="mt-4 card">
                        <div className="card-body">
                            <h6>Histórico de Notificações dos Leads</h6>
                            <DataTable
                                columns={columns}
                                data={filteredItems}
                                pagination
                                paginationPerPage="10"
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                persistTableHead
                                striped
                                highlightOnHover
                                selectableRowsHighlight
                            />
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}
