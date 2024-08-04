import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Typography} from "@mui/material";

export default function DadosPedidoFinanceiroFiles({dados}) {
    return (
        <>
            {dados.pedido_files.planilha_pedido &&
                <div className="col mb-4">
                    <Typography className="d-block">Via do Pedido</Typography>
                    <ImagePdf url={dados.pedido_files.planilha_pedido}/>
                </div>}
            {dados.pedido_files.nota_fiscal &&
                <div className="col mb-4">
                    <div className="card card-body">
                        <span className="d-block"><b>Nota Fiscal</b></span>
                        <ImagePdf url={dados.pedido_files.nota_fiscal}/>
                    </div>
                </div>}

            {dados.financeiro.boletos.map((item, index) => {
                return (
                    <div key={index} className="col mb-4">
                        <div className="card card-body">
                            <span className="d-block"><b>{item.indice}° Boleto</b></span>
                            <span>Vencimento: {item.data}</span>
                            <ImagePdf url={item.url}/>
                        </div>
                    </div>
                )
            })}

            {dados.financeiro.pix.map((item, index) => {
                return (
                    <div key={index} className="col mb-4">
                        <div className="card card-body">
                            <span className="d-block"><b>Comprovante do PIX</b></span>
                            {/*<span>Vencimento: {item.data}</span>*/}
                            <ImagePdf url={item.url}/>
                        </div>
                    </div>
                )
            })}

            {dados.financeiro.cheques.map((item, index) => {
                return (
                    <div key={index} className="col mb-4">
                        <div className="card card-body">
                            <span className="d-block"><b>{item.indice}° Cheque</b></span>
                            <span>Vencimento: {item.data}</span>
                            <ImagePdf url={item.url}/>
                        </div>
                    </div>
                )
            })}

            {dados.pedido_files.boleto && <div className="col">
                <div className="card card-body">
                    <span className="d-block"><b>1° Boleto/Nota</b></span>
                    <ImagePdf url={dados.pedido_files.boleto}/>
                </div>
            </div>}

            {dados.pedido_files.boleto_2 && <div className="col">
                <div className="card card-body">
                    <span className="d-block"><b>2° Boleto/Nota</b></span>
                    <ImagePdf url={dados.pedido_files.boleto_2}/>
                </div>
            </div>}
        </>
    )
}
