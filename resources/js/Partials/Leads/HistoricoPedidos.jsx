import * as React from "react";

export default function HistoricoPedidos({historicos}) {
    return (
        <>
            {historicos.map(item => (
                <div className="card card-body mb-3">
                    <div className="row justify-content-between">
                        <div className="col">
                            <span className="d-block"><b>ID do Pedido:</b> #{item.id}</span>
                            <span className="d-block"><b>Status:</b> {item.status}</span>
                            <span className="d-block"><b>Valor:</b> R$ {item.valor}</span>
                            <span className="d-block"><b>Consultor(a):</b> {item.consultor}</span>
                            <span className="d-block"><b>Data do Pedido:</b> R$ {item.data_criacao}</span>
                        </div>
                        <div className="col-auto">
                            <a className="btn btn-primary btn-sm" href={route('admin.pedidos.show', item.id)}>Ver Pedido</a>
                        </div>
                    </div>
                </div>
            ))}
            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de pedidos.</span>
            </div>}
        </>
    )
}
