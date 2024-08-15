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
import InputsDadosLead from "@/Partials/Leads/InputsDados";

export default function Create() {
    maskJquery()
    const {data, setData, post} = useForm({
        pessoa: 'Jurídica'
    });

    function onSubmit(e) {
        e.preventDefault()
        post(route('consultor.leads.main.store'), {preserveScroll: true})
    }

    return (
        <Layout container titlePage="Cadastro de Leads" menu="leads" submenu="leads-cadastrar">
            <CardContainer>
                <CardTitle title="Dados do Lead" icon={<Person size={22}/>}/>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <InputsDadosLead data={data} setData={setData}/>

                        <div className="">
                            <div className="text-center">
                                <button className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
