import {useState} from 'react';
import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";

export default function Create({setores}) {
    const [qtdLeads, setQtdLeads] = useState(2);
    const [alertSetor, setAlertSetor] = useState(false);
    const {data, setData, post} = useForm();

    function onSubmit(e) {
        e.preventDefault()
        if (data.setor) {
            post(route('admin.clientes.leads.leads-main.store'))
            return;
        }
        setAlertSetor(true)
    }

    const rows = [];
    for (let i = 1; i <= qtdLeads; i++) {
        rows.push(
            <div key={i} className="bg-white shadow p-3 mb-4">
                <span className="h6">Lead {i}</span>
                <div className="row mt-3">
                    <div className="col mb-3">
                        <TextField label="Nome/Nome Fantasia:" fullWidth
                                   onBlur={e => setData('i' + i, {...data['i' + i], nome: e.target.value})}/>
                    </div>
                    <div className="col">
                        <div className="col mb-3">
                            <TextField label="Razão Social :" fullWidth
                                       onBlur={e => setData('i' + i, {
                                           ...data['i' + i],
                                           razao_social: e.target.value
                                       })}/>
                        </div>
                    </div>
                </div>
                {/*PJ*/}
                {<div className="row">
                    <div className="col mb-3">
                        <TextField label="CPF/CNPJ:" fullWidth
                                   onBlur={e => setData('i' + i, {...data['i' + i], cnpj: e.target.value})}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Inscrição Estadual:" fullWidth
                                   onBlur={e => setData('i' + i, {...data['i' + i], inscricao_estadual: e.target.value})}/>
                    </div>
                </div>}
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Atendente:" fullWidth
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       atendente: e.target.value
                                   })}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Telefone:" fullWidth
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       telefone: e.target.value
                                   })}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Email:" fullWidth
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       email: e.target.value
                                   })}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Cidade:" fullWidth
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       cidade: e.target.value
                                   })}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Estado:" fullWidth
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       estado: e.target.value
                                   })}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Informações do Cliente:" fullWidth multiline rows="2"
                                   onBlur={e => setData('i' + i, {
                                       ...data['i' + i],
                                       infos: e.target.value
                                   })}/>
                    </div>
                </div>
            </div>);
    }

    return (
        <Layout container titlePage="Cadastro de Leads" menu="leads" submenu="cadastrar">
            <div className="shadow p-3 mb-4">
                <div className="row">
                    {alertSetor && <div className="alert alert-danger mb-4 text-white">Selecione o SETOR</div>}

                    <div className="col">
                        <TextField label="Quantidade:" value={qtdLeads} type="number" size="small"
                                   onChange={e => setQtdLeads(e.target.value)}/>
                    </div>
                    <div className="col">
                        {/*Setores*/}
                        <TextField label="Setor" select required fullWidth
                                   defaultValue={data.setor}
                                   onChange={e => setData('setor', e.target.value)}>
                            {setores.map((setor, index) => {
                                return (
                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                {rows}

                <div className="">
                    <div className="text-center">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
