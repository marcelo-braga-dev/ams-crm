import {useState} from 'react';
import Layout from "@/Layouts/Admin/Layout";

export default function Create({dados}) {
    return (
        <Layout titlePage="Leads Cadastrados">
            <div className="container bg-white px-lg-6 py-lg-5 rounded">
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <a href={route('admin.clientes.leads.leads-main.index')} className="btn btn-primary">Encaminhar
                            LEADS</a>
                    </div>
                </div>
                <table className="table table-responsive">
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
                    {dados.map((dado, i) => {
                        return (<tr key={i}>
                            <td>#{dado.id}</td>
                            <td>{dado.cliente.nome}</td>
                            <td>{dado.consultor.nome}</td>
                            <td>{dado.cliente.cidade}/{dado.cliente.estado}</td>
                            <td>{dado.infos.anotacoes}</td>
                            <td>{dado.infos.data_criacao}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
