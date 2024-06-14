import {useState} from 'react';
import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import maskJquery from "@/Helpers/maskJquery";
import InputsDadosLead from "@/Partials/Leads/InputsDados";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({setores}) {
    const [alertSetor, setAlertSetor] = useState(false);
    const {data, setData, post} = useForm({
        pessoa: 'Jurídica'
    });

    maskJquery()

    function onSubmit(e) {
        e.preventDefault()
        if (data.setor) {
            post(route('admin.clientes.leads.leads-main.store'))
            return;
        }
        setAlertSetor(true)
    }

    return (
        <Layout empty titlePage="Cadastro de Leads" menu="leads" submenu="leads-cadastrar">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        {alertSetor && <div className="alert alert-danger mb-4 text-white">Selecione o SETOR</div>}
                        <div className="col-4">
                            {/*Setores*/}
                            <TextField label="Setor" select required fullWidth defaultValue={data.setor}
                                       onChange={e => setData('setor', e.target.value)}>
                                {setores.map((setor, index) => <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <InputsDadosLead setData={setData} data={data}/>
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
