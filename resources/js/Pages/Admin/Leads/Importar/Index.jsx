import Layout from "@/Layouts/Layout";
import TextField from "@mui/material/TextField";
import {router, useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {CircularProgress, Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {Eye} from "react-bootstrap-icons";
import Link from "@/Components/Link.jsx";

export default function ({setores, modelo, historicos}) {
    const {data, setData} = useForm()
    const [pregress, setPregress] = useState(false);

    function submit(e) {
        e.preventDefault()
        setPregress(true)
        router.post(route('admin.clientes.leads.importar.store'), {...data})
    }

    router.on('success', () => setPregress(false))

    return (
        <Layout titlePage="Importar Planilhas de Leads" menu="leads" submenu="leads-importar">

            <div className="row">
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Importar Planilhas de Leads">
                            <a href={modelo} className="btn btn-primary btn-sm mb-0">Baixar Modelo</a>
                        </CardTitle>
                        <CardBody>
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-4 mb-4">
                                        <span className="d-block">Setor</span>
                                        <TextField select label="" fullWidth defaultValue="" required
                                                   onChange={e => setData('setor', e.target.value)}>
                                            {setores.map((setor, index) => {
                                                return (
                                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    </div>
                                    <div className="col mb-4">
                                        <span className="d-block">Arquivo de Importação (.csv)</span>
                                        <TextField type="file" required inputProps={{accept: '.csv'}} fullWidth
                                                   onChange={e => setData('arquivo', e.target.files[0])}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <button className="btn btn-primary">Enviar</button>

                                    </div>
                                    <div className="col">
                                        {pregress && <CircularProgress/>}
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Histórico de Importação"/>
                        <div  style={{height: '50vh', overflow: "auto"}}>
                        <div className="table-responsive">
                            <table className="table-1 table-sm">
                                <thead>
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th>Importação</th>
                                    <th className="text-center">Novos</th>
                                    <th className="text-center">Enriquecidos</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {historicos.map((dado, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">#{dado.id}</td>
                                            <td>
                                                <Typography variant="body1" fontWeight="bold">{dado.nome}</Typography>
                                                <Typography variant="body2">{dado.setor}</Typography>
                                                <Typography variant="body2">{dado.data}</Typography>
                                            </td>
                                            <td className="text-center">
                                                <Typography variant="body1">{dado.qtd}</Typography>
                                            </td>
                                            <td className="text-center">
                                                <Typography variant="body1">{dado.enriquecidas}</Typography></td>
                                            <td>
                                                <Link href={route('admin.clientes.leads.importar-historico.show', dado.id)} icon={<Eye size="22"/>}/>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </CardContainer>
                </div>
            </div>
        </Layout>
    )
}
