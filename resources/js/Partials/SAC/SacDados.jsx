import ImagePdf from "@/Components/Elementos/ImagePdf";
import React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import {Stack, Typography} from "@mui/material";
import {Check, Eye, Paperclip, Tags, X} from "react-bootstrap-icons";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Link from "@/Components/Link.jsx";

export default function SacDados({sac, pedido, urlPedido}) {
    const iconBool = (statusItem) => {
        return statusItem ? <Check color="green" size={22}/> : <X color="red" size={22}/>
    }

    return (<>
        <CardContainer>
            <CardTitle icon={<Tags size={25}/>} title={sac.titulo} subtitle={
                <Stack direction="row" spacing={3}>
                    <Typography variant="body2"><b>Autor:</b> {sac.autor}</Typography>
                    <Typography variant="body2"><b>Stataus do SAC:</b> {sac.status}</Typography>
                    <Typography variant="body2"><b>Data de abertura:</b> {sac.data}</Typography>
                </Stack>
            }>

            </CardTitle>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <CampoTexto titulo="ID do Pedido" texto={`#${sac.pedido_id}`}/>
                        <CampoTexto titulo="Status do Pedido" texto={pedido.pedido.status}/>
                        <CampoTexto titulo="Valor do Pedido" texto={`R$ ${pedido.financeiro.preco}`}/>
                        <CampoTexto titulo="Integrador" texto={pedido.integrador.nome}/>
                        <CampoTexto titulo="Distribuidora" texto={pedido.fornecedor.nome}/>
                        <CampoTexto titulo="Cliente" texto={pedido.cliente.nome}/>
                        <CampoTexto titulo="Endereço" texto={pedido.cliente.endereco}/>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle icon={<Paperclip size={25}/>} title=" Anexos"/>
            <CardBody>
                {sac.nota && <>
                    <Stack direction="row" spacing={3}>
                        <span className="d-block"><b>Nota Fiscal:</b> {sac.nota}</span>
                        <span className="d-block"><b>Entrega Agendada:</b> {iconBool(sac.entrega_agendada)}</span>
                        <span className="d-block"><b>Material Paletizado:</b> {iconBool(sac.paletizado)}</span>
                        <span className="d-block"><b>Produtos Quebrados/Danificados:</b> {iconBool(sac.produtos_quebrados)}</span>
                        <span className="d-block"><b>Produtos Faltando:</b> {iconBool(sac.produtos_faltam)}</span>
                    </Stack>

                    <div className="row mt-4">
                        <div className="col">
                            <small className="d-block text-muted">CT-e:</small>
                            <ImagePdf url={sac.img_cte}/>
                        </div>
                        <div className="col">
                            <small className="d-block text-muted">Imagem da Entrega:</small>
                            <ImagePdf url={sac.img_entrega}/>
                        </div>
                        <div className="col">
                            <small className="d-block text-muted">Imagem do Produto Danificado:</small>
                            <ImagePdf url={sac.img_produto}/>
                        </div>
                    </div>
                </>}
            </CardBody>
        </CardContainer>
    </>)
}
