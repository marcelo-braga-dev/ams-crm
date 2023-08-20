import React, {useCallback, useEffect} from 'react';
import {Virtuoso} from 'react-virtuoso';
import AreaChat from "./AreaMensagens/AreaChat";
import AreaAviso from "./AreaMensagens/AreaAviso";

import {useState, useRef} from 'react'

export default function ChatContent({mensagens, infoChatSelecionado}) {

    const itemContent = useCallback((index, item) => {
        return infoChatSelecionado.categoria === 'chat' ?
            <AreaChat item={item} index={index}/> :
            <AreaAviso item={item} index={index}/>
    }, [infoChatSelecionado]);


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
        </>
    );
}
