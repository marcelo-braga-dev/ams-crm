import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import TextField from "@mui/material/TextField";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import MenuItem from "@mui/material/MenuItem";

const FilterComponent = ({filterText, onFilter, setFiltro}) => (
    <>
        <TextField select label="Filtro" defaultValue="nome" size="small"
                   onChange={event => setFiltro(event.target.value)}>
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

const columns = [
    {
        name: 'Cliente',
        selector: row => <div className="py-3">
            <b>{row.name}</b><br/>
            ID: #{row.id}<br/>
            {row.razao_social && <span className="d-block">{row.razao_social}</span>}
            {row.cnpj && <span className="d-block">CNPJ: {row.cnpj}</span>}
            {row.telefone && <span className="d-block">{row.telefone}</span>}
            {row.cidade && <span className="d-block">{row.cidade} / {row.estado}</span>}
            {row.estado && <span className="d-block">{row.data_criacao}</span>}
        </div>,
        sortable: true,
        grow: 3,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Consultor',
        selector: row => <b>{row.consultor}</b>,
        sortable: true,
        grow: 2,
    }, {
        cell: row => <a className="btn btn-primary btn-sm m-0"
                        href={route('admin.clientes.leads.leads-main.show', row.id)}>
            Ver
        </a>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 0,
    },
];

function getFilteredItems(linhas, filtro, filterText) {
    return linhas.filter(
        item => filtro === 'id' &&
            item.id && item.id.toString() === filterText
            || filtro === 'id' && filterText === ''

            || filtro === 'nome' &&
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
            || filtro === 'nome' &&
            item.razao_social && item.razao_social.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'telefone' &&
            item.telefone && item.telefone.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))

            || filtro === 'cidade' &&
            item.cidade && item.cidade.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'cnpj' &&
            item.cnpj && item.cnpj.replace(/[^0-9]/g, '').includes(filterText.replace(/[^0-9]/g, ''))

            || filtro === 'consultor' &&
            item.consultor && item.consultor.toLowerCase().includes(filterText.toLowerCase())

            || filtro === 'ddd' &&
            item.telefone && item.telefone.toLowerCase().includes('(' + filterText.toLowerCase() + ')')
            || filtro === 'ddd' && filterText === ''
    );
}

export default function Filtering({dados, categorias, categoriaAtual}) {

    // Dados
    const linhas = dados.map(function (items) {
        return {
            id: items.id,
            name: items.cliente.nome,
            cnpj: items.cliente.cnpj,
            razao_social: items.cliente.razao_social,
            status: items.infos.status,
            consultor: items.consultor.nome,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
        }
    });
    // Dados - fim

    const [filterText, setFilterText] = React.useState('');

    const [filtro, setFiltro] = useState('nome');

    const filteredItems = getFilteredItems(linhas, filtro, filterText);

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                             filterText={filterText}
                             setFiltro={setFiltro}/>
        );
    }, [filterText]);

    return (
        <Layout container titlePage="Leads Cadastrados" menu="leads" submenu="leads-cadastrados">
            <h6>Setores</h6>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                {categorias.map((categoria, index) => {
                    return (
                        <a type="button" key={index}
                           href={route('admin.clientes.leads.leads-cadastrados', {categoria: categoria.id})}
                           className={(categoria.id == categoriaAtual ? 'active' : '') + " btn btn-outline-dark "}>
                            {categoria.nome}
                        </a>
                    )
                })}
            </div>
            <div className="row justify-content-between px-4">
                <div className="col-md-auto"></div>
                <div className="col-md-auto">
                    <a href={route('admin.clientes.leads.ocultos')} className="btn btn-dark btn-sm">
                        Ocultos</a>
                </div>
            </div>

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
