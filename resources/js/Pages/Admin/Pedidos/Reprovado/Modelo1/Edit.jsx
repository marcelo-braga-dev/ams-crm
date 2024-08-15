import Layout from "@/Layouts/Layout";
import {router} from '@inertiajs/react'

import React, {useState} from 'react';
import {useForm, usePage} from '@inertiajs/react';

import AlertDanger from "./Partials/AlertDanger";
import InfoCliente from "./Partials/InfoCliente";
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import {Alert} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

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
        file_cartao_cnpj: img.url_cnpj,

        preco: new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2})
            .format(pedido.preco_venda),
        integrador: pedido.integrador,
        fornecedor: pedido.fornecedor_id,
        file_orcamento: img.url_orcamento,
        obs: pedido.info_pedido,
        forma_pagamento: pedido.forma_pagamento,
        motivo: pedido.obs
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.reprovado.update', pedido.id), {
            _method: 'put',
            ...data,
        })
    }

    return (
        <Layout titlePage="Revisar Pedido" menu="pedidos" submenu="pedidos-lista"
                voltar={route('admin.pedidos.index', {id_card: pedido.id})}>

            <Alert className="mb-4" severity="warning">{pedido.obs}</Alert>

            <form onSubmit={submit}>
                <AlertDanger errors={errors}/>
                <CardContainer>
                    <CardBody>
                        <InfoCliente setData={setData} data={data}/>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <Anexos setData={setData} data={data} img={img}/>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <Pedidos fornecedores={fornecedores} setData={setData} data={data} img={img}/>
                    </CardBody>
                </CardContainer>

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

