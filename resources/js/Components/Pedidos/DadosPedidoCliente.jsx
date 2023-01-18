import Typography from "@mui/material/Typography";
import converterDatas from "@/Helpers/converterDatas";

export default function DadosPedidoCliente({dados}) {
    return (<>
        <Typography variant="subtitle1" className="mb-2">Informações do Cliente</Typography>
        {dados.cliente.nome && <Typography><b>Cliente:</b> {dados.cliente.nome}</Typography>}
        {dados.cliente.nascimento && <Typography><b>Data Nascimento:</b> {dados.cliente.nascimento}</Typography>}
        {dados.cliente.rg && <Typography><b>RG:</b> {dados.cliente.rg}</Typography>}
        {dados.cliente.cpf && <Typography><b>CPF:</b> {dados.cliente.cpf}</Typography>}
        {dados.cliente.cnpj && <Typography><b>CNPJ:</b> {dados.cliente.cnpj}</Typography>}
        {dados.cliente.inscricao_estadual &&
            <Typography><b>Inscrição Estadual:</b> {dados.cliente.inscricao_estadual}</Typography>}
        {dados.cliente.telefone && <Typography><b>Telefone:</b> {dados.cliente.telefone}</Typography>}
        {dados.cliente.email && <Typography><b>Email:</b> {dados.cliente.email}</Typography>}
        {dados.cliente.endereco && <Typography><b>Endereço:</b> {dados.cliente.endereco}</Typography>}
    </>)
}
