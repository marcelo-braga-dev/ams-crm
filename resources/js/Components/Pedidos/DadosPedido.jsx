import {usePage} from "@inertiajs/react";
import {CardChecklist} from "react-bootstrap-icons";
import {Grid, Stack} from "@mui/material";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import CampoTexto from "@/Components/CampoTexto.jsx";


export default function DadosPedido({dados}) {

    const isAdmin = usePage().props.auth.user.is_financeiro == 1

    return (<>
            <CardTitleDefault title="Informações do Pedido" icon={<CardChecklist size="22" color="black"/>}/>
            <Grid container>
                <Grid item md={6}>
                    <CampoTexto titulo="" texto=""/>
                    <Stack spacing={1}>
                        {dados.pedido.id && <CampoTexto titulo="ID do Pedido" texto={`#${dados.pedido.id}`}/>}
                        {dados.financeiro.preco && <CampoTexto titulo="Valor do Pedido" texto={`R$ ${dados.financeiro.preco}`}/>}
                        {dados.pedido.status && <CampoTexto titulo="Status do Pedido" texto={dados.pedido.status}/>}
                        {dados.pedido.info && <CampoTexto marginTop={2} titulo="Anotações" texto={dados.pedido.info}/>}
                    </Stack>
                </Grid>
                <Grid item md={6}>
                    <Stack spacing={1}>
                        {dados.consultor.nome && <CampoTexto titulo="Consultor" texto={dados.consultor.nome}/>}
                        {dados.integrador.nome && <CampoTexto titulo="Integrador" texto={`${dados.integrador.nome} [#${dados.integrador.id}]`}/>}
                        {dados.integrador.cnpj && <CampoTexto titulo="CNPJ do Integrador" texto={dados.integrador.cnpj}/>}
                        {dados.fornecedor.nome && <CampoTexto titulo="Fornecedor" texto={dados.fornecedor.nome}/>}
                        {dados.pedido.setor && <CampoTexto titulo="Setor" texto={dados.pedido.setor}/>}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
