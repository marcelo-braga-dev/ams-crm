import Layout from '@/Layouts/Admin/Layout';
import * as React from 'react';

export default function Show({chamados, idPedido}) {

    return (
        <Layout titlePage="SAC" container voltar={route('admin.pedidos.index')}
                menu="sac" submenu="chamados">
            <div className="row justify-content-end mb-3">
                <div className="col-auto">
                    <a href={route('admin.chamado.create', {id: idPedido})} className="btn btn-dark btn-sm">Abrir
                        SAC</a>
                </div>
            </div>

            {chamados.map(function (dado, index) {
                return (
                    <div key={index} className="card border mb-4">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col">
                                    <h6 className="d-block"><b>Título: </b>{dado.titulo}</h6>
                                    <span className="d-block"><b>Cliente: </b>{dado.cliente}</span>
                                    <span className="d-block"><b>ID Pedido: </b>#{dado.id_pedido}</span>
                                    <span className="d-block"><b>Status do SAC: </b>{dado.status}</span>
                                    <span className="d-block"><b>Data: </b>{dado.data}</span>
                                </div>
                                <div className="col-auto">
                                    <a href={route('admin.chamado.edit', dado.id)}
                                       className="btn btn-primary m-2">Abrir</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Layout>)
}







