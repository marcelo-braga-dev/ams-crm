import Layout from '@/Layouts/Consultor/Layout';

import {useForm} from '@inertiajs/react';
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";
import InfoCliente from "./Partials/InfoCliente";
import {useState} from "react";


export default function Create({fornecedores, integradores, unidades, lead, endereco, categorias, errors}) {

    const {data, setData, post, progress, processing} = useForm({
        id_lead: lead.id,
        pessoa: lead.nome ? 'Pessoa Física' : 'Jurídica',
        nome: lead.nome,
        razao_social: lead.razao_social,
        nascimento: lead.data_nascimento,
        rg: lead.rg,
        cpf: lead.cpf,
        cnpj: lead.cnpj,
        telefone: lead.telefone,
        email: lead.email,
        inscricao_estadual: lead.inscricao_estadual,
        preco: 0,
        produtos: [],

        cidade: lead.cidade,
        estado: lead.estado,
        endereco: {
            cep: endereco.cep,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
        },
    });

    const [alerta, setAlerta] = useState(false)

    function submit(e) {
        e.preventDefault()
        if (data.preco > 0) post(route('consultor.pedidos.store'))
        else setAlerta(true)
    }

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <form onSubmit={submit}>
                <div className="">
                    <AlertDanger errors={errors}/>
                    <div className="row mb-3">
                        <div className="col">
                            <b>LEAD:</b> {lead.nome}
                        </div>
                    </div>
                    <div className="row mb-5 pb-4 border-bottom">
                        <InfoCliente setData={setData} data={data}></InfoCliente>
                    </div>
                    <Pedidos fornecedores={fornecedores} integradores={integradores} setData={setData} data={data}
                              categorias={categorias} unidades={unidades}/>

                    <div className="row text-center mb-3">
                        <div className="col">
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            {alerta && <div className="alert alert-danger text-white">
                                Selecione os Produtos do pedido.</div>}

                            <button className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}









