import {Stack, Typography} from "@mui/material";
import Switch from "@/Components/Inputs/Switch";
import {useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Person, Telephone, TelephoneFill} from "react-bootstrap-icons";
import * as React from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Chip from "@mui/material/Chip";

export default function LeadsDados({dados}) {
    const [toggleMenu, setToggleMenu] = useState(false)

    const toggleInfo = () => {
        setToggleMenu(e => !e)
    }

    return (<>
        <CardContainer>
            <CardTitle title="Informações do Lead" icon={<Person size="22"/>}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <Stack spacing={1}>
                            {dados.cliente.razao_social && <CampoTexto titulo="Razão Social" texto={dados.cliente.razao_social}/>}
                            {dados.cliente.nome && <CampoTexto titulo="Nome/Nome Fantasia" texto={dados.cliente.nome}/>}
                            <CampoTexto titulo="Status" texto={dados.infos.status_nome}/>
                            {dados.cliente.cnpj && <CampoTexto titulo="CNPJ" texto={dados.cliente.cnpj}/>}
                            {dados.cliente.rg && <CampoTexto titulo="RG" texto={dados.cliente.rg}/>}
                            {dados.cliente.cpf && <CampoTexto titulo="CPF" texto={dados.cliente.cpf}/>}
                        </Stack>
                    </div>
                    <div className="col">
                        <Stack spacing={1}>
                            <CampoTexto titulo="ID" texto={`#${dados.id}`}/>
                            <CampoTexto titulo="Setor" texto={dados?.infos?.setor?.nome}/>
                            {dados.cliente.endereco && <CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/>}
                            {dados.infos.anotacoes && <CampoTexto titulo="Anotações" texto={dados.infos.anotacoes}/>}
                        </Stack>
                    </div>
                </div>



                {toggleMenu && <div className="row mt-4">
                    <div className="col">
                        <Stack spacing={1}>
                            {dados.contato.email && <Typography><b>Email:</b> {dados.contato.email}</Typography>}
                            {dados.contato.atendente &&
                                <Typography><b>Nome do Contato:</b> {dados.contato.atendente}</Typography>}
                            {dados.dados.capital_social &&
                                <Typography><b>Capital Social:</b> {dados.dados.capital_social}</Typography>}
                            {dados.dados.tipo && <Typography><b>Tipo:</b> {dados.dados.tipo}</Typography>}
                            {dados.dados.porte && <Typography><b>Porte:</b> {dados.dados.porte}</Typography>}
                            {dados.dados.atividade_principal &&
                                <Typography><b>Atividade Principal:</b> {dados.dados.atividade_principal}</Typography>}
                        </Stack>
                    </div>
                    <div className="col">
                        <Stack spacing={1}>
                            {dados.dados.natureza_juridica &&
                                <Typography><b>Natureza Jurídica:</b> {dados.dados.natureza_juridica}</Typography>}
                            {dados.dados.quadro_societario &&
                                <Typography><b>Quadro Societário:</b> {dados.dados.quadro_societario}</Typography>}
                            {dados.dados.data_situacao &&
                                <Typography><b>Data Situação:</b> {dados.dados.data_situacao}</Typography>}
                            {dados.dados.data_abertura &&
                                <Typography><b>Data Abertura:</b> {dados.dados.data_abertura}</Typography>}
                            {dados.infos.contato && <Typography><b>Meio de Contato:</b> {dados.infos.contato}</Typography>}
                            {dados.infos.status_anotacoes &&
                                <Typography><b>Observações:</b> {dados.infos.status_anotacoes}</Typography>}
                            <small><b>Data de Cadastro:</b> {dados.infos.data_criacao}</small>
                        </Stack>
                    </div>
                </div>}
                    <Chip className="cursor-pointer mt-4" onClick={toggleInfo} label={`${toggleMenu ? '-' : '+'} Informações`}/>

            </CardBody>
        </CardContainer>

        {/*Telefones*/}
        <CardContainer>
            <CardTitle icon={<Telephone size={18}/>} title="Telefones"/>
            <CardBody>
                <div className="row">
                    <Stack direction="row" spacing={2}>
                        {dados?.contato?.telefone && <div className="p-2 px-3 border border-radius-lg">
                            <Typography display="inline" marginBottom={1}>{dados?.contato?.telefone}</Typography>
                        </div>}
                        {dados?.contato?.telefones && dados?.contato?.telefones.map(item => dados.contato.telefone !== item &&
                            <div key={item} className="p-2 px-3 border border-radius-lg">
                                <Typography display="inline" marginBottom={1}>{item}</Typography>
                            </div>
                        )}
                    </Stack>
                </div>
            </CardBody>
        </CardContainer>
    </>)
}
