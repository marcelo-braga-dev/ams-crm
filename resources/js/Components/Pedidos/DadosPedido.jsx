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
                        {dados.pedido.status && <CampoTexto titulo="Status do Pedido" texto={dados.pedido.status}/>}
                        {dados.consultor.nome && <CampoTexto titulo="Consultor" texto={dados.consultor.nome}/>}
                        {dados.integrador.nome && <CampoTexto titulo="Integrador" texto={`${dados.integrador.nome} [#${dados.integrador.id}]`}/>}
                        {dados.integrador.cnpj && <CampoTexto titulo="CNPJ do Integrador" texto={dados.integrador.cnpj}/>}
                        {dados.fornecedor.nome && <CampoTexto titulo="Fornecedor" texto={dados.fornecedor.nome}/>}
                        {dados.pedido.setor && <CampoTexto titulo="Setor" texto={dados.pedido.setor}/>}
                    </Stack>
                </Grid>
                <Grid item md={6}>
                    <Stack spacing={1}>
                        {dados.financeiro.preco && <CampoTexto titulo="Valor do Pedido" texto={`R$ ${dados.financeiro.preco}`}/>}
                        {dados.frete.preco && <CampoTexto titulo="Frete" texto={`R$ ${dados.frete.preco}`}/>}
                        {dados.financeiro.valor_nota && <CampoTexto titulo="Valor da Nota" texto={`R$ ${dados.financeiro.valor_nota}`}/>}
                        {dados.financeiro.nota_numero && <CampoTexto titulo="N. da Nota" texto={dados.financeiro.nota_numero}/>}
                        {dados.financeiro.repasse_float > 0 && <CampoTexto titulo="Repasse" texto={`R$ ${dados.financeiro.repasse}`}/>}
                        {isAdmin && dados.financeiro.preco_custo && <CampoTexto titulo="Preço Custo" texto={`R$ ${dados.financeiro.preco_custo}`}/>}
                        {isAdmin && dados.financeiro.preco_custo && <CampoTexto titulo="Lucro" texto={`R$ ${dados.financeiro.lucro}`}/>}
                        {dados.financeiro.forma_pagamento && <CampoTexto titulo="Forma de Pagamento" texto={dados.financeiro.forma_pagamento}/>}

                        {dados.financeiro.boletos.length > 0 &&
                            <div className="pt-2">
                                <CampoTexto titulo="Vencimentos dos Boletos"/>
                                {dados.financeiro.boletos.map((item) => {
                                    return <CampoTexto key={item.indice} texto={`${item.indice}° Boleto: ${item.data}`}/>
                                })}
                            </div>
                        }
                        {dados.pedido.info && <CampoTexto marginTop={2} titulo="Anotações" texto={dados.pedido.info}/>}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
