import {useState} from 'react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import maskJquery from "@/Helpers/maskJquery";
import pesquisaCep from "@/Helpers/pesquisaCep";
import InputsDadosLead from "@/Partials/Leads/InputsDados";

export default function Create({setores}) {
    const [alertSetor, setAlertSetor] = useState(false);

    const {setData, data} = useForm({
        pessoa: 'Jurídica',
    });

    maskJquery()

    function onSubmit(e) {
        e.preventDefault()
        if (data.setor) {
            router.post(route('admin.clientes.leads.leads-main.store'), {...data})
            return;
        }
        setAlertSetor(true)
    }

    return (
        <Layout empty titlePage="Cadastro de Leads" menu="leads" submenu="leads-cadastrar">
            <div className="card card-body mb-4">
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
            </div>

            <div className="card card-body">
                <form onSubmit={onSubmit}>
                    <InputsDadosLead data={data} setData={setData}/>
                    <button className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </Layout>
    )
}
