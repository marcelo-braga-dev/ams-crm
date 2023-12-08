import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import {useForm, usePage} from '@inertiajs/react';

import InfoCliente from './Partials/InfoCliente';
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";

export default function Create({fornecedores, lead, endereco}) {

    const {data, setData, post, progress, processing} = useForm({
        documentos_check: 'cnh',
        integrador: lead.id,

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
        preco: null,
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

    function submit(e) {
        e.preventDefault()
        post(route('consultor.pedidos.store'))
    }

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <div className="border-bottom mb-4">
                <h5>LEAD: {lead.nome} (#{lead.id})</h5>
            </div>

            <form onSubmit={submit}>
                <div className="row mb-5 pb-4 border-bottom">
                    <InfoCliente setData={setData} data={data} />
                </div>
                <div className="row mb-5 border-bottom">
                    <Anexos setData={setData} data={data}></Anexos>
                </div>

                <Pedidos fornecedores={fornecedores} setData={setData} data={data}/>

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
                        <button className="btn btn-primary" disabled={processing}>Cadastrar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}









