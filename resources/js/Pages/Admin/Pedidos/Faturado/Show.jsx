import {router} from '@inertiajs/react'
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

import React from 'react';
import {useForm} from '@inertiajs/react';
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import {TextField} from "@mui/material";

export default function Create({pedido}) {
    const {data, setData, post} = useForm({
        msg: ''
    });

    function avancarStatus() {
        if (data.msg.length && data.msg.length <= 500) {
            router.post(route('admin.faturado.update', pedido.pedido.id), {
                _method: 'put',
                ...data
            })
        }
    }

    return (
        <Layout titlePage="Pedido Faturado" container voltar={route('admin.pedidos.index', {id_card:  pedido.pedido.id})}
                menu="pedidos" submenu="pedidos-lista">
            <div className="row mb-4">
                <div className="col">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
            </div>

            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAvancarStatus">
                Atualizar Status para Acompanhamento
            </button>

            {/*Modal*/}
            <div className="modal fade mt-5" id="modalAvancarStatus" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Informações da Entrega</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <TextField label="Informações da Entrega" required multiline fullWidth rows="4"
                                       onChange={e => setData('msg', e.target.value)}/>
                            <small className={data.msg.length > 500 ? "text-danger" : "text-muted"}>
                                {data.msg.length}/500
                            </small>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => avancarStatus()}>
                                Avançar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
