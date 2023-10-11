import Typography from "@mui/material/Typography";

export default function DadosPedido({dados}) {
    return (<>
        <Typography variant="subtitle1" className="mb-2">Informações do Pedido</Typography>
        {dados.pedido.id && <Typography><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>}
        {dados.pedido.status && <Typography><b>Status do Pedido:</b> {dados.pedido.status}</Typography>}
        {dados.consultor.nome && <Typography><b>Consultor:</b> {dados.consultor.nome}</Typography>}
        {dados.integrador.nome && <Typography><b>Integrador:</b> {dados.integrador.nome}</Typography>}
        {dados.integrador.cnpj && <Typography><b>CNPJ do Integrador:</b> {dados.integrador.cnpj}</Typography>}
        {dados.fornecedor.nome && <Typography><b>Fornecedor:</b> {dados.fornecedor.nome}</Typography>}
        {dados.pedido.setor.nome && <Typography><b>Setor:</b> {dados.pedido.setor.nome}</Typography>}
        {dados.pedido.info && <Typography className="mt-3"><b>Anotações:</b> {dados.pedido.info}</Typography>}
    </>)
}
