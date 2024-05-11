import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Sdr from "./Graficos/Sdr";
import Status from "./Graficos/Status";
import {useState} from "react";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import * as React from "react";

export default function ({status, sdr}) {
    const [registrosSdr, setRegistrosSdr] = useState([])
    const [mesesSelecionado, setMesesSelecionado] = useState([]);
    const [anoSelecionado, setAnoSelecionado] = useState(2024);

    function getDados(id) {
        axios.get(route('admin.dashboard.leads.relatorio', {id: id}))
            .then(res => setRegistrosSdr(res.data.sdr))
    }

    return (
        <Layout titlePage="Indicadores de Leads" menu="dashboard" submenu="dashboard-leads">
            <div className="card card-body mb-4">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <SelectMesesMultiples value={mesesSelecionado} useState={setMesesSelecionado} />
                    </div>
                    <div className="col-md-2">
                        <TextField select fullWidth label="Ano"
                                   onChange={e => setAnoSelecionado(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2023">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <TextField select fullWidth label="Usuário"
                                   onChange={e => getDados(e.target.value)}>
                            {sdr.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        {registrosSdr.length > 0 ? <Sdr dados={registrosSdr}/> : 'Nenhum registro encontrado.'}
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <span>Status Total</span>
                        <Status dados={status}/>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
