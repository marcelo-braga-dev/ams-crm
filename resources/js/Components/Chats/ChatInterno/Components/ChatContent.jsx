import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import AreaChat from "./AreaMensagens/AreaChat";
import AreaAviso from "./AreaMensagens/AreaAviso";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

export default function ChatContent({mensagens, infoChatSelecionado, admin}) {
    const [idExcluirAviso, setIdExcluirAviso] = useState();
    const [progress, setProgress] = useState(false);
    const [semMensagem, setSemMensagem] = useState(false);
    const scrollRef = useRef(null);

    // Função para excluir a conversa
    const excluirConversa = async () => {
        try {
            await axios.post(route('admin.chat-interno-excluir-aviso', {id: idExcluirAviso}));
        } catch (error) {
            console.error('Erro ao excluir aviso:', error);
        }
    };

    // Função que desce o scroll para o final
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    // Configuração inicial do chat
    useEffect(() => {
        if (infoChatSelecionado.id && mensagens.length === 0) {
            setSemMensagem(true);
            setProgress(false);
        }
        scrollToBottom();
    }, [infoChatSelecionado.id, mensagens]);

    // Função para renderizar as mensagens
    const renderMessage = useCallback((item, index) => (
        infoChatSelecionado.categoria === 'chat' ? (
            <AreaChat
                key={item.id}
                item={item}
                infoChatSelecionado={infoChatSelecionado}
                setProgress={setProgress}
            />
        ) : (
            <AreaAviso
                key={item.id || index}
                item={item}
                index={index}
                admin={admin}
                setIdExcluirAviso={setIdExcluirAviso}
                setProgress={setProgress}
            />
        )
    ), [infoChatSelecionado, admin]);

    return (
        <div className="scroll-container" style={{height: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse'}}>
            <div className="scroll-content" style={{display: 'flex', flexDirection: 'column'}}>
                {progress && <div className="text-center mt-8"><CircularProgress color="inherit"/></div>}
                {semMensagem && <div className="text-center mt-8">NÃO HÁ MENSAGENS</div>}
                {/*{mensagens.map(renderMessage)}*/}

                {/*<div ref={scrollRef} />*/}
                <div>
                    {mensagens.map(renderMessage)}
                </div>
            </div>

            {/* Modal para confirmação de exclusão */}
            <div className="modal fade mt-5" id="excluirAviso" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Aviso</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Excluir mensagem?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={excluirConversa}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
