import Layout from "@/Layouts/Layout";
import DataTable from "react-data-table-component";
import React from "react";
import {TextField} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";

const FilterComponent = ({filterText, onFilter}) => (
    <TextField
        id="search"
        type="text"
        placeholder="Pesquisar..."
        value={filterText}
        onChange={onFilter}
        size="small"
    />
)

export default function ({historicoLeads, historicoNotificacoes}) {
    const [filterText, setFilterText] = React.useState('');
    const [filterTextNotificacao, setFilterTextNotificacao] = React.useState('');

    const linhas = historicoLeads.map(function (items) {
        return {
            id: items.id,
            nome: items.nome,
            status: items.status,
            data: items.data,
            contato: items.contato,
            msg: items.msg,
            pedido_id: items.pedido_id,
        }
    });

    const linhasNotificacao = historicoNotificacoes.map(function (items) {
        return {
            nome: items.nome,
            data: items.data,
            msg: items.msg
        }
    });


    const columns = [
        {
            name: '',
            selector: row => <div>
                <b>Lead:</b> #{row.id}<br/>
                {row.data}
            </div>,
            sortable: true,
            grow: 1,
        }, {
            name: '',
            selector: row => <div className="row py-2">
                <span className="d-block mb-1"><b>{row.nome}</b></span>
                {row.contato && <span><b>Meio Contato:</b> {row.contato}<br/></span>}
                {row.status && <span><b>Status:</b> {row.status}<br/></span>}
            </div>,
            sortable: true,
            grow: 2,
        }, {
            name: '',
            selector: row => <div className="row py-2">
                {row.msg && <span><b>Msg:</b> {row.msg}</span>}
            </div>,
            sortable: true,
            grow: 3,
        }, {
            name: '',
            selector: row => <div className="row py-2">
                <a href={route('admin.clientes.leads.leads-main.show', row.id)}>Ver Lead</a>
                {row.pedido_id && <a href={route('admin.pedidos.show', row.pedido_id)}>Ver Pedido</a>}
            </div>,
            sortable: true,
            grow: 1,
        },
    ];
    const columnsNotificacao = [
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
    const filteredItemsNotificacao = linhasNotificacao.filter(
        item =>
            item.data && item.data.toLowerCase().includes(filterTextNotificacao.toLowerCase())
            || item.msg && item.msg.toLowerCase().includes(filterTextNotificacao.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText}/>
        );
    }, [filterText]);
    const subHeaderComponentMemoNotificacao = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterTextNotificacao(e.target.value)}
                             filterTextNotificacao={filterTextNotificacao}/>
        );
    }, [filterTextNotificacao]);

    return (
        <Layout empty titlePage="Históricos de Leads" menu="leads" submenu="leads-historico">
            <CardContainer>
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination subHeader
                    paginationPerPage="20"
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </CardContainer>
            <CardContainer>
                <DataTable
                    columns={columnsNotificacao}
                    data={filteredItemsNotificacao}
                    pagination
                    paginationPerPage="10"
                    subHeader
                    subHeaderComponent={subHeaderComponentMemoNotificacao}
                    persistTableHead
                    selectableRowsHighlight
                />
            </CardContainer>
        </Layout>
    )
}
