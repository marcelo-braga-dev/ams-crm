import Layout from "@/Layouts/Layout.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {MenuItem, Stack, TextField, Typography} from "@mui/material";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import React, {useState} from "react";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {router} from "@inertiajs/react";
import {Eye} from "react-bootstrap-icons";
import Link from "@/Components/Link.jsx";

const Page = ({registros, mes, ano, setores, usuarios, usuario}) => {
    const [setorSelecionado, setSetorSelecionado] = useState(1);
    const [mesesSelecionado, setMesesSelecionado] = useState(mes);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [usuarioSelecionado, setusuarioSelecionado] = useState(usuario);

    const statusNomes = ['atendimento', 'ativo', 'finalizado']

    const getStatusData = (leadStatuses, status) => {
        const statusData = leadStatuses.find(s => s.status === status);
        return statusData ? <td><Typography>{statusData.status_data}</Typography></td> : <td className="text-center">-</td>;
    };

    const filtrar = () => {
        router.get(route('admin.dashboard.relatorios-leads.index'),
            {id: usuarioSelecionado, mes: mesesSelecionado, ano: anoSelecionado})
    }

    const statusTotais = statusNomes.reduce((acc, status) => {
        acc[status] = 0;
        return acc;
    }, {});

    registros.forEach(lead => {
        lead.status.forEach(({status}) => {
            if (statusTotais[status] !== undefined) {
                statusTotais[status]++;
            }
        });
    });

    return (
        <Layout titlePage="Relatorio dos Leads" menu="dashboard" submenu="dashboard-leads"
                voltar={route('admin.dashboard.leads.index')}>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-3">
                            <TextField label="Consultor" select fullWidth defaultValue={usuarioSelecionado}
                                       onChange={e => setusuarioSelecionado(e.target.value)}>
                                {usuarios.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-4">
                            <Stack direction="row">
                                <SelectMesesMultiples label="Mês Referência" value={mesesSelecionado} useState={setMesesSelecionado}/>
                                <TextField label="Ano" select fullWidth defaultValue={anoSelecionado} style={{width: '10rem'}}
                                           onChange={e => setAnoSelecionado(e.target.value)}>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                    <MenuItem value="2025">2025</MenuItem>
                                </TextField>
                            </Stack>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={filtrar}>Filtrar</button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <Typography>Atendiemnto: {statusTotais.atendimento}</Typography>
                        </div>
                        <div className="col">
                            <Typography>Ativo: {statusTotais.ativo}</Typography>
                        </div>
                        <div className="col">
                            <Typography>Finalizado: {statusTotais.finalizado}</Typography>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTable>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>LEAD</th>
                            <th>ATENDIMENTO</th>
                            <th>ATIVO</th>
                            <th>FINALIZADO</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {registros.map(item => (
                            <tr>
                                <td><Typography>#{item.lead_id}</Typography></td>
                                <td>
                                    <Typography>{item.lead_razao_social}</Typography>
                                </td>
                                {statusNomes.map(valor => {
                                    return getStatusData(item.status, valor)
                                })}
                                <td>
                                    <Link href={route('admin.clientes.leads.leads-main.show', item.lead_id)} icon={<Eye size={22}/>}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    )
}

export default Page
