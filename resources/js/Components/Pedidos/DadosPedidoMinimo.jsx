import Typography from "@mui/material/Typography";

export default function DadosPedidoMinimo({dados}) {
    return (<>
        {dados.pedido.id && <Typography className="mb-2" fontSize={15}><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>}
        {dados.consultor.nome && <Typography className="mb-2" fontSize={15}><b>Consultor:</b> {dados.consultor.nome}</Typography>}
        {dados.integrador.nome && <Typography className="mb-2" fontSize={15}><b>Integrador:</b> {dados.integrador.nome}</Typography>}
        {dados.cliente.nome && <Typography className="mb-2" fontSize={15}><b>Nome do Cliente:</b> {dados.cliente.nome}</Typography>}
        {dados.pedido.status && <Typography className="mb-2" fontSize={15}><b>Status do Pedido:</b> {dados.pedido.status}</Typography>}
    </>)
}
