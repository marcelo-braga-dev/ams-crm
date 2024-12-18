import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Stack, Typography} from "@mui/material";
import {TbDownload} from "react-icons/tb";
import Link from "@/Components/Link.jsx";
import {Eye} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import React from "react";

const Historico = ({historicos}) => {
    return (
        <CardContainer>
            <CardTitle title="Histórico de Importação"/>
            <div style={{height: '47vh', overflow: 'auto'}}>
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
                                        <Stack direction="row" spacing={2}>
                                            {dado.url_file && <a download href={dado.url_file}><TbDownload size="22"/></a>}
                                            <Link href={route('admin.clientes.leads.importar-historico.show', dado.id)} icon={<Eye size="22"/>}/>
                                        </Stack>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </CardContainer>
    )
}
export default Historico
