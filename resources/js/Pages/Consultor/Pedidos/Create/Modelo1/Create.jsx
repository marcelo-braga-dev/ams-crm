import Layout from "@/Layouts/Layout";
import Form from "./Partials/Form";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Typography} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import {FileRuled, PersonCircle} from "react-bootstrap-icons";
import CardTitle from "@/Components/Cards/CardTitle.jsx";

export default function Create({fornecedores, lead, endereco}) {

    return (
        <Layout empty menu="pedidos" container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <CardContainer>
                <CardTitle title="Integrador" icon={<PersonCircle size={22} color="black"/>}/>
                <CardBody>
                    <Typography fontWeight="bold">{`${lead.nome} (#${lead.id})`}</Typography>
                </CardBody>
            </CardContainer>

            <Form url="consultor.pedidos.store" fornecedores={fornecedores} lead={lead}/>
        </Layout>
    )
}









