import ImagePdf from "@/Components/Elementos/ImagePdf";
import React from "react";

export default function SacDados({sac, pedido}) {
    return (<>
        <h5>Título: {sac.titulo}</h5>
        <div className="row">
            <div className="col">
                <span className="d-block">Autor: {sac.autor}</span>
                <span className="d-block">Stataus do SAC: {sac.status}</span>
                <span className="d-block">Data de abertura: {sac.data}</span>
            </div>
            <div className="col">
                <span className="d-block">
                    ID do Pedido: #{sac.pedido_id}
                    <a className="btn btn-link btn-sm text-dark p-0 m-0 ms-4" href={route('consultor.pedidos.show', sac.pedido_id)}>Ver Pedido</a>
                </span>
                <span className="d-block">Status do Pedido: {pedido.pedido.status}</span>
                <span className="d-block">Integrador: {pedido.integrador.nome}</span>
                <span className="d-block">Cliente: {pedido.cliente.nome}</span>
            </div>
            {sac.nota &&
                <div className="col">
                    <span className="d-block">Nota Fiscal: {sac.nota}</span>
                    <span className="d-block">Entrega Agendada: {sac.entrega_agendada ? 'SIM' : 'NÃO'}</span>
                    <span className="d-block">Material Paletizado: {sac.paletizado ? 'SIM' : 'NÃO'}</span>
                </div>
            }
        </div>
        {sac.nota &&
            <div className="row mt-4">
                <div className="col">
                    <small className="d-block text-muted">CT-e:</small>
                    <ImagePdf url={sac.img_cte}/>
                </div>
                <div className="col">
                    <small className="d-block text-muted">Imagem da Entrega:</small>
                    <ImagePdf url={sac.img_entrega}/>
                </div>
                <div className="col">
                    <small className="d-block text-muted">Imagem do Produto Danificado:</small>
                    <ImagePdf url={sac.img_produto}/>
                </div>
            </div>
        }
    </>)
}
