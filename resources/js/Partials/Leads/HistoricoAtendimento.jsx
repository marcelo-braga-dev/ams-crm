import * as React from "react";

export default function HistoricoAtendimento({historicos}) {
    return (
        <>
            {historicos.map((dado, index) => (
                <div className="card card-body mb-3">
                    <div key={index} className="row">
                        <div className="col">
                            <h6 className="mb-2">{historicos.length - index}. {dado.status}</h6>
                            <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                            {dado.meio_contato && <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>}
                            {dado.msg && <span className="d-block"><b>Anotações:</b> {dado.msg}</span>}
                            <span className="small">Data: {dado.data_criacao}</span>
                        </div>
                    </div>
                </div>
            ))}
            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de atendimentos.</span>
            </div>}
        </>
    )
}
