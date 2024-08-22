import {Stack, Typography} from "@mui/material";
import Switch from "@/Components/Inputs/Switch";
import {useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Telephone, TelephoneFill} from "react-bootstrap-icons";

export default function LeadsDados({dados}) {
    const [toggleMenu, setToggleMenu] = useState(false)

    const toggleInfo = () => {
        setToggleMenu(e => !e)
    }

    return (<>
        <CardContainer>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <Stack spacing={1}>
                            {dados.cliente.razao_social && <Typography fontWeight="bold"><b>Razão Social:</b> {dados.cliente.razao_social}</Typography>}
                            {dados.cliente.nome && <Typography fontWeight="bold"><b>Nome/Nome Fantasia:</b> {dados.cliente.nome}</Typography>}
                            <Typography><b>Status:</b> {dados.infos.status_nome}</Typography>
                            {dados.cliente.cnpj && <Typography><b>CNPJ:</b> {dados.cliente.cnpj}</Typography>}
                            {dados.cliente.rg && <Typography><b>RG:</b> {dados.cliente.rg}</Typography>}
                            {dados.cliente.cpf && <Typography><b>CPF:</b> {dados.cliente.cpf}</Typography>}
                        </Stack>
                    </div>
                    <div className="col">
                        <Stack spacing={1}>
                            <Typography><b>ID:</b> #{dados.id}</Typography>
                            <Typography><b>Setor:</b> {dados?.infos?.setor?.nome}</Typography>
                            {dados.cliente.endereco && <Typography><b>Endereço:</b> {dados.cliente.endereco}</Typography>}
                            {dados.infos.anotacoes && <Typography><b>Anotações:</b> {dados.infos.anotacoes}</Typography>}
                        </Stack>
                    </div>
                </div>

                <Typography className="cursor-pointer" onClick={toggleInfo}>
                    {toggleMenu ? '-' : '+'} informações
                </Typography>

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
