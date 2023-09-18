import Layout from "@/Layouts/Admin/Layout";
import ImagePdf from "@/Components/Inputs/ImagePdf";

import ForwardIcon from '@mui/icons-material/Forward';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import Tooltip from '@mui/material/Tooltip';
import {useForm} from "@inertiajs/react";

export default function Index({email, folderAtual}) {
    const {post} = useForm({
        id: email.id
    })

    function enviarLixeira() {
        post(route('admin.emails.enviar-lixeira'))
    }

    return (
        <Layout container titlePage="E-mail" menu="emails" submenu="recebidas" voltar={route('admin.emails.index')}>
            <div className="row justify-content-end">
                <div className="col-auto text-center">
                    <Tooltip title="Encaminhar" placement="top-start">
                        <a className="">
                            <ForwardIcon/>
                            <small className="d-block" style={{fontSize: 12}}>Encaminhar</small>
                        </a>
                    </Tooltip>
                </div>
                <div className="col-auto text-center">
                    <a className="cursor-pointer" onClick={() => enviarLixeira()}>
                        <DeleteIcon/>
                        <small className="d-block" style={{fontSize: 12}}>Excluir</small>
                    </a>
                </div>
                <div className="col-auto text-center">
                    <Tooltip title="Responder" placement="top-start">
                        <a className="pe-3" href={route('admin.emails.create', {folder: folderAtual, id: email.id})}>
                            <ReplyOutlinedIcon/>
                            <small className="d-block" style={{fontSize: 12}}>Responder</small>
                        </a>
                    </Tooltip>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="card card-body bg-white">
                        <small className="d-block font-weight-bold">De:</small>
                        <span className="d-block">{email.remetente.nome}</span>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="card card-body">
                        <small className="d-block font-weight-bold">Assunto:</small>
                        {email.titulo}
                    </div>
                </div>
            </div>
            {(email.pdf.length || email.imagem.length) ?
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

                        {email.html.map((valor) => {
                            return (<div className="row mb-4">
                                <iframe srcDoc={valor} width="100%" height="500"
                                />
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </Layout>)
}
