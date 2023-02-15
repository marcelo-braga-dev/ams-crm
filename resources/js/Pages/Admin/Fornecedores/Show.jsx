import Layout from "@/Layouts/Admin/Layout";

export default function Show({dados}) {
    return (
        <Layout container titlePage="Cadastrar Fornecedor" voltar={route('admin.fornecedores.index')}>
            <div className="row">
                <div className="col">
                    <h5>Informações do Fornecedor</h5>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary" href={route('admin.fornecedores.edit', dados.id)}>Editar</a>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <span className="d-block"><b>Empresa:</b> {dados.nome}</span>
                    <span className="d-block"><b>CNPJ:</b> {dados.cnpj}</span>
                    <span className="d-block"><b>Atendente:</b> {dados.atendente}</span>
                    <span className="d-block"><b>Telefone:</b> {dados.telefone}</span>
                    <span className="d-block"><b>Email:</b> {dados.email}</span>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <span className="d-block"><b>Anotações:</b> {dados.anotacoes}</span>
                </div>
            </div>
        </Layout>
    );
}
