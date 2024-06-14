import ImagePdf from "@/Components/Elementos/ImagePdf";
import React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import {Stack, Typography} from "@mui/material";
import {Paperclip, Tags} from "react-bootstrap-icons";

export default function SacDados({sac, pedido, urlPedido}) {

    return (<>
        <CardContainer>
            <CardTitle icon={<Tags size={25} />} title={sac.titulo} subtitle={
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
                        <span className="d-block">
                            <b>ID do Pedido:</b> #{sac.pedido_id}
                            <a className="btn btn-link btn-sm text-dark p-0 m-0 ms-4" href={urlPedido}>Ver Pedido</a>
                        </span>
                        <span className="d-block"><b>Status do Pedido:</b> {pedido.pedido.status}</span>
                        <span className="d-block"><b>Valor do Pedido:</b> R$ {pedido.financeiro.preco}</span>
                        <span className="d-block"><b>Integrador:</b> {pedido.integrador.nome}</span>
                        {pedido.fornecedor.nome && <span className="d-block"><b>Distribuidora:</b> {pedido.fornecedor.nome}</span>}
                        <span className="d-block"><b>Cliente:</b> {pedido.cliente.nome}</span>
                        <span className="d-block"><b>Endereço:</b> {pedido.cliente.endereco}</span>
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
                        <span className="d-block"><b>Entrega Agendada:</b> {sac.entrega_agendada ? 'SIM' : 'NÃO'}</span>
                        <span className="d-block"><b>Material Paletizado:</b> {sac.paletizado ? 'SIM' : 'NÃO'}</span>
                        <span className="d-block"><b>Produtos Quebrados/Danificados:</b> {sac.produtos_quebrados ? 'SIM' : 'NÃO'}</span>
                        <span className="d-block"><b>Produtos Faltando:</b> {sac.produtos_faltam ? 'SIM' : 'NÃO'}</span>
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
