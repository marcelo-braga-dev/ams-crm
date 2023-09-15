import Layout from "@/Layouts/Supervisor/Layout";
import { router } from '@inertiajs/react'
import {useForm} from '@inertiajs/react';

import {TextField, Typography} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Create({dados}) {
    const {data, setData, progress} = useForm({
        file_boleto: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.pedidos.aguardando-nota.update', dados.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (<Layout titlePage="Pedido Aguardando Nota/Boleto">

        <div className="container bg-white px-lg-6 py-lg-5 mb-4">

            <div className="row">
                <div className="col">
                    <DadosPedido dados={dados}/>
                </div>
                <div className="col">
                    <DadosPedidoCliente dados={dados}/>
                </div>
            </div>
        </div>
        <div className="container bg-white px-lg-6 py-lg-5">
            <Typography variant="h6">Enviar Nota/Boleto</Typography>
            <form onSubmit={submit}>
                <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                        <TextField
                            type="file" fullWidth required
                            onChange={e => setData('file_boleto', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>

                <button className="btn btn-primary" type='submit'>
                    Salvar
                </button>
            </form>
        </div>

    </Layout>)
}
