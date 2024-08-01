import {CardChecklist} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Typography} from "@mui/material";

export default function DadosPedidoFinanceiro({dados}) {
    return (<>
            <CardTitleDefault title="Informações Financeiras" icon={<CardChecklist size="23"/>}/>

            {dados.financeiro.preco && <Typography className="mb-2" fontSize={15}><b>Valor Total:</b> R$ {dados.financeiro.preco}</Typography>}
            {dados.financeiro.repasse_float > 0 && <Typography className="mb-2" fontSize={15}><b>Repasse:</b> R$ {dados.financeiro.repasse}</Typography>}
            {dados.financeiro.imposto > 0 && <Typography className="mb-2" fontSize={15}><b>Imposto Distribuidora:</b> {dados.financeiro.imposto}%</Typography>}
            {dados.financeiro.preco_custo &&
                <Typography className="mb-2" fontSize={15}><b>Preço de Custo:</b> R$ {dados.financeiro.preco_custo}</Typography>}
            {dados.financeiro.forma_pagamento &&
                <Typography className="mb-2" fontSize={15}><b>Forma de Pagamento:</b> {dados.financeiro.forma_pagamento}</Typography>}
            {dados.financeiro.link_pagamento &&
                <div className="mt-3">
                    <Typography className="mb-2" fontSize={15}><b>Link de Pagamento:</b> {dados.financeiro.link_pagamento}</Typography>
                </div>
            }

            {dados.financeiro.boletos.length > 0 &&
                <div className="pt-2">
                    <Typography className="mb-2" fontSize={15}><b>Vencimentos dos Boletos</b></Typography>
                    {dados.financeiro.boletos.map((item, index) => {
                        return (
                            <Typography key={index} className="d-block">{item.indice}° Boleto: {item.data}</Typography>
                        )
                    })}
                </div>
            }

            {dados.financeiro.cheques.length > 0 &&
                <div className="pt-2">
                    <Typography className="mb-2" fontSize={15}><b>Vencimentos dos Cheques</b></Typography>
                    {dados.financeiro.cheques.map((item, index) => {
                        return (
                            <Typography key={index} className="d-block">{item.indice}° Cheques: {item.data}</Typography>
                        )
                    })}
                </div>
            }
        </>
    )
}
