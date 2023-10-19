import ImagePdf from "@/Components/Inputs/ImagePdf";
import * as React from "react";

export default function DadosPedidoFinanceiroFiles({dados}) {
    return (<>
            <div className="row row-cols-3">
                {dados.pedido_files.nota_fiscal &&
                    <div className="col mb-4">
                        <div className="shadow rounded p-3">
                            <span className="d-block"><b>Nota Fiscal</b></span>
                            <ImagePdf url={dados.pedido_files.nota_fiscal}/>
                        </div>
                    </div>}
            </div>

            <div className="row row-cols-3">
                {dados.financeiro.boletos.map((item, index) => {
                    return (
                        <div key={index} className="col mb-4 ">
                            <div className="shadow rounded p-3">
                                <span className="d-block"><b>{item.indice}° Boleto</b></span>
                                <span>Vencimento: {item.data}</span>
                                <ImagePdf url={item.url}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="row row-cols-3">
                {dados.financeiro.cheques.map((item, index) => {
                    return (
                        <div key={index} className="col mb-4 ">
                            <div className="shadow rounded p-3">
                                <span className="d-block"><b>{item.indice}° Cheque</b></span>
                                <span>Vencimento: {item.data}</span>
                                <ImagePdf url={item.url}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="row">
                {dados.pedido_files.boleto && <div className="col-auto">
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>1° Boleto/Nota</b></span>
                        <ImagePdf url={dados.pedido_files.boleto}/>
                    </div>
                </div>}
                {dados.pedido_files.boleto_2 && <div className="col-auto">
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>2° Boleto/Nota</b></span>
                        <ImagePdf url={dados.pedido_files.boleto_2}/>
                    </div>
                </div>}
            </div>
        </>
    )
}
