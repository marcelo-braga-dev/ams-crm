import {useState} from 'react';
import Layout from "@/Layouts/Admin/Layout";

import {DataGrid} from '@mui/x-data-grid';

const columns = [
    {field: 'id', headerName: 'ID', type: 'number', width: 70 },
    {field: 'cliente', headerName: 'Cliente', width: 300 },
    {field: 'consultor', headerName: 'Consultor', width: 200 },
    {field: 'localizacao', headerName: 'Cidade/Estado', width: 200 },
    {field: 'data_criacao', headerName: 'Data do Cadastro', width: 150 },
];

export default function Create({dados}) {
    let linhas = dados.map(function (dado) {
        return {
            'id': dado.id,
            'cliente': dado.cliente.nome,
            'consultor': dado.consultor.nome,
            'localizacao': dado.cliente.cidade + '/' + dado.cliente.estado,
            'data_criacao': dado.infos.data_criacao
        };
    });

    return (
        <Layout titlePage="Leads Cadastrados">
            <div className="container bg-white px-lg-6 py-lg-5 rounded">
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <a href={route('admin.clientes.leads.leads-main.index')} className="btn btn-primary">Encaminhar
                            LEADS</a>
                    </div>
                </div>


                <div style={{height: 800, width: '100%'}}>
                    <DataGrid
                        rows={linhas}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[25]}
                    />
                </div>


                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>CLIENTE</th>
                            <th>CONSULTOR</th>
                            <th>CIDADE/ESTADO</th>
                            <th>ANOTAÇÕES</th>
                            <th>CADASTRADO</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{dados.map((dado, i) => {*/}
                        {/*    return (<tr key={i}>*/}
                        {/*        <td>#{dado.id}</td>*/}
                        {/*        <td className="whitespace-nowrap">{dado.cliente.nome}</td>*/}
                        {/*        <td>{dado.consultor.nome}</td>*/}
                        {/*        <td>{dado.cliente.cidade}/{dado.cliente.estado}</td>*/}
                        {/*        <td>{dado.infos.anotacoes}</td>*/}
                        {/*        <td>{dado.infos.data_criacao}</td>*/}
                        {/*    </tr>)*/}
                        {/*})}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
