import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import Typography from "@mui/material/Typography";

export default function Show({integrador}) {

    return (
        <Layout container titlePage="Informações do Integrador" voltar={route('consultor.integradores.index')}>

            <div className="row">
                <div className="col">
                    <Typography variant="h5" component="h3">Informações do Integrador</Typography></div>
                <div className="col-auto text-right">
                    <a className="btn btn-primary" href={route('consultor.integradores.edit', integrador.id)}>Editar</a>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Typography><b>Empresa:</b> {integrador.nome}</Typography>
                    <Typography><b>CNPJ:</b> {integrador.cnpj}</Typography>
                    <Typography><b>Atendente:</b> {integrador.atendente}</Typography>
                    <Typography><b>Telefone:</b> {integrador.telefone}</Typography>
                    <Typography><b>Email:</b> {integrador.email}</Typography>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Typography><b>Anotações:</b> {integrador.anotacoes}</Typography>
                </div>
            </div>
        </Layout>);
}
