import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import SacDados from "@/Partials/SAC/SacDados";

export default function Create({sac, pedido}) {

    return (
        <Layout empty titlePage="Informações do SAC" menu="sac" submenu="sac-chamados" container voltar={route('admin.chamados.index')}>
            <div className="card card-body mb-4">
                <SacDados sac={sac} pedido={pedido} urlPedido={route('admin.pedidos.show', sac.pedido_id)}/>
            </div>

            {/*Historico de Mensagens*/}
            {sac.mensagens.map((dado) => {
                return (
                    <div key={dado.id} className="card card-body mb-4">
                        <div className="row">
                            <div className="col mb-2">
                                <span><b>Autor:</b> {dado.autor}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <small className="d-block">
                                    <b>Data:</b> {dado.data}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span><b>Mensagem:</b> {dado.msg}</span>
                            </div>
                        </div>
                        {!!dado.anexos.length &&
                            <div className="row row-cols-4 mt-3">
                                {dado.anexos.map(item => (
                                    <div className="col">
                                        <ImagePdf url={item.url} urlRaiz/>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )
            })}
        </Layout>
    )
}
