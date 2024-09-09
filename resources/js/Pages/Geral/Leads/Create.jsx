import Layout from "@/Layouts/Layout.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import FormLeads from "@/Partials/Leads/FormLeads.jsx";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";

const estados = [
    {id: 'AC', nome: 'Acre'},
    {id: 'AL', nome: 'Alagoas'},
    {id: 'AP', nome: 'Amapá'},
    {id: 'AM', nome: 'Amazonas'},
    {id: 'BA', nome: 'Bahia'},
    {id: 'CE', nome: 'Ceará'},
    {id: 'DF', nome: 'Distrito Federal'},
    {id: 'ES', nome: 'Espírito Santo'},
    {id: 'GO', nome: 'Goiás'},
    {id: 'MA', nome: 'Maranhão'},
    {id: 'MT', nome: 'Mato Grosso'},
    {id: 'MS', nome: 'Mato Grosso do Sul'},
    {id: 'MG', nome: 'Minas Gerais'},
    {id: 'PA', nome: 'Pará'},
    {id: 'PB', nome: 'Paraíba'},
    {id: 'PR', nome: 'Paraná'},
    {id: 'PE', nome: 'Pernambuco'},
    {id: 'PI', nome: 'Piauí'},
    {id: 'RJ', nome: 'Rio de Janeiro'},
    {id: 'RN', nome: 'Rio Grande do Norte'},
    {id: 'RS', nome: 'Rio Grande do Sul'},
    {id: 'RO', nome: 'Rondônia'},
    {id: 'RR', nome: 'Roraima'},
    {id: 'SC', nome: 'Santa Catarina'},
    {id: 'SP', nome: 'São Paulo'},
    {id: 'SE', nome: 'Sergipe'},
    {id: 'TO', nome: 'Tocantins'}
]

const Page = ({setores}) => {

    const {data, setData} = useForm({telefones: []})

    const onSubmit = (e) => {
        e.preventDefault()

        router.post(route('auth.leads.store'), {...data})
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
