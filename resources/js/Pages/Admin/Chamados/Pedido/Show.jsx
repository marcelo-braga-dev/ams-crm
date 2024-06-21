import Layout from "@/Layouts/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import DadosPedido from "@/Components/Pedidos/DadosPedido";

export default function ({sacs, pedido}) {
    return (
        <Layout empty titlePage="SAC do Pedido" menu="sac" submenu="sac-chamados">
            <CardContainer>
                <CardBody>
                    <DadosPedido dados={pedido}/>
                </CardBody>
            </CardContainer>

            {sacs.map(item => (
                <CardContainer>
                    <CardBody>
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
                    </CardBody>
                </CardContainer>
            ))}
        </Layout>
    )
}
