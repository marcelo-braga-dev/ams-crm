import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function ({sacs, pedido}) {
    return (
        <Layout empty titlePage="SAC do Pedido" menu="sac" submenu="sac-chamados">
            <div className="card card-body mb-4">
                <DadosPedidoMinimo dados={pedido}  />
            </div>
            {sacs.map(item => (
                <div key={item.id} className="card card-body mb-4">
                    <span className="d-block"><b>{item.titulo}</b></span>
                    <div className="row">
                        <div className="col">
                            <span className="d-block"><b>Autor:</b> {item.autor}</span>
                            <span className="d-block"><b>Data Criação:</b> {item.data}</span>
                        </div>
                        <div className="col">
                            <span className="d-block"><b>Status:</b> {item.status}</span>
                        </div>
                        <div className="col-auto">
                            <a className="btn btn-primary" href={route('admin.chamados.show', item.id)}>Abrir</a>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    )
}
