import Layout from "@/Layouts/Layout.jsx";
import ModulosCurso from "@/Pages/Geral/Cursos/Show/ModulosCurso.jsx";

const Page = ({modulos}) => {

    return (
        <Layout titlePage="Cursos" menu="cursos" submenu="cursos-index">
            <ModulosCurso modulos={modulos}/>
        </Layout>
    )
}
export default Page
