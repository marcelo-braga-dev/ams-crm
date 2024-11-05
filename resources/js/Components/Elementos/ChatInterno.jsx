import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {useForm} from "@inertiajs/react";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EmojiPicker from "emoji-picker-react";
import $ from 'jquery'

export default function ChatInterno({conversas, pessoas, getUrl, urlSubmit}) {
    const [mensagens, setMensagens] = useState([]);
    const [nomeDestinatario, setNomeDestinatario] = useState();
    const [chats, setChats] = useState(conversas);
    const [qtdMensagens, setQtdMensagens] = useState(0);

    const {data, setData, post} = useForm({
        mensagem: '', anexo: ''
    });

    // Enviar Mensagem
    function submit() {
        if (data.mensagem || data.anexo) {
            post(urlSubmit);
            data.mensagem = ''
            data.anexo = ''
        }
        limparCaixaMensagem()
    }

    // Scroll bottom mensagem
    function scrollBox() {
        const scrollingElement = document.getElementById('mensagens');
        if (scrollingElement) scrollingElement.scrollTop = scrollingElement.scrollHeight
    }

    // Limpa caixa mensagem
    function limparCaixaMensagem() {
        const input = document.getElementById('input_mensagem');
        if (input) input.value = ''
    }

    async function getMensagens(idDest) {
        try {
            const response = await axios.get(route(getUrl, {destinatario: idDest}));

            setChats(response.data.chats)
            if (qtdMensagens !== response.data.mensagens.length) {
                setMensagens(response.data.mensagens)
                setQtdMensagens(response.data.mensagens.length)
            }
        } catch (error) {
            console.error(error);
        }
    }

    // setTimeout(function () {
    //     getMensagens()
    // }, 100)

    useEffect(() => {
        $('.mensagem-chat').removeClass('d-none')
        scrollBox()
    }, [mensagens]);

    function buscarMensagens(dadosDestinatario) {
        setData('destinatario', dadosDestinatario.id)
        setNomeDestinatario(dadosDestinatario.nome)
        getMensagens(dadosDestinatario.id)

    }

    function buscarMensagensx(dadosDestinatario) {

        buscarMensagens(dadosDestinatario)
    }

    function emoji(e) {
        data.mensagem = data.mensagem + e.emoji
    }

    // Recebe Mensagem - fim
    return (
        <div className="row">
            {/*Usuarios*/}
            <div className="col-md-4 px-3">
                <TextField className="mb-3" size="small" select fullWidth
                           placeholder="Pesquisar..." defaultValue=""
                           onChange={e => buscarMensagens(e.target.value)}>
                    {pessoas.map((option) => {
                        return (<MenuItem key={option.id} value={option}>
                            #{option.id} - {option.nome}
                        </MenuItem>)
                    })}
                </TextField>

                {/*Seleciona conversas*/}
                <span className="small">Conversas</span>
                {chats.map((item, index) => {
                    return (<div key={index} onClick={() => buscarMensagensx(item)}
                                 className={(data.destinatario === item.id ? 'bg-dark text-white ' : '') + "shadow p-3 px-3 mb-3  rounded cursor-pointer"}>
                        <div className="row justify-content-between">
                            <div className="col text-truncate">
                                {item.nome}
                            </div>
                            <div className="col-auto">
                                {item.qtd_nova > 0 &&
                                    <span className="badge rounded-pill bg-success">{item.qtd_nova}</span>}
                            </div>
                        </div>
                        {/*<span className="d-block small font-italic">Off-line</span>*/}
                    </div>)
                })}
            </div>
            {/*Caixa de Mensagens*/}
            <div className="col-md-8">
                <div className="row shadow rounded border px-3">
                    <div className="row py-2 font-weight-bold justify-content-between">
                        <div className="col pt-2">{nomeDestinatario}</div>
                        <div className="col-auto">
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file"
                                       onChange={e => setData('anexo', e.target.files[0])}/>
                                <AttachFileIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="col-12 bg-dark rounded pt-3 height-400 border text-end"
                         id="mensagens" style={{overflowY: 'scroll', flexDirection: 'row-reverse'}}>
                        {mensagens.map((mensagem, index) => {
                            return (<div key={index}
                                         className={"row mensagem-chat d-none m-0 mb-3 " + (mensagem.resposta ? "" : ' justify-content-end')}>
                                <div
                                    className={"col-8 bg-white shadow rounded p-2 px-3" + (mensagem.resposta ? "" : ' text-end')}>

                                    <small className="font-weight-bold">{mensagem.nome_usuario}</small>
                                    {mensagem.tipo === 'msg' && <span className="mb-2 d-block">
                                        {mensagem.mensagem}
                                    </span>}
                                    {mensagem.tipo === 'file' && <span className="mb-2 d-block">
                                        <ImagePdf url={mensagem.mensagem}/>
                                    </span>}

                                    <small className="font-italic" style={{fontSize: 12}}>
                                        <DoneAllIcon color={mensagem.status === 'lido' ? 'info' : 'disabled'}
                                                     style={{fontSize: 14}}/>
                                        {mensagem.data}
                                    </small>

                                </div>
                            </div>)
                        })}
                    </div>
                    {/*Enviar Mensagem*/}
                    <div className="border-top mt-3">
                        {data.anexo && <small className="pt-2">
                            <AttachFileIcon style={{fontSize: 18}}/>
                            <b>{data.anexo.name}</b>
                        </small>}
                        <div className="row mt-2">
                            <div className="col-9 p-0 m-0">
                                <TextField size="small" fullWidth id="input_mensagem" value={data.mensagem}
                                           onChange={e => setData('mensagem', e.target.value)}/>
                            </div>
                            <div className="col-1 ">
                                <div data-bs-toggle="modal" data-bs-target="#modalEmoji">
                                    <span style={{fontSize: 24}}>😊</span>
                                    {/*<EmojiEmotionsIcon style={{fontSize: 32, color: 'orange' }} />*/}
                                </div>
                            </div>
                            <div className="col-2">
                                <button onClick={submit} className="btn btn-dark">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade mt-5" id="modalEmoji" tabIndex="-1" aria-labelledby="modalEmojiLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <EmojiPicker onEmojiClick={emoji}/>
                    </div>
                </div>
            </div>

        </div>
    )
}
