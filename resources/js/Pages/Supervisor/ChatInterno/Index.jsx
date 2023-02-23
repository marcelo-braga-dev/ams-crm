import Layout from "@/Layouts/Supervisor/Layout";
import TextField from "@mui/material/TextField";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useForm} from "@inertiajs/react";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export default function ({conversas, pessoas}) {
    const [mensagens, setMensagens] = useState([]);
    const [nomeDestinatario, setNomeDestinatario] = useState();

    const {data, setData, post} = useForm({
        mensagem: ''
    });

    // Enviar Mensagem
    function submit() {
        post(route('supervisor.chat-interno.store'))
        getMensagem(data.destinatario)
    }

    // Scroll bottom mensagem
    useEffect(() => {
        const scrollingElement = document.getElementById('mensagens');
        if (scrollingElement) scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, [mensagens]);

    // Limpa caixa mensagem
    function limparCaixaMensagem() {
        const input = document.getElementById('input_mensagem');
        if (input) input.value = ''
    }

    // Recebe Mensagem
    function getMensagem(idDestinatario) {
        limparCaixaMensagem()
        fetch(route('supervisor.chat-interno.mensagens', {destinatario: idDestinatario}),
            {method: 'GET'})
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setMensagens(data);
            });
    }

    function buscarMensagens(destinatario) {
        setData('destinatario', destinatario.id)
        setNomeDestinatario(destinatario.nome)
        getMensagem(destinatario.id)
    }

    // Recebe Mensagem - fim

    return (
        <Layout container titlePage="Chat Interno"
                menu="chat-interno" submenu="mensagens">
            <div className="alert alert-info text-white mb-4"><b>Em desenvolvimento!</b></div>
            <div className="row">
                {/*Usuarios*/}
                <div className="col-md-4 px-3">
                    <TextField className="mb-3" size="small" select fullWidth
                               placeholder="Pesquisar..." defaultValue=""
                               onChange={e => buscarMensagens(e.target.value)}>
                        {pessoas.map((option) => {
                            return (
                                <MenuItem key={option.id} value={option}>
                                    #{option.id} - {option.nome}
                                </MenuItem>
                            )
                        })}
                    </TextField>

                    {/*Seleciona conversas*/}
                    <span className="small">Conversas</span>
                    {conversas.map((item, index) => {
                        return (
                            <div key={index} onClick={() => buscarMensagens(item)}
                                 className={
                                     (data.destinatario === item.id ? 'bg-dark text-white ' : '') +
                                     "shadow p-3 px-3 mb-3  rounded cursor-pointer"}>
                                <div className="row justify-content-between">
                                    <div className="col text-truncate">
                                        {item.nome}
                                    </div>
                                    <div className="col-auto">
                                        {/*<span className="badge rounded-pill bg-success">5</span>*/}
                                    </div>
                                </div>
                                {/*<span className="d-block small font-italic">Off-line</span>*/}
                            </div>
                        )
                    })}
                </div>
                {/*Caixa de Mensagens*/}
                <div className="col-md-8">
                    {data.destinatario ?
                    <div className="row shadow p-2 pt-3 rounded border">
                        <div className="pb-2 font-weight-bold">
                            {nomeDestinatario}
                        </div>
                        <div className="col-12 bg-dark rounded pt-3 height-400 border text-end"
                             id="mensagens" style={{overflowY: 'scroll'}}>
                            {mensagens.map((mensagem, index) => {
                                return (
                                    <div key={index} className={"row m-0 mb-3 " +
                                        (mensagem.resposta ? "" : ' justify-content-end')}>
                                        <div className={"col-8 bg-white shadow rounded p-2 px-3" +
                                            (mensagem.resposta ? "" : ' text-end')}>

                                            <small className="font-weight-bold">{mensagem.nome_usuario}</small>
                                            <span className="mb-2 d-block">{mensagem.mensagem}</span>
                                            <small className="font-italic" style={{fontSize: 12}}>
                                                {/*<DoneAllIcon color={mensagem.status === 'novo' ? 'disabled' : 'info'}*/}
                                                {/*             style={{fontSize: 14}}/>*/}
                                                {mensagem.data}
                                            </small>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/*Enviar Mensagem*/}
                        <div className="border-top">
                            <div className="row mt-2 pt-2">
                                <div className="col-10">
                                    <TextField size="small" fullWidth id="input_mensagem"
                                               onChange={e => setData('mensagem', e.target.value)}/>
                                </div>
                                <div className="col-2">
                                    <button onClick={submit} className="btn btn-dark">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                        : <div className="row p-4 justify-content-center">
                            <div className="col-auto">
                                Selecione uma conversa!
                            </div>
                        </div> }
                </div>
            </div>
        </Layout>
    )
}
