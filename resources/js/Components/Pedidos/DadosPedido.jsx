import Typography from "@mui/material/Typography";
import {usePage} from "@inertiajs/react";

export default function DadosPedido({dados}) {
    const funcaoUsuario = usePage().props.auth.user.tipo

    return (<>
        <Typography variant="subtitle1" className="mb-2">Informações do Pedido</Typography>
        {dados.pedido.id && <Typography><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>}
        {dados.pedido.status && <Typography><b>Status do Pedido:</b> {dados.pedido.status}</Typography>}
        {dados.consultor.nome && <Typography><b>Consultor:</b> {dados.consultor.nome}</Typography>}
        {dados.integrador.nome && <Typography><b>Integrador:</b> {dados.integrador.nome} [#{dados.integrador.id}]</Typography>}
        {dados.integrador.cnpj && <Typography><b>CNPJ do Integrador:</b> {dados.integrador.cnpj}</Typography>}
        {dados.fornecedor.nome && <Typography><b>Fornecedor:</b> {dados.fornecedor.nome}</Typography>}
        {dados.pedido.setor && <Typography><b>Setor:</b> {dados.pedido.setor}</Typography>}
        <div className="row mt-3">
            {dados.financeiro.preco && <span><b>Valor Total:</b> R$ {dados.financeiro.preco}</span>}
            {dados.financeiro.repasse_float > 0 && <span className="d-block"><b>Repasse:</b> R$ {dados.financeiro.repasse}</span>}
            {funcaoUsuario === 'admin' && dados.financeiro.preco_custo && <span className="d-block"><b>Preço Custo:</b> R$ {dados.financeiro.preco_custo}</span>}
            {dados.financeiro.forma_pagamento &&
                <span className="d-block"><b>Forma de Pagamento:</b> {dados.financeiro.forma_pagamento}</span>}
        </div>

        {dados.pedido.info && <Typography className="mt-3"><b>Anotações:</b> {dados.pedido.info}</Typography>}
    </>)
}
