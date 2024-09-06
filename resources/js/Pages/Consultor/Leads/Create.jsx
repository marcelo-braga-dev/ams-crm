import Layout from "@/Layouts/Layout";

import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import maskJquery from "@/Helpers/maskJquery";
import pesquisaCep from "@/Helpers/pesquisaCep";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {Person} from "react-bootstrap-icons";
import FormLeads from "@/Partials/Leads/FormLeads.jsx";

export default function Create() {
    maskJquery()
    const {data, setData, post} = useForm({
        pessoa: 'Jurídica',
        telefones: []
    });

    function onSubmit(e) {
        e.preventDefault()
        post(route('consultor.leads.main.store'), {preserveScroll: true})
    }

    return (
        <Layout container titlePage="Cadastro de Leads" menu="leads" submenu="leads-cadastrar">
            <form onSubmit={onSubmit}>

                <FormLeads data={data} setData={setData}/>

                <CardContainer>
                    <CardBody>
                        <div className="text-center">
                            <button className="btn btn-success">Salvar</button>
                        </div>
                    </CardBody>
                </CardContainer>
            </form>
        </Layout>
    )
}
