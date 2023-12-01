import {
    Tooltip,
    IconButton,
    Box,
    Button,
    InputBase,
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {useForm} from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import EmojiPicker from "emoji-picker-react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from 'styled-components'
import TextField from "@mui/material/TextField";

const MessageInputWrapper = styled(InputBase)(
    ({theme}) => `
    font-size: 18px;
    padding: 1px;
    width: 100%;
`
);
const Preview = styled.img`
    align-items: center;
    display: flex;
    justify-content: center;
    //margin-top: 1rem;
    max-height: 16rem;
    max-width: 42rem;
`
const Container = styled.div`
    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;
    /* Misc */
    height: 32rem;
    padding: 1rem 0;
`


function BottomBarContent({infoChatSelecionado, urlSubmit, admin}) {
    const {data, setData, post} = useForm({
        mensagem: '', anexo: ''
    });

    const [abrirEmojis, setAbrirEmojis] = useState(false)

    useEffect(() => {
        setData(previousInputs => ({...previousInputs, destinatario: infoChatSelecionado.id,}))
        setData(previousInputs => ({...previousInputs, categoria: infoChatSelecionado.categoria}))
    }, [infoChatSelecionado]);

    function submit() {
        // CHAT
        if ((data.mensagem.trim() || data.anexo) && data.destinatario) {
            post(urlSubmit);
        }
        // AVISOS
        if (data.mensagem.trim() && infoChatSelecionado.categoria === 'avisos') {
            post(urlSubmit);
        }
        limparCaixaMensagem()
    }

    function limparCaixaMensagem() {
        // reset variaveis
        data.mensagem = ''
        data.anexo = ''
        setAbrirEmojis(false)
        const imageEle = document.getElementById('preview');
        imageEle.src = "";
        // setData('mensagem', data.mensagem.trim())
    }

    function emoji(e) {
        setData('mensagem', data.mensagem + e.emoji)
    }

    // Colar imagens
    useEffect(() => {
        document.addEventListener('paste', function (evt) {
            // Get the data of clipboard
            const clipboardItems = evt.clipboardData.items;
            const items = [].slice.call(clipboardItems).filter(function (item) {
                // Filter the image items only
                return item.type.indexOf('image') !== -1;
            });
            if (items.length === 0) return;

            const item = items[0];
            const blob = item.getAsFile();

            const imageEle = document.getElementById('preview');
            imageEle.src = URL.createObjectURL(blob);
            let file = new File([blob], "imagem", {
                type: "image/jpeg",
                lastModified: new Date().getTime()
            }, 'utf-8');
            let container = new DataTransfer();
            container.items.add(file);
            document.querySelector('#file_input').files = container.files;

            setData('anexo', file)
        });
    }, [data]);

    useEffect(() => {
        document.addEventListener("keypress", function (e) {

            if (e.key === 'Enter' && e.ctrlKey === false) {
                const btn = document.querySelector("#btn-enviar-mensagem");
                btn.click();
            }
            if (e.key === 'Enter' && e.ctrlKey === true) {
                const imageEle = document.getElementById('input_mensagem');

                setData('mensagem', imageEle.value.trim() + "\n")
            }
        });
    }, [data.mensagem])

    return (
        infoChatSelecionado.id || (infoChatSelecionado.categoria === 'avisos' && admin) ?
            <>
                <div className="bg-white">
                    {abrirEmojis && <>
                        <div className="text-end pe-3">
                            <span onClick={() => setAbrirEmojis(!abrirEmojis)}>
                                <i className="fas fa-times text-danger"></i>
                            </span>
                        </div>

                        <EmojiPicker width="100%" theme="google" searchDisabled={true} onEmojiClick={emoji}/>
                    </>
                    }
                    {
                        data.anexo && <>
                            <div className="my-1">
                                <small>
                                    <AttachFileIcon style={{fontSize: 18}}/>
                                    <b>{data.anexo.name}</b>
                                </small>
                            </div>
                        </>
                    }
                    <input hidden accept="image/*" type="file" id="file_input"
                           onChange={e => console.log('INPUT')}/>
                    <Preview id="preview"></Preview>
                </div>

                <Box sx={{background: 'white', display: 'flex', py: 2}}>
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <QuestionAnswerIcon className="mx-3"/>
                        <MessageInputWrapper
                            value={data.mensagem.length > 1 ? data.mensagem : data.mensagem.trim()}
                            multiline maxRows="5"
                            autoFocus fullWidth id="input_mensagem"
                            placeholder="Escreva sua mensagem aqui..."
                            onChange={e => setData('mensagem', e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Tooltip arrow placement="top" title="Emojis"
                                 onClick={() => setAbrirEmojis(!abrirEmojis)}>
                            <IconButton sx={{fontSize: '16px'}} color="primary">😀</IconButton>
                        </Tooltip>

                        <input className="d-none" accept="image/*" id="messenger-upload-file" type="file"/>
                        <Tooltip arrow placement="top" title="Anexo">
                            <label htmlFor="messenger-upload-file">
                                <IconButton sx={{mx: 1}} color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file"
                                           onChange={e => setData('anexo', e.target.files[0])}/>
                                    <AttachFileTwoToneIcon fontSize="small"/>
                                </IconButton>
                            </label>
                        </Tooltip>
                        <Button startIcon={<SendTwoToneIcon/>} variant="contained" id="btn-enviar-mensagem"
                                onClick={submit}>
                            Enviar
                        </Button>
                    </Box>

                    {/*MODAL*/}
                    <div className="modal fade mt-5" id="modalEmoji" tabIndex="-1" aria-labelledby="modalEmojiLabel"
                         aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                {abrirEmojis && <EmojiPicker theme="google" onEmojiClick={emoji}/>}
                            </div>
                        </div>
                    </div>
                </Box>
            </> : <Box sx={{background: 'white', p: 4}}/>
    )
}

export default BottomBarContent;
