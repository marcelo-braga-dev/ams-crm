import ImagePdf from "@/Components/Inputs/ImagePdf";
import React, {useState} from "react";

export default function AreaAviso({item, index}) {

    return (
            <div key={index} className="card mx-3 bg-dark mb-5">
                <div className="card-body text-white">
                    {item.tipo === 'msg' && <span className="mb-2 d-block">{item.mensagem}</span>}
                    {item.tipo === 'file' && <span className="mb-2 d-block"><ImagePdf url={item.mensagem}/></span>}
                    <small className="d-block fo nt-italic text-end font-bold" >
                        {item.nome_usuario}
                    </small>
                    <small className="d-block font-italic text-end" style={{fontSize: 12}}>
                        {item.data}
                    </small>
                </div>
            </div>
    )
}
