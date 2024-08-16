import Layout from "@/Layouts/Layout.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import TextField from "@mui/material/TextField";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";

const Page = ({registros}) => {
    const {data, setData} = useForm({
        app_name: registros?.app_name,
        logo: registros?.logo,
        favicon: registros?.favicon,
        bg_color: registros?.bg_color,
        primary_color: registros?.primary_color,
        secundary_color: registros?.secundary_color,
        header_bgcolor: registros?.header_bgcolor,
        nav_bgcolor: registros?.nav_bgcolor,
        card_bgcolor: registros?.card_bgcolor,
    })

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.config.plataforma.update', 0), {...data, _method: 'PUT'})
    }

    return (<Layout titlePage="Configurações da Plataforma" menu="config" submenu="config-plataforma">
            <form onSubmit={submit}>
                <CardContainer>
                    <CardBody>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Nome da Plataforma" fullWidth value={data.app_name}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <TextField label="Logo" type="file" fullWidth InputLabelProps={{shrink: true}}
                                           onChange={e => setData('logo', e.target.files[0])}/>
                            </div>
                            <div className="col-md-3">
                                <TextField label="Favicon" type="file" fullWidth InputLabelProps={{shrink: true}}
                                           onChange={e => setData('favicon', e.target.files[0])}/>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col">
                                <TextField label="Cor de Fundo" type="color" fullWidth value={data.bg_color}
                                           onChange={e => setData('bg_color', e.target.value)}/>
                            </div>
                            <div className="col">
                                <TextField label="Cor do Cabeçalho" type="color" fullWidth value={data.header_bgcolor}
                                           onChange={e => setData('header_bgcolor', e.target.value)}/>
                            </div>
                            <div className="col">
                                <TextField label="Cor do Menu Lateral" type="color" fullWidth value={data.nav_bgcolor}
                                           onChange={e => setData('nav_bgcolor', e.target.value)}/>
                            </div>
                            <div className="col">
                                <TextField label="Cor de Fundo dos Cards" type="color" fullWidth value={data.card_bgcolor}
                                           onChange={e => setData('card_bgcolor', e.target.value)}/>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <button className="btn btn-primary">Atualizar</button>
                    </CardBody>
                </CardContainer>
            </form>
        </Layout>)
}
export default Page
