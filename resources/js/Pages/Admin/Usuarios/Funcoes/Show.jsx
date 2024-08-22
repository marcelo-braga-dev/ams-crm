import Layout from "@/Layouts/Layout";

export default function ({ funcao }) {
    return (
        <Layout menu="usuarios" submenu="usuarios-funcoes" voltar={route('admin.usuarios.funcoes.index')} >
            <a className="btn btn-success"
                href={route('admin.usuarios.funcoes.edit', funcao.id)}>Editar</a>

            <table>
                <tbody>
                    <tr>
                        <td>Nome:</td>
                        <td>{funcao.nome}</td>
                    </tr>
                    <tr>
                        <td>Função Admin:</td>
                        <td>{funcao.is_admin ? 'SIM' : 'NÃO'}</td>
                    </tr>
                    <tr>
                        <td>Permissões:</td>
                        <td>{funcao.permissoes.map((item, index) => <span key={item.id} className="pe-2">{item.permissao_nome}{(funcao.permissoes.length - 1) === index ? '' : ','}</span>)}</td>
                    </tr>
                </tbody>
            </table>
        </Layout>
    )
}
