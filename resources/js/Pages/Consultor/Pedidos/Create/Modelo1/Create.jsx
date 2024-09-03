import Layout from "@/Layouts/Layout";
import Form from "./Partials/Form";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Typography} from "@mui/material";

export default function Create({fornecedores, lead, endereco}) {

    return (
        <Layout empty menu="pedidos" container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <CardContainer>
                <CardBody>
                    <Typography>LEAD: {lead.nome} (#{lead.id})</Typography>
                </CardBody>
            </CardContainer>

            <Form url="consultor.pedidos.store" fornecedores={fornecedores} lead={lead}/>
        </Layout>
    )
}









