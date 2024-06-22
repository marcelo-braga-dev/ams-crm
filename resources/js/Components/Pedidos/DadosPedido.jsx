import Typography from "@mui/material/Typography";
import {usePage} from "@inertiajs/react";
import {CardChecklist} from "react-bootstrap-icons";
import {Grid} from "@mui/material";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";

export default function DadosPedido({dados}) {

    const isAdmin = usePage().props.auth.user.is_financeiro == 1

    return (<>
            <CardTitleDefault title="Informações do Pedido" icon={<CardChecklist size="23"/>}/>

            <Grid container>
                <Grid item md={6}>
                    {dados.pedido.id && <Typography><b>ID do Pedido:</b> #{dados.pedido.id}</Typography>}
                    {dados.pedido.status && <Typography><b>Status do Pedido:</b> {dados.pedido.status}</Typography>}
                    {dados.consultor.nome && <Typography><b>Consultor:</b> {dados.consultor.nome}</Typography>}
                    {dados.integrador.nome && <Typography><b>Integrador:</b> {dados.integrador.nome} [#{dados.integrador.id}]</Typography>}
                    {dados.integrador.cnpj && <Typography><b>CNPJ do Integrador:</b> {dados.integrador.cnpj}</Typography>}
                    {dados.fornecedor.nome && <Typography><b>Fornecedor:</b> {dados.fornecedor.nome}</Typography>}
                    {dados.pedido.setor && <Typography><b>Setor:</b> {dados.pedido.setor}</Typography>}
                </Grid>
                <Grid item>
                    {dados.financeiro.preco && <Typography><b>Valor do Pedido:</b> R$ {dados.financeiro.preco}</Typography>}
                    {dados.financeiro.valor_nota && <Typography><b>Valor da Nota:</b> R$ {dados.financeiro.valor_nota}</Typography>}
                    {dados.financeiro.repasse_float > 0 && <Typography><b>Repasse:</b> R$ {dados.financeiro.repasse}</Typography>}
                    {isAdmin && dados.financeiro.preco_custo && <Typography><b>Preço Custo:</b> R$ {dados.financeiro.preco_custo}</Typography>}
                    {isAdmin && dados.financeiro.preco_custo && <Typography><b>Lucro:</b> R$ {dados.financeiro.lucro}</Typography>}
                    {dados.financeiro.forma_pagamento && <Typography><b>Forma de Pagamento:</b> {dados.financeiro.forma_pagamento}</Typography>}
                </Grid>
            </Grid>
            {dados.pedido.info && <Typography className="mt-3"><b>Anotações:</b> {dados.pedido.info}</Typography>}
        </>
    )
}
