import Typography from "@mui/material/Typography";
import {Person} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Stack} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";

export default function DadosPedidoCliente({dados}) {
    return (<>
        <CardTitleDefault title="Informações do Cliente" icon={<Person size={22}/>}/>
        <Stack spacing={1}>
            {dados.cliente.nome && <CampoTexto titulo="Cliente" texto={dados.cliente.nome}/>}
            {dados.cliente.telefone && <CampoTexto titulo="Telefone" texto={dados.cliente.telefone}/>}
            {dados.cliente.nascimento && <CampoTexto titulo="Data Nascimento" texto={dados.cliente.nascimento}/>}
            {dados.cliente.rg && <CampoTexto titulo="RG" texto={dados.cliente.rg}/>}
            {dados.cliente.cpf && <CampoTexto titulo="CPF" texto={dados.cliente.cpf}/>}
            {dados.cliente.cnpj && <CampoTexto titulo="CNPJ" texto={dados.cliente.cnpj}/>}
            {dados.cliente.inscricao_estadual && <CampoTexto titulo="IE" texto={dados.cliente.inscricao_estadual}/>}
            {dados.cliente.email && <CampoTexto titulo="Email" texto={dados.cliente.email}/>}
            {dados.cliente.endereco && <CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/>}
        </Stack>

    </>)
}
