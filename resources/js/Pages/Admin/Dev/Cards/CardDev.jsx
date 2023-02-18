import React from 'react'

export default function CardDev({dados}) {

    return (
        <>
            <div className="row bg-white shadow p-1 m-1" style={{minWidth: 200}}>

                <small className="text-muted d-block">Título:</small>
                <span className="d-block mb-3">
                    {dados.titulo}
                </span>

                <small className="text-muted d-block">Descrição:</small>
                <span className="d-block mb-3">
                    {dados.descricao}
                </span>
                <small className="text-muted d-block">Prazo:</small>
                <span className="d-block mb-3">
                    {dados.prazo}
                </span>

            </div>
        </>
    )
}
