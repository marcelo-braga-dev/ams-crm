import Typography from "@mui/material/Typography";
import {Person} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Stack} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";

export default function DadosPedidoCliente({dados}) {
    return (<>
        <CardTitleDefault title="Informações do Cliente" icon={<Person size={22}/>}/>
        {dados.cliente.nome && <div className="mb-2"><CampoTexto titulo="Cliente" texto={dados.cliente.nome}/></div>}
        <div className="row row-cols-3">
            {dados.cliente.cpf && <div className="col mb-2"><CampoTexto titulo="CPF" texto={dados.cliente.cpf}/></div>}
            {dados.cliente.rg && <div className="col mb-2"><CampoTexto titulo="RG" texto={dados.cliente.rg}/></div>}
            {dados.cliente.cnpj && <div className="col mb-2"><CampoTexto titulo="CNPJ" texto={dados.cliente.cnpj}/></div>}
            {dados.cliente.inscricao_estadual && <div className="col mb-2"><CampoTexto titulo="IE" texto={dados.cliente.inscricao_estadual}/></div>}
            {dados.cliente.nascimento && <div className="col mb-2"><CampoTexto titulo="Data Nascimento" texto={dados.cliente.nascimento}/></div>}
            {dados.cliente.telefone && <div className="col mb-2"><CampoTexto titulo="Telefone" texto={dados.cliente.telefone}/></div>}
            {dados.cliente.email && <div className="col mb-2"><CampoTexto titulo="Email" texto={dados.cliente.email}/></div>}
        </div>
        {dados.cliente.endereco && <div className="mb-2"><CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/></div>}
    </>)
}
