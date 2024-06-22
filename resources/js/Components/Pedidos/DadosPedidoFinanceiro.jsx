import {CardChecklist} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";

export default function DadosPedidoFinanceiro({dados}) {
    return (<>
            <CardTitleDefault title="Informações Financeiras" icon={<CardChecklist size="23"/>}/>

            {dados.financeiro.preco && <span><b>Valor Total:</b> R$ {dados.financeiro.preco}</span>}
            {dados.financeiro.repasse_float > 0 && <span className="d-block"><b>Repasse:</b> R$ {dados.financeiro.repasse}</span>}
            {dados.financeiro.preco_custo &&
                <span className="d-block"><b>Preço de Custo:</b> R$ {dados.financeiro.preco_custo}</span>}
            {dados.financeiro.forma_pagamento &&
                <span className="d-block"><b>Forma de Pagamento:</b> {dados.financeiro.forma_pagamento}</span>}
            {dados.financeiro.link_pagamento &&
                <div className="mt-3">
                    <span className="d-block"><b>Link de Pagamento:</b> {dados.financeiro.link_pagamento}</span>
                </div>
            }

            {dados.financeiro.boletos.length > 0 &&
                <div className="pt-2">
                    <span><b>Vencimentos dos Boletos</b></span>
                    {dados.financeiro.boletos.map((item, index) => {
                        return (
                            <span key={index} className="d-block">{item.indice}° Boleto: {item.data}</span>
                        )
                    })}
                </div>
            }

            {dados.financeiro.cheques.length > 0 &&
                <div className="pt-2">
                    <span><b>Vencimentos dos Cheques</b></span>
                    {dados.financeiro.cheques.map((item, index) => {
                        return (
                            <span key={index} className="d-block">{item.indice}° Cheques: {item.data}</span>
                        )
                    })}
                </div>
            }
        </>
    )
}
