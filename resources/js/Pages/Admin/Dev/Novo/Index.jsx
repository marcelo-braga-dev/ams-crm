import Layout from "@/Layouts/Admin/Layout";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ({dados, tarefas}) {
    return (
        <Layout titlePage="Suporte em Aberto" container menu="dev" submenu="registros">
            <div className="row">
                <div className="col">
                    <span className="d-block">Título: {dados.titulo}</span>
                    <span className="d-block">Descrição: {dados.descricao}</span>
                    <span className="d-block">Anotações: {dados.anotacoes}</span>
                    <span className="d-block">Área: {dados.area}</span>
                    <span className="d-block">Prioridade: {dados.prioridade}</span>
                    <span className="d-block">ID: #{dados.id}</span>
                </div>
            </div>
            <div className="row mt-4">
                <h6>Tarefas:</h6>
                <div className="col-12">

                    <ul className="list-group">
                        {tarefas.map((dados, index) => {
                            return (
                                <li key={index} className="list-group-item">
                                    {dados.status === 'novo' ?
                                        <AccessTimeIcon/> : <CheckCircleOutlineIcon className="text-success"/>}
                                    <span className="ps-3">{dados.texto}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
