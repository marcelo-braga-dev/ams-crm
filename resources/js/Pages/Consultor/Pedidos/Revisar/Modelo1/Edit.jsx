import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {router} from '@inertiajs/react'

import React, {useState} from 'react';
import {useForm, usePage} from '@inertiajs/react';

import AlertDanger from "./Partials/AlertDanger";
import InfoCliente from "./Partials/InfoCliente";
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import {Alert} from "@mui/material";

export default function Edit({pedido, cliente, img, fornecedores, endereco}) {
    const {errors} = usePage().props;

    const {data, setData, progress, processing} = useForm({
        pessoa: cliente.nome ? 'Pessoa Física' : 'Jurídica',
        nome: cliente.nome,
        razao_social: cliente.razao_social,
        nascimento: cliente.data_nascimento,
        rg: cliente.rg,
        cpf: cliente.cpf,
        cnpj: cliente.cnpj,
        telefone: cliente.telefone,
        email: cliente.email,
        inscricao_estadual: cliente.inscricao_estadual,

        endereco: {
            cep: endereco.cep,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
        },

        // img_rg: img.rg,
        // img_cpf: img.cpf,
        // img_cnh: img.cnh,
        file_cartao_cnpj: img.url_cnpj,
        // file_comprovante_residencia: img.url_comprovante_residencia,

        preco: new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2})
            .format(pedido.preco_venda),
        integrador: pedido.integrador,
        fornecedor: pedido.fornecedor_id,
        file_orcamento: img.url_orcamento,
        obs: pedido.info_pedido,
        forma_pagamento: pedido.forma_pagamento,
        motivo: pedido.obs
    });
console.log(img.rg)
    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.revisar.update', pedido.id), {
            _method: 'put',
            ...data,
        })
    }

    return (
        <Layout titlePage="Revisar Pedido" voltar={route('consultor.pedidos.index')}>

            <Alert severity="warning">{pedido.obs}</Alert>

            <form onSubmit={submit}>
                    <AlertDanger errors={errors}/>
                    <InfoCliente setData={setData} data={data}/>

                    <Anexos setData={setData} data={data} img={img}/>

                    <Pedidos fornecedores={fornecedores}
                             setData={setData} data={data} img={img}/>

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
                            <button className="btn btn-primary" disabled={processing}>Atualizar</button>
                        </div>
                    </div>
            </form>
        </Layout>
    )
}

