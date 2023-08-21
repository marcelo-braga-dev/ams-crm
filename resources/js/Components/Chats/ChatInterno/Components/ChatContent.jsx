import React, {useCallback, useEffect} from 'react';
import {Virtuoso} from 'react-virtuoso';
import AreaChat from "./AreaMensagens/AreaChat";
import AreaAviso from "./AreaMensagens/AreaAviso";

import {useState, useRef} from 'react'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

export default function ChatContent({mensagens, infoChatSelecionado, admin}) {
    const [idExcluirAviso, setIdExcluirAviso] = useState()
    const [progress, setProgress] = useState(false)
    const [semMensagem, setSemMensagem] = useState(false)


    const itemContent = useCallback((index, item) => {
        return infoChatSelecionado.categoria === 'chat' ?
            <AreaChat item={item} index={index} infoChatSelecionado={infoChatSelecionado}
                      setProgress={setProgress}/> :
            <AreaAviso item={item} index={index} admin={admin}
                       setIdExcluirAviso={setIdExcluirAviso} setProgress={setProgress}/>
    }, [infoChatSelecionado]);


    function excluirConversa() {
        axios.post(route('admin.chat-interno-excluir-aviso', {id: idExcluirAviso}))
    }

    useEffect(() => {
        virtuosoRef.current.scrollToIndex({index: mensagens.length - 1})
        if (mensagens.length === '0') setProgress(false)
    }, [infoChatSelecionado.id])

    useEffect(() => {
        setSemMensagem(false)
        if (mensagens.length === 0) {
            setProgress(false)
        }
        if (infoChatSelecionado.id && mensagens.length === 0) setSemMensagem(true)
    }, [mensagens])

    const virtuosoRef = useRef(null)

    return (
        <>
            {progress &&
                <div className="text-center mt-8">
                    <CircularProgress color="inherit"/>
                </div>
            }
            {semMensagem &&
                <div className="text-center mt-8">
                    NAO HÁ MENSAGENS
                </div>
            }

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
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Aviso</h5>
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
