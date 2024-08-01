import Layout from "@/Layouts/Layout";
import {router} from '@inertiajs/react'
import {useForm} from '@inertiajs/react';

import {TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({dados}) {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses são de 0-11
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const {data, setData, progress} = useForm({
        file_boleto: '',
        nota_numero: '',
        nota_data: getCurrentDate()
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.aguardando-nota.update', dados.pedido.id), {
            _method: 'put', ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: dados.pedido.id})} titlePage="Pedido Aguardando Nota"
                menu="pedidos" submenu="pedidos-lista">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <DadosPedido dados={dados}/>
                        </div>
                        <div className="col">
                            <DadosPedidoCliente dados={dados}/>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <h6 className="mb-4">Enviar Nota/Boleto</h6>
                        <form onSubmit={submit}>
                            <div className="row mb-4">
                                <div className="col-md-2">
                                    <TextField label="N. Nota" fullWidth required
                                               onChange={e => setData('n_nota', e.target.value)}/>
                                </div>
                                <div className="col-md-2">
                                    <TextField type="date" label="Data da Nota" fullWidth required InputLabelProps={{shrink: true}}
                                               defaultValue={data.nota_data}
                                               onChange={e => setData('nota_data', e.target.value)}/>
                                </div>
                                <div className="col-md-4 mb-3">
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
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
