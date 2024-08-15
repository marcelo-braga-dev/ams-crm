import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {router} from '@inertiajs/react'
import {useForm} from '@inertiajs/react';

import {TextField, Typography} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Create({dados}) {
    const {data, setData} = useForm();

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.retroceder.update', dados.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (
        <Layout titlePage="Retroceder Pedido" container voltar={route('admin.pedidos.index', {id_card:  dados.pedido.id})}
                menu="pedidos" submenu="pedidos-lista">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col">
                        <DadosPedido dados={dados}/>
                    </div>
                    <div className="col">
                        <DadosPedidoCliente dados={dados}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <TextField
                            label="Motivo:" type="file" multiline rows={4} fullWidth required
                            onChange={e => setData('motivo', e.target.value)}>
                        </TextField>
                    </div>
                </div>

                <button className="btn btn-primary" type='submit'>
                    Salvar
                </button>
            </form>
        </Layout>
    )
}
