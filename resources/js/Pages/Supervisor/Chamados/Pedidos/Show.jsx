import Layout from '@/Layouts/Supervisor/Layout';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Show({chamados}) {

    return (
        <Layout titlePage="Pedidos SAC" button={true} url={route('supervisor.pedidos.index')} textButton={'Voltar'}>

            <div className="container bg-white px-lg-6 py-lg-5 rounded">
                <h6 className="mb-4">Chamados</h6>

                {chamados.map(function (dado) {
                    return (
                        <div className="card border mb-4">
                            <div className="card-body">
                                <div className="row ">
                                    <div className="col">
                                        <h6 className="d-block"><b>Título: </b>{dado.titulo}</h6>
                                        <span className="d-block"><b>Cliente: </b>{dado.cliente}</span>
                                        <span className="d-block"><b>ID Pedido: </b>#{dado.pedidos_id}</span>
                                        <span className="d-block"><b>Status do SAC: </b>{dado.status}</span>
                                        <span className="d-block"><b>Data: </b>{dado.data}</span>
                                    </div>
                                    <div className="col-auto">
                                        <a href={route('supervisor.chamado.edit', dado.id)} className="btn btn-primary m-2">Abrir</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>)
}







