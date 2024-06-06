import React from 'react'

export default function CardChamados({dados}) {

    function url() {
        switch (dados.status) {
            case 'novo':
                return route('admin.chamado.aberto.show', dados.id)
            case 'atendimento':
                return route('admin.chamado.atendimento.show', dados.id)
            case 'finalizado':
                return route('admin.chamado.finalizado.show', dados.id)
        }
    }

    return (
        <>
            <div className="row bg-white shadow p-1 py-2 m-1 mb-4 rounded">
                <div className="col-12">
                    <h6 className="d-block">{dados.titulo}</h6>
                </div>
                <div className="col-12">
                    <span>Autor: {dados.nome}</span>
                </div>
                <div className="col-12">
                    <small>ID do Pedido: #{dados.pedido_id}</small>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            <small className="">Data: {dados.data}</small>
                        </div>
                        <div className="col-auto">
                            {/*<small className="text-muted d-block">Prazo: {dados.prazo} dias</small>*/}
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            <small className="text-muted d-block">ID: #{dados.id}</small>
                        </div>
                        <div className="col-auto">
                            <a href={url()} className="btn btn-primary btn-sm p-1 px-3">Abrir</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
