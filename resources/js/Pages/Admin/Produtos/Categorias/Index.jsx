import Layout from '@/Layouts/Layout';
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import Link from "@/Components/Link";
import {Eye} from "react-bootstrap-icons";

const Page = ({categorias, setores}) => {

    const {data, setData, post} = useForm()

    const cadastrarCategoria = (e) => {
        e.preventDefault()
        router.post(route('admin.produtos-categorias.store'))
    }

    return (
        <Layout titlePage="Categorias dos Produtos" menu="produtos" submenu="produtos-categorias">
            <CardContainer>
                <CardTable title="Categorias" btn={
                    <button className="btn btn-primary mb-0" type="button" data-bs-toggle="modal" data-bs-target="#cadastrarCategoria">
                        Cadastrar Categoria</button>}>
                    <table className="table-1 table-hover">
                        <thead>
                        <tr>
                            <th className="text-center" style={{width: 30}}>ID</th>
                            <th>Categorias</th>
                            <th>Setor</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {categorias.map((dados) => {
                            return (
                                <tr key={dados.id}>
                                    <td className="text-center">
                                        #{dados.id}
                                    </td>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.setor}
                                    </td>
                                    <td className="text-center">
                                        <Link href={route('admin.produtos-categorias.show', dados.id)} icon={<Eye size="22"/>}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>

            {/*Cadastrar Categoria*/}
            <div className="modal fade mt-5" id="cadastrarCategoria" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrar Categoria</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={cadastrarCategoria}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col mb-4">
                                        <TextField label="Nome da categoria" fullWidth required
                                                   onChange={e => setData('nome', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextField label="Setor" select required fullWidth defaultValue=""
                                                   onChange={e => setData('setor', e.target.value)}>
                                            {setores.map((setor, index) => {
                                                return (
                                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Page
