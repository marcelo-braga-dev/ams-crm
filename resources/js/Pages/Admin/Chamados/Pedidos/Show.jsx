import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Show({pedidos}) {

    return (
        <Layout titlePage="Histórico de Pedidos" button={true} url={route('admin.pedidos.index')} textButton={'Voltar'}>

            <div className="container bg-white px-lg-6 py-lg-5 rounded">
                s
            </div>
        </Layout>)
}







