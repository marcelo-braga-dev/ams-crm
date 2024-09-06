import {CardChecklist} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Stack, Typography} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";


export default function DadosPedidoFinanceiro({dados}) {
    return (<>
            <CardTitleDefault title="Informações Financeiras" icon={<CardChecklist size="23"/>}/>

            <div className="row row-cols-3 mb-4">
                {dados.financeiro.preco && <div className="col mb-2"><CampoTexto titulo="Valor do Pedido" texto={`R$ ${dados.financeiro.preco}`}/></div>}
                {dados.financeiro.repasse_float > 0 && <div className="col mb-2">
                    <CampoTexto titulo="Repasse" texto={`R$ ${dados.financeiro.repasse} - ${dados.financeiro.repasse_desconto}% = R$ ${dados.financeiro.repasse_total}`}/>
                </div>}
                {dados.financeiro.imposto > 0 && <div className="col mb-2"><CampoTexto titulo="Imposto Distribuidora" texto={`${dados.financeiro.imposto}%`}/></div>}
                {dados.financeiro.preco_custo && <div className="col mb-2"><CampoTexto titulo="Preço de Custo" texto={`R$ ${dados.financeiro.preco_custo}`}/></div>}
                {dados.financeiro.forma_pagamento && <div className="col mb-2"><CampoTexto titulo="Forma de Pagamento" texto={dados.financeiro.forma_pagamento}/></div>}

                {dados?.financeiro?.tipo_financiamento &&
                    <div className="col mb-2"><CampoTexto titulo="Tipo da Nota" texto={dados.financeiro.tipo_financiamento.tipo_nota}/></div>}
                {dados?.financeiro?.tipo_financiamento?.banco &&
                    <div className="col mb-2"><CampoTexto titulo="Banco do Financiamento" texto={dados.financeiro.tipo_financiamento.banco}/></div>}
                {dados?.financeiro?.tipo_financiamento?.gerente_nome &&
                    <div className="col mb-2"><CampoTexto titulo="Nome do Gerente" texto={dados.financeiro.tipo_financiamento.gerente_nome}/></div>}
                {dados?.financeiro?.tipo_financiamento?.gerente_telefone &&
                    <div className="col mb-2"><CampoTexto titulo="Telefone da Gerente" texto={dados.financeiro.tipo_financiamento.gerente_telefone}/></div>}
                {dados?.financeiro?.tipo_financiamento?.gerente_email &&
                    <div className="col mb-2"><CampoTexto titulo="Email da Gerente" texto={dados.financeiro.tipo_financiamento.gerente_email}/></div>}

                {dados.financeiro.nota_numero && <div className="col mb-2"><CampoTexto titulo="N. da Nota" texto={dados.financeiro.nota_numero}/></div>}
                {dados.financeiro.link_pagamento && <div className="col mb-2"><CampoTexto titulo="Link de Pagamento" texto={dados.financeiro.link_pagamento}/></div>}
                {dados.financeiro.preco_custo && <div className="col mb-2"><CampoTexto titulo="Lucro" texto={`R$ ${dados.financeiro.lucro}`}/></div>}
                {dados.financeiro.valor_nota && <div className="col mb-2"><CampoTexto titulo="Valor da Nota" texto={`R$ ${dados.financeiro.valor_nota}`} bold/></div>}
            </div>
            <Stack spacing={1}>
                {dados.financeiro.boletos.length > 0 && <>
                    <CampoTexto titulo="Vencimentos dos Boletos"/>
                    {dados.financeiro.boletos.map((item) => (
                        <CampoTexto key={item.indice} texto={`${item.indice}° Boleto: ${item.data}`}/>
                    ))}
                </>}
                {dados.financeiro.cheques.length > 0 && <>
                    <CampoTexto titulo="Vencimentos dos Cheques"/>
                    {dados.financeiro.cheques.map((item) => (
                        <CampoTexto key={item.indice} texto={`${item.indice}° Cheques: ${item.data}`}/>
                    ))}
                </>}

                {dados.financeiro.boletos.length > 0 &&
                    <div className="pt-2">
                        <CampoTexto titulo="Vencimentos dos Boletos"/>
                        {dados.financeiro.boletos.map((item) => {
                            return <CampoTexto key={item.indice} texto={`${item.indice}° Boleto: ${item.data}`}/>
                        })}
                    </div>
                }
            </Stack>

            {/*{dados.frete.preco && <CampoTexto titulo="Frete" texto={`R$ ${dados.frete.preco}`}/>}*/}
        </>
    )
}
