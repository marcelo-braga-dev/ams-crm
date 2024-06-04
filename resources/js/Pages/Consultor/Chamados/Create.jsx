import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {TextField} from "@mui/material";
import {useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";

export default function ({pedido}) {
    const [qtdAnexos, setQtdAnexos] = useState(2)

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
        router.post(route('consultor.chamados.store'), {...data})
    }

    return (
        <Layout titlePage="Cadastrar SAC" empty menu="sac-chamados">
            <form onSubmit={submit}>
                <div className="card card-body mb-4">
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
                </div>

                <div className="card card-body mb-4">
                    <div className="row mb-3">
                        <div className="col-auto"><span className="me-4">Anexos</span></div>
                        <div className="col-auto"><RemoveIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => e > 1 ? --e : 1)}/></div>
                        <div className="col-auto"><span><b>{qtdAnexos}</b></span></div>
                        <div className="col-auto"><AddIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => ++e)}/></div>
                    </div>
                    <div className="row row-cols-3">
                        {anesxos()}
                    </div>
                </div>
                <button className="btn btn-primary">Salvar</button>
            </form>

        </Layout>
    )
}
