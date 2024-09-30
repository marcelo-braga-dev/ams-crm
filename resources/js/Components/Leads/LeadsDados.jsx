import {Stack, Typography} from "@mui/material";
import Switch from "@/Components/Inputs/Switch";
import {useMemo, useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Chat, Dash, Envelope, Person, Plus, Telephone, TelephoneFill, Whatsapp} from "react-bootstrap-icons";
import * as React from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Chip from "@mui/material/Chip";

export default function LeadsDados({dados, acoes}) {
    const [toggleMenu, setToggleMenu] = useState(false)

    const toggleInfo = () => {
        setToggleMenu(e => !e)
    }

    const telefones = useMemo(() => {
        return dados?.contato?.telefones.length > 0 && dados?.contato?.telefones.map(({id, telefone}) => (
            <div key={id} className="col p-2 m-2 mt-1 px-3 border border-radius-lg">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Whatsapp size={18} color="green"/>
                    <Telephone size={18} color="blue"/>
                    <Typography display="inline" marginBottom={1}>{telefone}</Typography>
                </Stack>
            </div>
        ))
    }, [dados]);

    return (<>
        <CardContainer>
            <CardTitle title="Informações do Lead" icon={<Person size="22"/>} children={acoes}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <Stack spacing={0.5}>
                            {dados.cliente.razao_social && <CampoTexto titulo="Razão Social" texto={dados.cliente.razao_social}/>}
                            {dados.cliente.nome && <CampoTexto titulo="Nome/Nome Fantasia" texto={dados.cliente.nome}/>}
                            {dados.cliente.cnpj && <CampoTexto titulo="CNPJ" texto={dados.cliente.cnpj}/>}
                            {dados.cliente.rg && <CampoTexto titulo="RG" texto={dados.cliente.rg}/>}
                            {dados.cliente.cpf && <CampoTexto titulo="CPF" texto={dados.cliente.cpf}/>}
                            {dados.cliente.inscricao_estadual && <CampoTexto titulo="Inscrição Estadual" texto={dados.cliente.inscricao_estadual}/>}
                            {dados.infos.situacao && <CampoTexto titulo="Situaçao" texto={dados.infos.situacao}/>}
                        </Stack>
                    </div>
                    <div className="col">
                        <Stack spacing={0.5}>
                            <CampoTexto titulo="ID" texto={`#${dados.id}`}/>
                            <CampoTexto titulo="Status" texto={dados.infos.status_nome}/>
                            <CampoTexto titulo="Setor" texto={dados?.infos?.setor?.nome}/>
                            {dados.cliente.endereco && <CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/>}
                            {dados.infos.anotacoes && <CampoTexto titulo="Anotações" texto={dados.infos.anotacoes}/>}
                        </Stack>
                    </div>
                </div>

                {toggleMenu && <div className="row mt-1">
                    <div className="col">
                        <Stack spacing={0.5}>
                            {dados.contato.atendente && <CampoTexto titulo="Nome do Contato" texto={dados.contato.atendente}/>}
                            {dados.dados.capital_social && <CampoTexto titulo="Capital Social" texto={dados.dados.capital_social}/>}
                            {dados.dados.tipo && <CampoTexto titulo="Tipo" texto={dados.dados.tipo}/>}
                            {dados.dados.porte && <CampoTexto titulo="Porte" texto={dados.dados.porte}/>}
                            {dados.dados.atividade_principal && <CampoTexto titulo="Atividade Principal" texto={dados.dados.atividade_principal}/>}
                        </Stack>
                    </div>
                    <div className="col">
                        <Stack spacing={0.5}>
                            {dados.dados.natureza_juridica && <CampoTexto titulo="Natureza Jurídica" texto={dados.dados.natureza_juridica}/>}
                            {dados.dados.quadro_societario && <CampoTexto titulo="Quadro Societário" texto={dados.dados.quadro_societario}/>}
                            {dados.dados.data_situacao && <CampoTexto titulo="Data Situação" texto={dados.dados.data_situacao}/>}
                            {dados.dados.data_abertura && <CampoTexto titulo="Data Abertura" texto={dados.dados.data_abertura}/>}
                            {dados.infos.status_anotacoes && <CampoTexto titulo="Observações" texto={dados.infos.status_anotacoes}/>}
                            {dados.infos.data_criacao && <CampoTexto titulo="Data de Cadastro" texto={dados.infos.data_criacao}/>}
                        </Stack>
                    </div>
                </div>}

                <Chip className="cursor-pointer mt-4" onClick={toggleInfo} label={<>{toggleMenu ? <Dash/> : <Plus size={15}/>} Informações</>}/>

            </CardBody>
        </CardContainer>

        {/*Telefones*/}
        <CardContainer>
            <CardTitle icon={<Chat size={20}/>} title="Contatos"/>
            <CardBody>
                <div className="row row-cols-auto">
                    {telefones}

                    {dados?.contato?.email && <div className="col p-2 m-2 mt-1 px-3 border border-radius-lg">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Envelope size={20} color="orange"/>
                            <Typography display="inline" marginBottom={1}>{dados.contato.email}</Typography>
                        </Stack>
                    </div>}
                </div>
            </CardBody>
        </CardContainer>

        {dados?.consultor?.nome && <CardContainer>
            <CardBody>
                <Stack direction="row" spacing={2}>
                    <Typography fontWeight="bold">Vendedor(a):</Typography>
                    <Typography>{dados?.consultor?.nome}</Typography>
                </Stack>
            </CardBody>
        </CardContainer>}
    </>)
}
