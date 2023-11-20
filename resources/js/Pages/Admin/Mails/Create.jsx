import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import JoditEditor from "jodit-react";
import React, {useState, useRef} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ImagePdf from "@/Components/Elementos/ImagePdf";

export default function Create({email, emailUsuario}) {
    const msgInicial = ''

    const {data, post, setData} = useForm({
        destinatario: email?.remetente?.email ?? null,
        titulo: email?.titulo ? ('Re: ' + email?.titulo) : null,
        mensagem: msgInicial
    });

    const editor = useRef(null);
    const [mensagemEmail, setMensagemEmail] = useState();

    const config = {
        readonly: false,
        height: (email?.id ? 400 : 500),
        placeholder: ''
    }

    function submit(e) {
        e.preventDefault();
        post(route('admin.emails.store', {mensagem: mensagemEmail}));
    }

    return (
        <Layout container titlePage={(email?.id ? "Responder Email" : "Enviar Email")} menu="emails" submenu="enviar"
                voltar={route('admin.emails.index')}>

            <form onSubmit={submit}>
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <span className="ms-3"><b>De:</b> {emailUsuario}</span>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary">
                            Enviar <SendIcon fontSize="small"/>
                        </button>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <TextField
                            label="Para:" fullWidth required type="email" size="small"
                            defaultValue={data.destinatario}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <EmailIcon fontSize="small"/>
                                </InputAdornment>,
                            }}
                            onChange={e => setData('destinatario', e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <TextField
                            label="Assunto:" fullWidth required size="small"
                            defaultValue={data.titulo}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <ArrowForwardIosIcon fontSize="small"/>
                                </InputAdornment>,
                            }}
                            onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>
            </form>

            <JoditEditor
                ref={editor}
                value={data.mensagem}
                config={config}
                onBlur={(newContent) => setData('mensagem', newContent)}
                onChange={(newContent) => {
                }}
            />

            {email?.id &&
                <div className="mt-4"><h6>Mensagens Anteriores</h6></div>
            }

            {(email?.pdf?.length || email?.imagem?.length) ?
                <div className="card card-body mb-4">
                    <small className="d-block font-weight-bold">Anexos:</small>
                    <div className="row row-cols-6">
                        {email.pdf.map((valor) => {
                            return (<div className="col text-truncate">
                                <small className="d-block mx-4">{valor.nome}</small>
                                <a href={valor.conteudo}>PDF</a>
                            </div>)
                        })}
                        {email.imagem.map((valor) => {
                            return (<div className="col">
                                <small className="d-block">{valor.nome}</small>
                                <ImagePdf string={valor.conteudo}/>
                            </div>)
                        })}
                    </div>
                </div> : ''}

            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        {email?.html?.map((valor) => {
                            return (<div className="row mb-4">
                                <iframe srcDoc={valor} width="100%" height="300"
                                />
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
