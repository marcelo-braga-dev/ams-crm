import {CardChecklist} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Stack, Typography} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";


export default function DadosPedidoFinanceiro({dados}) {
    return (<>
            <CardTitleDefault title="Informações Financeiras" icon={<CardChecklist size="23"/>}/>
            <Stack spacing={1}>
                {dados.financeiro.preco && <CampoTexto titulo="Valor Total" texto={`R$ ${dados.financeiro.preco}`}/>}
                {dados.financeiro.repasse_float > 0 && <CampoTexto titulo="Repasse" texto={`R$ ${dados.financeiro.repasse}`}/>}
                {dados.financeiro.imposto > 0 && <CampoTexto titulo="Imposto Distribuidora" texto={`${dados.financeiro.imposto}%`}/>}
                {dados.financeiro.preco_custo && <CampoTexto titulo="Preço de Custo" texto={`R$ ${dados.financeiro.preco_custo}`}/>}
                {dados.financeiro.forma_pagamento && <CampoTexto titulo="Forma de Pagamento" texto={dados.financeiro.forma_pagamento}/>}
                {dados.financeiro.nota_numero && <CampoTexto titulo="N. da Nota" texto={dados.financeiro.nota_numero}/>}
                {dados.financeiro.link_pagamento && <CampoTexto titulo="Link de Pagamento" texto={dados.financeiro.link_pagamento}/>}

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
            </Stack>
        </>
    )
}
