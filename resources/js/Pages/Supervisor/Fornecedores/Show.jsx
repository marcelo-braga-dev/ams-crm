import Layout from "@/Layouts/Supervisor/Layout";

export default function Show({dados}) {

    return (
        <Layout titlePage="Cadastrar Fornecedor" container voltar={route('supervisor.fornecedores.index')}>
            <div className="row">
                <div className="col">
                    <h5 className="mb-4">Informações do Fornecedor</h5></div>
                <div className="col text-right">
                    <a className="btn btn-primary" href={route('supervisor.fornecedores.edit', dados.id)}>Editar</a>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <p><b>Empresa:</b> {dados.nome}</p>
                    <p><b>CNPJ:</b> {dados.cnpj}</p>
                    <p><b>Atendente:</b> {dados.atendente}</p>
                    <p><b>Telefone:</b> {dados.telefone}</p>
                    <p><b>Email:</b> {dados.email}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <p><b>Anotações:</b> {dados.anotacoes}</p>
                </div>
            </div>
        </Layout>
    );
}
