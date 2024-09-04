import React, {useEffect, useState, useCallback} from "react";
import {
    Tooltip, IconButton, Box, Button, InputBase,
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiPicker from "emoji-picker-react";
import styled from 'styled-components';
import {router, useForm} from "@inertiajs/react";
import {Chat} from "react-bootstrap-icons";

const MessageInputWrapper = styled(InputBase)`
    font-size: 18px;
    padding: 1px;
    width: 100%;
`;

const Preview = styled.img`
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 16rem;
    max-width: 42rem;
`;

const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 32rem;
    padding: 1rem 0;
`;

function BottomBarContent({infoChatSelecionado, urlSubmit, admin}) {
    const {data, setData, post, reset} = useForm({
        mensagem: '', anexo: ''
    });

    const [abrirEmojis, setAbrirEmojis] = useState(false);

    useEffect(() => {
        setData(previousInputs => ({
            ...previousInputs, destinatario: infoChatSelecionado.id, categoria: infoChatSelecionado.categoria
        }));
    }, [infoChatSelecionado]);

    const submit = useCallback(() => {
        if ((data.mensagem.trim() || data.anexo) && data.destinatario) {
            router.post(urlSubmit, {...data})
        }
        if (data.mensagem.trim() && infoChatSelecionado.categoria === 'avisos') {
            router.post(urlSubmit, {...data})
        }
        router.on('success', () => {
            limparCaixaMensagem()
        })
    }, [data, infoChatSelecionado, post, urlSubmit]);

    const limparCaixaMensagem = () => {
        reset('mensagem', 'anexo')
        setAbrirEmojis(false);
        const imageEle = document.getElementById('preview');
        if (imageEle) {
            imageEle.src = "";
        }
    };

    const handleEmojiClick = (e) => {
        setData('mensagem', data.mensagem + e.emoji);
    };

    const handlePaste = (evt) => {
        const clipboardItems = evt.clipboardData.items;
        const items = Array.from(clipboardItems).filter(item => item.type.indexOf('image') !== -1);
        if (items.length === 0) return;

        const item = items[0];
        const blob = item.getAsFile();
        const imageEle = document.getElementById('preview');
        if (imageEle) {
            imageEle.src = URL.createObjectURL(blob);
        }
        const file = new File([blob], "imagem", {
            type: "image/jpeg", lastModified: new Date().getTime()
        });
        const container = new DataTransfer();
        container.items.add(file);
        document.querySelector('#file_input').files = container.files;

        setData('anexo', file);
    };

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    return ((infoChatSelecionado.id || (infoChatSelecionado.categoria === 'avisos' && admin)) ? (<>
        <div className="bg-white">
            {abrirEmojis && (<>
                <div className="text-end pe-3">
                                <span onClick={() => setAbrirEmojis(!abrirEmojis)}>
                                    <i className="fas fa-times text-danger"></i>
                                </span>
                </div>
                <EmojiPicker width="100%" theme="google" searchDisabled onEmojiClick={handleEmojiClick}/>
            </>)}
            {data.anexo && (<div className="my-1">
                <small>
                    <AttachFileIcon style={{fontSize: 18}}/>
                    <b>{data.anexo.name}</b>
                </small>
            </div>)}
            <input hidden accept="image/*" type="file" id="file_input"/>
            <Preview id="preview"/>
        </div>

        <Box sx={{background: 'white', display: 'flex', py: 2}}>
            <Box flexGrow={1} display="flex" alignItems="center">
                <Chat size="22" className="mx-3"/>
                <MessageInputWrapper
                    value={data.mensagem}
                    multiline
                    maxRows="3"
                    autoFocus
                    fullWidth
                    id="input_mensagem"
                    placeholder="Escreva sua mensagem aqui..."
                    onChange={e => setData('mensagem', e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                            setData('mensagem', data.mensagem + '\n')
                            e.preventDefault(); // Evita o comportamento padrão de submissão ou foco
                        } else if (e.key === 'Enter') {
                            submit()
                            e.preventDefault();
                        }
                    }}
                />
            </Box>
            <Box>
                <Tooltip arrow placement="top" title="Emojis" onClick={() => setAbrirEmojis(!abrirEmojis)}>
                    <IconButton sx={{fontSize: '16px'}} color="primary">😀</IconButton>
                </Tooltip>

                <Tooltip arrow placement="top" title="Anexo">
                    <label htmlFor="messenger-upload-file">
                        <IconButton sx={{mx: 1}} color="primary" aria-label="upload picture" component="label">
                            <input hidden id="messenger-upload-file" type="file"
                                   onChange={e => setData('anexo', e.target.files[0])}/>
                            <AttachFileTwoToneIcon fontSize="small"/>
                        </IconButton>
                    </label>
                </Tooltip>
                <Button startIcon={<SendTwoToneIcon/>} variant="contained" id="btn-enviar-mensagem" onClick={submit}>
                    Enviar
                </Button>
            </Box>
        </Box>
    </>) : <Box sx={{background: 'white', p: 4}}/>);
}

export default BottomBarContent;
