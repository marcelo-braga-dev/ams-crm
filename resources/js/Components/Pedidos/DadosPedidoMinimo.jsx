import Typography from "@mui/material/Typography";

export default function DadosPedidoMinimo({dados}) {
    return (<>
        {dados.pedido.id && <Typography><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>}
        {dados.consultor.nome && <Typography><b>Consultor:</b> {dados.consultor.nome}</Typography>}
        {dados.integrador.nome && <Typography><b>Integrador:</b> {dados.integrador.nome}</Typography>}
        {dados.cliente.nome && <Typography><b>Nome do Cliente:</b> {dados.cliente.nome}</Typography>}
        {dados.pedido.status && <Typography><b>Status do Pedido:</b> {dados.pedido.status}</Typography>}
    </>)
}
