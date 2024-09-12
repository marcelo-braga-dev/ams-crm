import Layout from "@/Layouts/Layout.jsx";

import {Grid, Stack, TextField} from "@mui/material";
import {useRef, useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {List, Pencil} from "react-bootstrap-icons";
import {ListAlt} from "@mui/icons-material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import DadosPedido from "@/Components/Pedidos/DadosPedido.jsx";
import ImagePdf from "@/Components/Elementos/ImagePdf.jsx";

const Page = ({anotacoes}) => {
    const [qtdAnexos, setQtdAnexos] = useState(2)
    const fileRefs = useRef([]);

    const {data, setData} = useForm({
        instalacao_id: anotacoes.id,
        titulo: '',
        msg: '',
        anexos: []
    })

    const anesxos = () => {
        let a = [];
        for (let i = 1; i <= qtdAnexos; i++) {
            a.push(
                <div key={i} className="col-md-4 mb-4">
                    <TextField type="file" label="Anexos" InputLabelProps={{shrink: true}} fullWidth inputRef={el => (fileRefs.current[i] = el)}
                               onChange={e => setData('anexos', {...data?.anexos, [i]: e.target.files[0]})}/>
                </div>
            )
        }
        return a
    }

    function submit(e) {
        e.preventDefault()
        router.post(route('integrador.pedidos.pedido-instalacao.store'), {...data})
    }

    router.on('success', () => {
        setData({instalacao_id: anotacoes.id, titulo: '', msg: '', anexos: []})
        fileRefs.current.forEach(ref => {
            if (ref) ref.value = '';
        });
    })

    return (
        <Layout titlePage="Instalação" menu="pedidos">
            <CardContainer>
                <CardTitle title="Anotações da Instalação" icon={<ListAlt size={16} color="black"/>}/>
                {anotacoes?.pedido && (
                    <CardBody>
                        {anotacoes?.anotacoes?.map(anotacao =>
                            <CardContainer key={anotacao.id}>
                                <CardBody>
                                    <div className="row">
                                        <div className="col">
                                            <Stack spacing={1}>
                                                <CampoTexto titulo="Autor" texto={anotacao.autor.nome} bold/>
                                                <CampoTexto titulo="Título" texto={anotacao.titulo} bold/>
                                                <CampoTexto titulo="Mensagem" texto={anotacao.mensagem}/>
                                            </Stack>
                                            <Stack marginTop={3} spacing={2} direction="row">
                                                {anotacao?.anexos?.map(anexos => <div><ImagePdf url={anexos.url} urlRaiz/></div>)}
                                            </Stack>
                                        </div>
                                    </div>

                                </CardBody>
                            </CardContainer>
                        )}
                    </CardBody>
                )}
            </CardContainer>

            <form onSubmit={submit}>
                <CardContainer>
                    <CardTitle title="Adicionar Anotações" icon={<Pencil size={16} color="black"/>}/>
                    <CardBody>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Título" fullWidth required value={data.titulo}
                                           onChange={e => setData('titulo', e.target.value)}/>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Mensagem" multiline rows="4" fullWidth required value={data.msg}
                                           onChange={e => setData('msg', e.target.value)}/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-auto"><span className="me-4">Anexos</span></div>
                            <div className="col-auto"><RemoveIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => e > 1 ? --e : 1)}/></div>
                            <div className="col-auto"><span><b>{qtdAnexos}</b></span></div>
                            <div className="col-auto"><AddIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => ++e)}/></div>
                        </div>
                        <div className="row row-cols-3">
                            {anesxos()}
                        </div>
                        <button className="btn btn-success mt-4">Salvar</button>
                    </CardBody>
                </CardContainer>
            </form>
        </Layout>
    )
}
export default Page



