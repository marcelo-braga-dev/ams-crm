import Layout from "@/Layouts/Layout";
import React, {useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import {Truck} from "react-bootstrap-icons";
import CardBody from "@/Components/Cards/CardBody";
import {Typography} from "@mui/material";
import Link from "@/Components/Link";

export default function ({fornecedor}) {

    return (
        <Layout container titlePage="Produtos do Fornecedor" menu="produtos" submenu="produtos-fornecedores"
                voltar={route('admin.produtos.fornecedores.index')}>
            <CardContainer>
                <CardTitle icon={<Truck size={22}/>} title="Distribuidora"/>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <Typography>Empresa: {fornecedor.nome}</Typography>
                            <Typography>CNPJ: {fornecedor.cnpj}</Typography>
                            <Typography>Setor: {fornecedor.setor}</Typography>
                        </div>
                        <div className="col">
                            <Typography>Atendente: {fornecedor.atendente}</Typography>
                            <Typography>Telefone: {fornecedor.telefone}</Typography>
                            <Typography>E-mail: {fornecedor.email}</Typography>
                            {fornecedor.anotacoes && <Typography>Anotações: {fornecedor.anotacoes}</Typography>}
                        </div>
                        <div className="col-auto">
                            <Link label="Editar" href={route('admin.produtos.fornecedores.edit', fornecedor.id)}/>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
