import React, {useCallback, useEffect} from 'react';
import {Virtuoso} from 'react-virtuoso';
import AreaChat from "./AreaMensagens/AreaChat";
import AreaAviso from "./AreaMensagens/AreaAviso";

export default function ChatContent({mensagens, infoChatSelecionado}) {

    const itemContent = useCallback((index, item) => {
        return infoChatSelecionado.categoria === 'chat' ?
            <AreaChat item={item} index={index}/> :
            <AreaAviso item={item} index={index}/>
    }, [infoChatSelecionado]);

    return (
        <div style={{
            display: 'flex',
            flexFlow: 'column',
            height: '100%'
        }}>
            <Virtuoso
                itemContent={itemContent}
                data={mensagens}
                followOutput="auto"
                // style={{flex: '1 1 auto'}}
            />
            <div></div>
        </div>
    );
}
