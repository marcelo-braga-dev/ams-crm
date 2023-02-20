import React from 'react'
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

export default function CardChamados({dados, urlAbrir}) {
console.log(dados)
    return (
        <>
            <div className="row bg-white shadow p-1 py-2 m-1 mb-4 rounded" style={{minWidth: 200}}>
                <div className="col-12 mb-3">
                    <small className="text-muted d-block">Título:</small>
                    <h6 className="d-block">
                        {dados.titulo}
                    </h6>
                </div>
                <div className="col-12 mb-3">
                    <small className="text-muted d-block">Cliente:</small>
                    <span className="d-block">{dados.cliente}</span>
                </div>
                <div className="col-12 mb-3">
                    <small className="text-muted d-block">Gerência:</small>
                    <span className="d-block">{dados.admin}</span>
                </div>
                <div className="col-12 mb-3">
                    <small className="text-muted d-block">ID do Pedido: #{dados.id_pedido}</small>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            <small className="text-muted d-block">Data:</small>
                            <span className="d-block mb-3">{dados.status_data}</span>
                        </div>
                        <div className="col-auto">
                            <small className="text-muted d-block">Prazo:</small>
                            <span className="d-block mb-3">{dados.prazo} (dias)</span>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            <small className="text-muted d-block">ID: #{dados.id}</small>
                        </div>
                        <div className="col-auto">
                            <a href={urlAbrir}
                               className="btn btn-primary btn-sm p-1 px-3">
                                <QuestionAnswerOutlinedIcon className="me-2" />
                                Abrir
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
