import Layout from "@/Layouts/Layout";
import {Grid, TextField} from "@mui/material";
import {useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function ({pedido}) {
    const [qtdAnexos, setQtdAnexos] = useState(2)
    const [avaria, setAraria] = useState(false)

    const {data, setData} = useForm({
        pedido_id: pedido
    })

    const anesxos = () => {
        let a = [];
        for (let i = 1; i <= qtdAnexos; i++) {
            a.push(
                <div key={i} className="col-md-4 mb-4">
                    <TextField type="file" label="Anexos" InputLabelProps={{shrink: true}} fullWidth
                               onChange={e => setData('anexos', {...data?.anexos, [i]: e.target.files[0]})}/>
                </div>
            )
        }
        return a
    }

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.chamados.store'), {...data})
    }

    return (
        <Layout titlePage="Abrir SAC" empty menu="sac" submenu="sac-chamados">
            <form onSubmit={submit}>
                <CardContainer>
                    <CardBody>
                    <div className="row mb-4">
                        <div className="col">
                            <TextField label="Título" fullWidth required onChange={e => setData('titulo', e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <TextField label="Mensagem" multiline rows="4" fullWidth required
                                       onChange={e => setData('msg', e.target.value)}/>
                        </div>
                    </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                    <Grid container spacing={3}>
                        <Grid item md={3} marginBottom={2}>
                            <FormControlLabel label="Avarias?" control={
                                <Switch checked={avaria} onChange={e => setAraria(e.target.checked)}/>}/>
                        </Grid>
                    </Grid>

                    {avaria && <>
                        <Grid container spacing={3}>
                            <Grid item md={4} marginBottom={3}>
                                <TextField label="Número da Nota Fiscal" required fullWidth onChange={e => setData('nota', e.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item md={3} marginBottom={3}>
                                <FormControlLabel label="Foi agendado a entrega?" control={
                                    <Switch onChange={e => setData('entrega_agendada', e.target.checked)}/>}/>
                            </Grid>
                            <Grid item md={3} marginBottom={3}>
                                <FormControlLabel label="Material estava paletizado?" control={
                                    <Switch onChange={e => setData('paletizado', e.target.checked)}/>}/>
                            </Grid>

                            <Grid item md={3} marginBottom={3}>
                                <FormControlLabel label="Produtos Quebrados/Danificados?" control={
                                    <Switch onChange={e => setData('produtos_quebrados', e.target.checked)}/>}/>
                            </Grid>

                            <Grid item md={3} marginBottom={3}>
                                <FormControlLabel label="Falta de Produtos?" control={
                                    <Switch onChange={e => setData('produtos_faltam', e.target.checked)}/>}/>
                            </Grid>
                        </Grid>


                        <Grid container spacing={3}>
                            <Grid item>
                                <TextField type="file" label="Imagem Ressalva no Ct-e (conhecimento de transporte ou na NF)"
                                           InputLabelProps={{shrink: true}} fullWidth required
                                           onChange={e => setData('img_cte', e.target.files[0])}/>
                            </Grid>
                            <Grid item>
                                <TextField type="file" label="Imagem da Entrega" InputLabelProps={{shrink: true}} fullWidth required
                                           onChange={e => setData('img_entrega', e.target.files[0])}/>
                            </Grid>
                            {data?.produtos_quebrados &&
                                <Grid item>
                                    <TextField type="file" label="Imagem do Produto Danificado" InputLabelProps={{shrink: true}} fullWidth required
                                               onChange={e => setData('img_produto', e.target.files[0])}/>
                                </Grid>
                            }
                        </Grid>
                    </>}
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                    <div className="row mb-3">
                        <div className="col-auto"><span className="me-4">Anexos</span></div>
                        <div className="col-auto"><RemoveIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => e > 1 ? --e : 1)}/></div>
                        <div className="col-auto"><span><b>{qtdAnexos}</b></span></div>
                        <div className="col-auto"><AddIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => ++e)}/></div>
                    </div>
                    <div className="row row-cols-3">
                        {anesxos()}
                    </div>
                    </CardBody>
                </CardContainer>
                <button className="btn btn-primary">Salvar</button>
            </form>
        </Layout>
    )
}
