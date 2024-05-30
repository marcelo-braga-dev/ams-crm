import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";

export default function DadosPedidoClienteFiles({dados}) {
    return (
        <div className="row row-cols-4">
            {dados.cliente_files.rg &&
                <div className="col mb-3">
                    <div className="card card-body text-center">
                        <Typography variant={"body1"}>RG</Typography>
                        <ImagePdf url={dados.cliente_files.rg}></ImagePdf>
                    </div>
                </div>}
            {dados.cliente_files.cpf &&
                <div className="col mb-3">
                    <div className="card card-body text-center">
                        <Typography variant={"body1"}>CPF</Typography>
                        <ImagePdf url={dados.cliente_files.cpf}></ImagePdf>
                    </div>
                </div>}
            {dados.cliente_files.cnh &&
                <div className="col mb-3">
                    <div className="card card-body text-center">
                        <Typography variant={"body1"}>CNH</Typography>
                        <ImagePdf url={dados.cliente_files.cnh}></ImagePdf>
                    </div>
                </div>}

            {dados.cliente_files.cnpj &&
                <div className="col mb-3">
                    <div className="card card-body text-center">
                        <Typography variant={"body1"}>Cartão CNPJ</Typography>
                        <ImagePdf url={dados.cliente_files.cnpj}></ImagePdf>
                    </div>
                </div>}
            {dados.cliente_files.comprovante_residencia &&
                <div className="col mb-3">
                    <div className="card card-body text-center">
                        <Typography variant={"body1"}>Comprovante de Residência</Typography>
                        <ImagePdf url={dados.cliente_files.comprovante_residencia}></ImagePdf>
                    </div>
                </div>}
        </div>

    )
}
