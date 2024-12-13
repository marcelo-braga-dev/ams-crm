import Layout from "@/Layouts/Layout.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import FormLeads from "@/Partials/Leads/FormLeads.jsx";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import validarCNPJ from "@/Utils/validarCNPJ.js";
import {useAlert} from "@/Hooks/useAlert.jsx";
import validarCPF from "@/Utils/validarCPF.js";

const Page = ({setores}) => {
    const {alertError} = useAlert()

    const {data, setData} = useForm({telefones: []})

    const onSubmit = (e) => {
        e.preventDefault()

        try {
            if (data.cnpj) validarCNPJ(data.cnpj)
            if (data.cpf) validarCPF(data.cpf)

            router.post(route('auth.leads.store'), {...data})
        } catch (error) {
            alertError(error.message)
            console.error(error.message);
        }

    }
    return (
        <Layout titlePage="Cadastrar Lead" menu="leads" submenu="leads-cadastrar">
            <form onSubmit={onSubmit}>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-4">
                                {/*Setores*/}
                                <TextField label="Setor" select required fullWidth defaultValue=""
                                           onChange={e => setData('setor', e.target.value)}>
                                    {setores.map(({id, nome}) => <MenuItem key={id} value={id}>{nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <FormLeads setData={setData} data={data}/>

                <button type="submit" className="btn btn-success mb-8">Salvar</button>
            </form>
        </Layout>
    )
}
export default Page
