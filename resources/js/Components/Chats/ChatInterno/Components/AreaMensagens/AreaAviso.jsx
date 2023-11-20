import ImagePdf from "@/Components/Elementos/ImagePdf";
import styled from "styled-components";
import React from "react";

const CaixaMensagem = styled.span`
    white-space: pre-line;
    margin-bottom: 100px;
`

export default function AreaAviso({item, index, admin, setIdExcluirAviso, setProgress}) {

    function excluirMensagem(id) {
        setIdExcluirAviso(id)
    }

    return (
        item.categoria === 'avisos' ?
            <div className="p-3">
                {setProgress(false)}
                <div className="text-center">
                    {item.periodo_data ?
                        <span className="badge bg-light text-dark m-3 px-4">{item.periodo_data}</span> : ''}
                </div>
                <div key={index} className="card">
                    {admin && <div className="text-end pe-4 pt-2">
                    <span onClick={() => excluirMensagem(item.id_mensagem)}
                          data-bs-toggle="modal" data-bs-target="#excluirAviso">
                        <button className="btn btn-link p-0 mb-0 text-danger"><i className="fas fa-times"></i></button>
                    </span>
                    </div>}
                    <div className="px-4 pt-3 mb-3">
                        {item.tipo === 'msg' &&
                            <CaixaMensagem>{item.mensagem}</CaixaMensagem>
                        }
                        {item.tipo === 'file' && <span className="mb-2 d-block"><ImagePdf url={item.mensagem}/></span>}
                        <div className=" text-end">
                            <small className="font-weight-bold font-italic me-3">
                                {item.nome_usuario}
                            </small>
                            <small className="font-italic text-end" style={{fontSize: 12}}>
                                {item.data}
                            </small>
                        </div>
                    </div>
                </div>
            </div> : <div className="text-white">.{setProgress(true)}</div>
    )
}
