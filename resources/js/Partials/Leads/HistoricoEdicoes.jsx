import * as React from 'react';
import CardContainer from '@/Components/Cards/CardContainer';
import {Grid2, Stack, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {TagFill} from 'react-bootstrap-icons';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import {useEffect, useState} from "react";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CampoTexto from "@/Components/CampoTexto.jsx";

export default function HistoricoEdicoes({leadId}) {

    const [historico, setHistorico] = useState([])

    const fetch = async () => {
        const response = await axios.get(route('auth.leads.historico.api.get-histrico-edicoes', leadId))
        console.log(response.data)
        setHistorico(response.data)
    }

    useEffect(() => {
        fetch()
    }, []);

    return (
        <div style={{maxHeight: 500, overflowY: 'auto', paddingInline: 20}}>

            {historico.map((item) => (
                <CardContainer key={item.id}>
                    <CardBody>
                        <Grid2 container>
                            <Grid2 size={6}>
                                <CampoTexto titulo="Id Importação" texto={`#${item.importacao_id}`}/>
                            </Grid2>
                            <Grid2 size={6}>
                                <CampoTexto titulo="Data Importação" texto={item.criado_em}/>
                            </Grid2>
                        </Grid2>
                        <Grid2 container>
                            <Grid2 size={12}>
                                {item.nome && <CampoTexto titulo="Nome/Nome Fantasia" texto={item.nome}/>}
                                {item.cnpj && <CampoTexto titulo="CNPJ" texto={item.cnpj}/>}
                                {item.rg && <CampoTexto titulo="RG" texto={item.rg}/>}
                                {item.cpf && <CampoTexto titulo="CPF" texto={item.cpf}/>}
                                {item.inscricao_estadual && <CampoTexto titulo="IE" texto={item.inscricao_estadual}/>}
                                {item.razao_social && <CampoTexto titulo="Razão Social" texto={item.razao_social}/>}
                                {item.cnae && <CampoTexto titulo="CNAE" texto={item.cnae}/>}
                                {item.capital_social && <CampoTexto titulo="Capital Social" texto={item.capital_social}/>}
                                {item.tipo && <CampoTexto titulo="Tipo" texto={item.tipo}/>}
                                {item.porte && <CampoTexto titulo="Porte" texto={item.porte}/>}
                                {item.atividade_principal && <CampoTexto titulo="Atividade Principal" texto={item.atividade_principal}/>}
                                {item.natureza_juridica && <CampoTexto titulo="Natureza Jurídica" texto={item.natureza_juridica}/>}
                                {item.quadro_societario && <CampoTexto titulo="Quadro Societário" texto={item.quadro_societario}/>}
                                {item.situacao && <CampoTexto titulo="Situação" texto={item.situacao}/>}
                                {item.data_situacao && <CampoTexto titulo="Data Situação" texto={item.data_situacao}/>}
                                {item.data_abertura && <CampoTexto titulo="Data Abertura" texto={item.data_abertura}/>}
                            </Grid2>
                        </Grid2>
                    </CardBody>
                </CardContainer>
            ))}

            {historico?.length === 0 && <div className="row text-center">
                <Typography>Não há histórico de edições.</Typography>
            </div>}
        </div>
    );
}
