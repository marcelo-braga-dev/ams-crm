import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import {Col} from "reactstrap";
import Paper from "@mui/material/Paper";
import * as React from "react";

export default function DadosPedidoFinanceiroFiles({dados}) {
    return (<>
            <div className="row row-cols-3">
                {dados.pedido_files.nota_fiscal &&
                    <div className="col mb-4">
                        <div className="shadow rounded p-3">
                            <span className="d-block"><b>Nota Fiscal</b></span>
                            <ImagePdf url={dados.pedido_files.nota_fiscal} />
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
            <div className="row">
                {dados.pedido_files.boleto &&
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>Boleto/Nota</b></span>
                        <ImagePdf url={dados.pedido_files.boleto} />
                    </div>}
                {dados.pedido_files.boleto_2 &&
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>Boleto/Nota</b></span>
                        <ImagePdf url={dados.pedido_files.boleto_2} />
                    </div>}
            </div>
        </>
    )
}
