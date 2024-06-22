import React from "react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function ({dados}) {
    return (<>
        <div className="row">
            <div className="col">
                <h5 className="d-block">{dados.nome}</h5>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <span className="d-block"><b>ID:</b> #{dados.id}</span>
                <span className="d-block"><b>Unidade:</b> {dados.unidade}</span>
                <span className="d-block"><b>Categoria:</b> {dados.categoria_nome}</span>
                <span className="d-block"><b>Fornecedor:</b> {dados.fornecedor}</span>

            </div>
            <div className="col">
                <span className="d-block"><b>Preço de Venda:</b> R$ {convertFloatToMoney(dados.preco)}</span>
                {!!dados.preco_custo && <span className="d-block"><b>Preço do Forn.:</b> R$ {convertFloatToMoney(dados.preco_custo)}</span>}
                <span className="d-block"><b>Estoque:</b> {dados.estoque} und.</span>
            </div>
        </div>
    </>)
}
