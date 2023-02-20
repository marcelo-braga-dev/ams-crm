import Layout from "@/Layouts/Admin/Layout";
import {router} from '@inertiajs/react'
import {useForm} from '@inertiajs/react';

import {TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Create({dados}) {
    const {data, setData, progress} = useForm({
        file_nota: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-nota.update', dados.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (<Layout container voltar={route('admin.pedidos.index')} titlePage="Pedidos">
            <div className="row shadow p-2 mb-4">
                <div className="col">
                    <DadosPedido dados={dados}/>
                </div>
                <div className="col">
                    <DadosPedidoCliente dados={dados}/>
                </div>
            </div>
            <div className="row shadow p-2 mb-4">
                <h6 className="mb-4">Enviar Nota/Boleto</h6>
                <form onSubmit={submit}>
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <TextField
                                type="file" fullWidth required
                                onChange={e => setData('file_nota', e.target.files[0])}>
                            </TextField>
                        </div>
                    </div>

                    <button className="btn btn-primary" type='submit'>
                        Salvar
                    </button>
                </form>
            </div>
        </Layout>
    )
}
