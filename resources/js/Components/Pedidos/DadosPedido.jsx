import Typography from "@mui/material/Typography";
import {usePage} from "@inertiajs/react";
import {CardChecklist} from "react-bootstrap-icons";
import {Grid} from "@mui/material";
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
                    <ul style={{paddingLeft: 0}}>
                        <li style={li}>
                            {dados.pedido.id &&
                                <Typography style={text}><span style={textBold}>ID do Pedido:</span> #{dados.pedido.id}</Typography>}
                        </li>
                        <li style={li}>
                            {dados.pedido.status &&
                                <Typography style={text}><span style={textBold}>Status do Pedido:</span>{dados.pedido.status}</Typography>}
                        </li>
                        <li style={li}>
                            {dados.consultor.nome &&
                                <Typography style={text}><span style={textBold}>Consultor:</span>{dados.consultor.nome}</Typography>}
                        </li>
                        <li style={li}>
                            {dados.integrador.nome &&
                                <Typography style={text}><span style={textBold}>Integrador:</span>{dados.integrador.nome} [#{dados.integrador.id}]</Typography>}
                        </li>
                        <li style={li}>
                            {dados.integrador.cnpj &&
                                <Typography style={text}><span style={textBold}>CNPJ do Integrador:</span>{dados.integrador.cnpj}</Typography>}
                        </li>
                        <li style={li}>
                            {dados.fornecedor.nome &&
                                <Typography style={text}><span style={textBold}>Fornecedor:</span>{dados.fornecedor.nome}</Typography>}
                        </li>
                        <li style={li}>
                            {dados.pedido.setor &&
                                <Typography style={text}><span style={textBold}>Setor:</span>{dados.pedido.setor}</Typography>}
                        </li>
                    </ul>
                </Grid>
                <Grid item>
                    {dados.financeiro.preco && <Typography className="mb-2" fontSize={15}><b>Valor do Pedido:</b> R$ {dados.financeiro.preco}</Typography>}
                    {dados.financeiro.valor_nota && <Typography className="mb-2" fontSize={15}><b>Valor da Nota:</b> R$ {dados.financeiro.valor_nota}</Typography>}
                    {dados.financeiro.repasse_float > 0 && <Typography className="mb-2" fontSize={15}><b>Repasse:</b> R$ {dados.financeiro.repasse}</Typography>}
                    {isAdmin && dados.financeiro.preco_custo && <Typography className="mb-2" fontSize={15}><b>Preço Custo:</b> R$ {dados.financeiro.preco_custo}</Typography>}
                    {isAdmin && dados.financeiro.preco_custo && <Typography className="mb-2" fontSize={15}><b>Lucro:</b> R$ {dados.financeiro.lucro}</Typography>}
                    {dados.financeiro.forma_pagamento && <Typography className="mb-2" fontSize={15}><b>Forma de Pagamento:</b> {dados.financeiro.forma_pagamento}</Typography>}
                </Grid>
            </Grid>
            {dados.pedido.info && <Typography fontSize={15}><b>Anotações:</b> {dados.pedido.info}</Typography>}
        </>
    )
}
