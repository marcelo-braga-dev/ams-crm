import React from 'react'

export default function CardDev({dados, btn}) {

    return (
        <>
            <div className="row bg-white shadow p-1 m-1" style={{minWidth: 200}}>

                <small className="text-muted d-block">Título:</small>
                <span className="d-block mb-3 font-weight-bold">
                    {dados.titulo}
                </span>

                <small className="text-muted d-block">Descrição:</small>
                <small className="d-block mb-3">
                    {dados.descricao}
                </small>

                <small className="text-muted d-block">Prazo:</small>
                <span className="d-block mb-3">
                    {dados.prazo}
                </span>
                <div className="col-12 text-center">
                    {btn && <a href={btn} className="btn btn-primary btn-sm">Ver</a> }
                </div>

            </div>
        </>
    )
}
