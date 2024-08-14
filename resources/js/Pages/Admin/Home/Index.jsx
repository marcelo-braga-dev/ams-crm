import React, {useState, useEffect} from "react";

import {Typography} from "@mui/material";
import Switch from '@mui/material/Switch';

import {router} from '@inertiajs/react'
import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import Grid from "@mui/material/Unstable_Grid2";

export default function ({notificacoesPedidos}) {

    const alterarNotificar = (id, value) => {
        router.post(route('admin.notificacoes.pedidos.update', id), {
            _method: 'put',
            status: value,
        })
    }

    return (
        <Layout titlePage="Home">
            <Grid container spacing={3}>
                <Grid>
                    <CardContainer>
                        <CardTitle title="Notificações de Pedidos"/>
                        <CardBody>
                            {notificacoesPedidos.map((dados, index) => {
                                return (
                                    <div key={index} className="mb-2 border-bottom pb-1">
                                        <Typography><b>{dados.titulo}</b></Typography>
                                        <small>{dados.msg}</small>
                                        <div className="row justify-content-between">

                                            <div className="col-auto">
                                                <Typography variant="body2" component="span">
                                                    {dados.data}
                                                </Typography>
                                            </div>
                                            <div className="col-auto">
                                                <Typography variant="body2" component="span">
                                                    <b>Categoria:</b> {dados.categoria}
                                                </Typography>
                                            </div>
                                            <div className="col-auto">
                                                <Switch defaultChecked={!!dados.notificar} className="m-0" size="small"
                                                        onChange={e => alterarNotificar(dados.id, e.target.checked)}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </CardBody>
                    </CardContainer>
                </Grid>
            </Grid>
        </Layout>
    )
}
