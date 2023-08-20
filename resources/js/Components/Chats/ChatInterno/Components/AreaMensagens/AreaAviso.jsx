import ImagePdf from "@/Components/Inputs/ImagePdf";
import styled from "styled-components";
import React from "react";

const CaixaMensagem = styled.span`
    white-space: pre-line;
    margin-bottom: 100px;
`

export default function AreaAviso({item, index}) {

    return (
        <div className="p-3">
            <div className="text-center">
                {item.periodo_data ? <span className="badge bg-light text-dark m-3 px-4">{item.periodo_data}</span> : ''}
            </div>
            <div key={index} className="card">
                <div className="card-body">
                    {item.tipo === 'msg' &&
                        <CaixaMensagem>{item.mensagem}</CaixaMensagem>
                    }
                    {item.tipo === 'file' && <span className="mb-2 d-block"><ImagePdf url={item.mensagem}/></span>}
                    <small className="d-block font-italic text-end">
                        {item.nome_usuario}
                    </small>
                    <small className="d-block font-italic text-end" style={{fontSize: 12}}>
                        {item.data}
                    </small>
                </div>
            </div>
        </div>
    )
}
