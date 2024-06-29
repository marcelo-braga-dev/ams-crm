import Typography from "@mui/material/Typography";
import {Person} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";

export default function DadosPedidoCliente({dados}) {
    return (<>
        <CardTitleDefault title="Informações do Cliente" icon={<Person size={22}/>}/>
        {dados.cliente.nome && <Typography className="mb-2" fontSize={15}><b>Cliente:</b> {dados.cliente.nome}</Typography>}
        {dados.cliente.nascimento && <Typography className="mb-2" fontSize={15}><b>Data Nascimento:</b> {dados.cliente.nascimento}</Typography>}
        {dados.cliente.rg && <Typography className="mb-2" fontSize={15}><b>RG:</b> {dados.cliente.rg}</Typography>}
        {dados.cliente.cpf && <Typography className="mb-2" fontSize={15}><b>CPF:</b> {dados.cliente.cpf}</Typography>}
        {dados.cliente.cnpj && <Typography className="mb-2" fontSize={15}><b>CNPJ:</b> {dados.cliente.cnpj}</Typography>}
        {dados.cliente.inscricao_estadual &&
            <Typography className="mb-2" fontSize={15}><b>Inscrição Estadual:</b> {dados.cliente.inscricao_estadual}</Typography>}
        {dados.cliente.telefone && <Typography className="mb-2" fontSize={15}><b>Telefone:</b> {dados.cliente.telefone}</Typography>}
        {dados.cliente.email && <Typography className="mb-2" fontSize={15}><b>Email:</b> {dados.cliente.email}</Typography>}
        {dados.cliente.endereco && <Typography className="mb-2" fontSize={15}><b>Endereço:</b> {dados.cliente.endereco}</Typography>}
    </>)
}
