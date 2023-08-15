import Layout from "@/Layouts/Admin/Layout";
import parse from 'html-react-parser';

export default function Index({email}) {

    return (
        <Layout container titlePage="" voltar={route('admin.emails.index')}>
            <div className="text-end mb-2">
                <small className="pe-2">Responder</small>
                <small className="pe-2">Excluir</small>
                <small className="pe-2">Encaminhar</small>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="card card-body">
                        <span className="d-block">DE:  {email.remetente.nome} ({email.remetente.email}) </span>

                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="card card-body">
                        <small>Título:</small>
                        {email.titulo}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="card card-body">
                        {email.html.map((valor) => {
                            return (
                                <div className="row mb-4">
                                    {parse(valor)}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card card-body">
                        <small>Anexos:</small>
                        {email.pdf.map((valor) => {
                            return (
                                <div className="row mb-2">
                                    <small>{(valor.nome)}</small>
                                </div>
                            )
                        })}
                        {email.imagem.map((valor) => {
                            return (
                                <div className="row mb-2">
                                    <small>{(valor.nome)}</small>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {email.body && parse(email.body)}
        </Layout>
    )
}
