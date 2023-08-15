import Layout from "@/Layouts/Admin/Layout";

export default function Index({emails, folders}) {
    return (
        <Layout container titlePage="Caixa de Entrada" menu="emails" submenu="recebidas">
            <div className="row">
                <div className="col-md-3">
                    <form>
                        <div className="list-group">
                            {folders.map((folder, i) => {
                                return (
                                    <button key={i} type="submit" name="folder" value={folder.tag}
                                            className={(folder.selecionado ? 'active' : '') +
                                                ' list-group-item list-group-item-action d-flex justify-content-between align-items-center'}>
                                        {folder.nome}
                                        {/*<span className="badge bg-primary rounded-pill">14</span>*/}
                                    </button>
                                )
                            })}
                        </div>
                    </form>
                </div>
                <div className="col-md-9">
                    <div className="list-group">
                        {emails.map((email, i) => {
                                return (
                                    <a key={i} href={route('admin.emails.show', email.id)}
                                       className="list-group-item list-group-item-action">
                                        <div className="row justify-content-between">
                                            <div className="col">
                                            <span
                                                className={email.flag === 'visualizado' ? "text-muted mb-1 me-2" : 'mb-1 me-2 text-dark font-weight-bold'}>{email.titulo}</span>
                                            </div>
                                            <div className="col-auto">
                                                <small className="whitespace-normal m-2">{email.data}</small>
                                            </div>
                                        </div>
                                        <small className="mb-1">{email.autor}</small>
                                    </a>
                                )
                            }
                        )}
                    </div>
                    {emails.length ? '' : <span>Não há mensagens.</span>}
                </div>
            </div>

        </Layout>
    )
}
