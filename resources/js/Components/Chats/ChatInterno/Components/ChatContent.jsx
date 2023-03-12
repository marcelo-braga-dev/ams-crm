import React, {useCallback, useState} from 'react';
import {Virtuoso} from 'react-virtuoso';
import {Box, Card, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ImagePdf from "@/Components/Inputs/ImagePdf";


const CardWrapperPrimary = styled(Card)(
    ({theme}) => `
      background: rgb(0, 0, 0);
      color: white;
      padding: 10px;
      border-radius: 15px;
      border-top-right-radius: 5px;
      max-width: 380px;
      display: inline-flex;`
);

const CardWrapperSecondary = styled(Card)(
    ({theme}) => `
      background: rgba(34, 51, 84, 0.1);
      color: black;
      padding:  10px;
      border-radius: 15px;
      border-top-left-radius: 5px;
      max-width: 380px;
      display: inline-flex;
`
);

export default function ChatContent({mensagens}) {
    const itemContent = useCallback(
        (index, item) => (
            <div className="p-3">
                {item.is_resposta ?
                    <Box
                        key={index}
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                width: 50,
                                height: 50
                            }}
                            alt={item.nome_usuario}
                            // src={user.avatar}
                        />
                        <Box
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            justifyContent="flex-start"
                            ml={2}
                        >
                            <CardWrapperSecondary>
                                {item.tipo === 'msg' && <span className="mb-2 d-block">
                                            {item.mensagem}
                                        </span>}
                                {item.tipo === 'file' && <span className="mb-2 d-block">
                                            <ImagePdf url={item.mensagem}/>
                                        </span>}
                            </CardWrapperSecondary>
                            <small className="font-italic pt-1" style={{fontSize: 12}}>
                                <DoneAllIcon color={item.status === 'lido' ? 'info' : 'disabled'}
                                             style={{fontSize: 14}}/>
                                {item.data}
                            </small>
                        </Box>
                    </Box> :
                    <Box
                        key={index}
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-end"
                        py={1}
                    >
                        <Box id="mensagens"
                             display="flex"
                             alignItems="flex-end"
                             flexDirection="column"
                             justifyContent="flex-end"
                             mr={2}
                        >
                            <CardWrapperPrimary>
                                {item.tipo === 'msg' && <span className="mb-2 d-block">
                                            {item.mensagem}
                                        </span>}
                                {item.tipo === 'file' && <span className="mb-2 d-block">
                                            <ImagePdf url={item.mensagem}/>
                                        </span>}
                            </CardWrapperPrimary>
                            <small className="font-italic pt-1" style={{fontSize: 12}}>
                                <DoneAllIcon color={item.status === 'lido' ? 'info' : 'disabled'}
                                             style={{fontSize: 14}}/>
                                {item.data}
                            </small>
                        </Box>
                        <Avatar
                            variant="rounded"
                            sx={{
                                width: 50,
                                height: 50
                            }}
                            alt={item.nome_destinatario}
                            // src={user.avatar}
                        />
                    </Box>}
            </div>
        ),
        []
    );

    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                height: '100%',
            }}
        >
            <Virtuoso
                itemContent={itemContent}
                data={mensagens}
                followOutput="auto"
                style={{flex: '1 1 auto'}}
            />
        </div>
    );
}
