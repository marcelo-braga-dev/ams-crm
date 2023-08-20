import React, {useCallback, useEffect} from 'react';
import {Virtuoso} from 'react-virtuoso';
import AreaChat from "./AreaMensagens/AreaChat";
import AreaAviso from "./AreaMensagens/AreaAviso";

import {useState, useRef} from 'react'
import axios from "axios";

export default function ChatContent({mensagens, infoChatSelecionado, admin}) {
    const [idExcluirAviso, setIdExcluirAviso] = useState()

    const itemContent = useCallback((index, item) => {
        return infoChatSelecionado.categoria === 'chat' ?
            <AreaChat item={item} index={index}/> :
            <AreaAviso item={item} index={index} admin={admin} setIdExcluirAviso={setIdExcluirAviso}/>
    }, [infoChatSelecionado]);


    function excluirConversa() {
        axios.post(route('admin.chat-interno-excluir-aviso', {id: idExcluirAviso}))
    }

    useEffect(() => {
        virtuosoRef.current.scrollToIndex({index: mensagens.length - 1})
    }, [infoChatSelecionado.id])

    const virtuosoRef = useRef(null)

    return (
        <>
            <Virtuoso
                itemContent={itemContent}
                data={mensagens}
                followOutput="auto"
                ref={virtuosoRef}
            />

            <div className="modal fade" id="excluirAviso" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Excluir mensagem?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirConversa()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
