import React from 'react'

export default function CardDev({dados, btn}) {

    return (
        <div className="row bg-white shadow p-1 m-1" style={{width: 300}}>
            <div className="col-12">
                <span className="d-block mt-2 font-weight-bold">
                    {dados.titulo}
                </span>
                <small className="d-block mb-3">
                    {dados.descricao}
                </small>

                <div className="row row-cols-2">
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Prioridade:</b><br/>
                            {dados.prioridade === 'urgente' ?
                                <span className="badge rounded-pill bg-danger">Urgente</span> :
                                "Normal"}
                        </small>
                    </div>
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Setor:</b><br/>
                            {dados.setor}
                        </small>
                    </div>
                </div>

                <div className="row row-cols-2">
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Área:</b><br/>
                            {dados.area}
                        </small>
                    </div>
                    {dados.sequencia && <div className="col">
                        <small className="d-block mb-3">
                            <b>Sequência:</b><br/>
                            <span className="badge rounded-pill bg-primary text-dark text-white">
                                {dados.sequencia}
                            </span>
                        </small>
                    </div>}
                </div>

                <div className="row row-cols-2">
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Valor Inicial:</b><br/>
                            R$ {dados.valor_inicial}
                        </small>
                    </div>
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Valor Final:</b><br/>
                            R$ {dados.valor_final}
                        </small>
                    </div>
                </div>

                <div className="row row-cols-2">
                    {dados.valor_inicial !== '0,00' && <div className="col">
                        <small className="d-block mb-3">
                            <b>Pagamento:</b><br/>{dados.status_pagamento}
                        </small>
                    </div>}
                </div>

                <div className="row row-cols-2">
                    <div className="col">
                        <small className="d-block mb-3">
                            <b>Prazo Inicial:</b><br/>{dados.prazo_inicial}
                        </small>
                    </div>
                    {dados.prazo_final &&
                        <div className="col">
                            <small className="d-block mb-3">
                                <b>Prazo Final:</b><br/>{dados.prazo_final}
                            </small>
                        </div>}
                </div>
            </div>
            <div className="col-12 text-center">
                {btn && <a href={btn} className="btn btn-primary btn-sm">Ver</a>}
            </div>
        </div>
    )
}
