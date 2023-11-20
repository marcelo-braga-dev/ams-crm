import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DadosDev from "@/Components/Dados/Dev";

export default function ({dados, tarefas}) {
    return (
        <Layout container titlePage="Suporte em Andamento" voltar={route('admin.dev.index')} menu="dev" submenu="registros">

            <DadosDev dados={dados}/>

            <div className="row mt-4">
                <h6>Tarefas:</h6>
                <div className="col-12">

                    <ul className="list-group">
                    {tarefas.map((dados, index) => {
                        return (
                                <li key={index} className="list-group-item">
                                    {dados.status === 'novo' ?
                                        <AccessTimeIcon /> : <CheckCircleOutlineIcon className="text-success"/>}
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
