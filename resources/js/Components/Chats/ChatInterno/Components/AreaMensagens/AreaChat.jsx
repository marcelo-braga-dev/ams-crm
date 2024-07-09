import {Box, Card} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React, {useState} from "react";
import {usePage} from "@inertiajs/react";

import styled from "styled-components";

const CardWrapperSecondary = styled(Card)`
    background: rgba(34, 51, 84, 0.1);
    color: black;
    padding: 10px;
    border-radius: 3px 15px 15px 15px;
    word-break: break-word;
    white-space: pre-line;
`
const CardWrapperPrimary = styled(Card)`
    background: rgb(59, 189, 13,00.5);
    color: black;
    padding: 10px;
    border-radius: 15px 3px 15px 15px;
    word-break: break-word;
    white-space: pre-line;
`

export default function AreaChat({item, infoChatSelecionado, setProgress}) {
    const {props} = usePage()
    const fotoUsuario = props.foto_usuario;

    return (
        infoChatSelecionado.id == item.chat_destinatario ?
            <div className="p-3">
                {setProgress(false)}
                <div className="text-center">
                    {item.periodo_data ? <span className="badge bg-light text-dark m-3 px-4">{item.periodo_data}</span> : ''}
                </div>
                {item.is_resposta ?
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-start">
                        <Avatar variant="circular" sx={{width: 40, height: 40}} src={item.foto}/>
                        <Box
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            justifyContent="flex-start"
                            ml={1}
                            mr={15}
                        >
                            <CardWrapperSecondary>
                                {item.url && <span className="d-block"><ImagePdf url={item.url}/></span>}
                                {item.mensagem && <span>{item.mensagem}</span>}
                            </CardWrapperSecondary>
                            <small className="font-italic pt-1" style={{fontSize: 12}}>
                                <DoneAllIcon color={item.status ? 'info' : 'disabled'}
                                             style={{fontSize: 14}}/>
                                {item.data}
                            </small>
                        </Box>
                    </Box> :
                    <Box
                        display="flex"
                        alignItems="fle x-start"
                        justifyContent="flex-end"
                        py={1}
                    >
                        <Box
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="column"
                            justifyContent="flex-end"
                            mr={1}
                            ml={15}
                        >
                            <CardWrapperPrimary>
                                {item.url && <span className="d-block"><ImagePdf url={item.url}/></span>}
                                {item.mensagem && <span>{item.mensagem}</span>}
                            </CardWrapperPrimary>
                            <small className="font-italic pt-1" style={{fontSize: 12}}>
                                <DoneAllIcon color={item.status ? 'info' : 'disabled'}
                                             style={{fontSize: 14}}/>
                                {item.data}
                            </small>
                        </Box>
                        <Avatar variant="circular" sx={{width: 40, height: 40}} alt="foto" src={fotoUsuario}/>
                    </Box>}
            </div> : <div className="text-white">{setProgress(true)}.</div>
    )
}
