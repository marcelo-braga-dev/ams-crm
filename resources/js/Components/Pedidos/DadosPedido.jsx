import Typography from "@mui/material/Typography";
import {usePage} from "@inertiajs/react";
import {CardChecklist} from "react-bootstrap-icons";
import {Grid, Stack} from "@mui/material";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";

const li = {listStyle: 'none', marginBottom: '.5rem'}
const text = {color: "rgb(59, 64, 86)", fontSize: 15}
const textBold = {marginRight: 10, fontWeight: 500}

export default function DadosPedido({dados}) {

    const isAdmin = usePage().props.auth.user.is_financeiro == 1

    return (<>
            <CardTitleDefault title="Informações do Pedido" icon={<CardChecklist size="23"/>}/>

            <Grid container>
                <Grid item md={6}>
                    <Stack spacing={1}>
                        {dados.pedido.id &&
                            <Typography style={text}><span style={textBold}>ID do Pedido:</span> #{dados.pedido.id}</Typography>}
                        {dados.pedido.status &&
                            <Typography style={text}><span style={textBold}>Status do Pedido:</span>{dados.pedido.status}</Typography>}
                        {dados.consultor.nome &&
                            <Typography style={text}><span style={textBold}>Consultor:</span>{dados.consultor.nome}</Typography>}
                        {dados.integrador.nome &&
                            <Typography style={text}><span style={textBold}>Integrador:</span>{dados.integrador.nome} [#{dados.integrador.id}]</Typography>}
                        {dados.integrador.cnpj &&
                            <Typography style={text}><span style={textBold}>CNPJ do Integrador:</span>{dados.integrador.cnpj}</Typography>}
                        {dados.fornecedor.nome &&
                            <Typography style={text}><span style={textBold}>Fornecedor:</span>{dados.fornecedor.nome}</Typography>}
                        {dados.pedido.setor &&
                            <Typography style={text}><span style={textBold}>Setor:</span>{dados.pedido.setor}</Typography>}
                    </Stack>
                </Grid>
                <Grid item>
                    <Stack spacing={1}>
                        {dados.financeiro.preco && <Typography style={text}><span style={textBold}>Valor do Pedido:</span> R$ {dados.financeiro.preco}</Typography>}
                        {dados.frete.preco && <Typography style={text}><span style={textBold}>Frete:</span> R$ {dados.frete.preco}</Typography>}
                        {dados.financeiro.valor_nota &&
                            <Typography style={text}><span style={textBold}>Valor da Nota:</span> R$ {dados.financeiro.valor_nota}</Typography>}
                        {dados.financeiro.repasse_float > 0 && <Typography style={text}><span style={textBold}>Repasse:</span> R$ {dados.financeiro.repasse}</Typography>}
                        {isAdmin && dados.financeiro.preco_custo &&
                            <Typography style={text}><span style={textBold}>Preço Custo:</span> R$ {dados.financeiro.preco_custo}</Typography>}
                        {isAdmin && dados.financeiro.preco_custo &&
                            <Typography style={text}><span style={textBold}>Lucro:</span> R$ {dados.financeiro.lucro}</Typography>}
                        {dados.financeiro.forma_pagamento &&
                            <Typography style={text}><span style={textBold}>Forma de Pagamento:</span> {dados.financeiro.forma_pagamento}</Typography>}

                        {dados.financeiro.boletos.length > 0 &&
                            <div className="pt-2">
                                <Typography style={text}><span style={textBold}>Vencimentos dos Boletos</span></Typography>
                                {dados.financeiro.boletos.map((item, index) => {
                                    return (
                                        <Typography key={index} className="d-block">{item.indice}° Boleto: {item.data}</Typography>
                                    )
                                })}
                            </div>
                        }
                    </Stack>
                </Grid>
            </Grid>
            {dados.pedido.info && <Typography style={text}><span style={textBold}>Anotações:</span> {dados.pedido.info}</Typography>}
        </>
    )
}
