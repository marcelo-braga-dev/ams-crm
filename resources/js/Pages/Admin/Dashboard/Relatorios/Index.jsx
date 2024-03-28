import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

export default function ({graficos}) {
    const [graficoSelecionado, setGraficoSelecionado] = useState('')

    const fullscream = graficoSelecionado
        .replace(/width="600"|width="800"|width="1024"/, 'width="100%"')
        .replace(/height="373.5"|height="486"|height="636|height="836"|height="612"|height="804"/, 'height="1060"')

    return (
        <Layout titlePage="Relatórios" menu="dashboard" submenu="dashboard-relatorios">
            <div className="card card-body mb-4">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <TextField label="Telas/Gráficos" select fullWidth
                                   onChange={e => setGraficoSelecionado(e.target.value)}>
                            {graficos.map(item => <MenuItem value={item.codigo}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-auto">
                        <a className="btn btn-primary"
                           href={route('admin.dashboard.relatorios.create')}>Configurações</a>
                    </div>
                </div>
            </div>

            <div className="text-center" dangerouslySetInnerHTML={{__html: fullscream}}></div>
        </Layout>
    )
}
