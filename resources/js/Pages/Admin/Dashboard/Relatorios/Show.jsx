import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function () {

    return (
        <Layout titlePage="Relatórios" menu="dashboard" submenu="dashboard-relatorios"
            voltar={route('admin.dashboard.relatorios.index')}>
            <div className="card card-body mb-4">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <TextField label="Telas/Gráficos" select fullWidth>
                            <MenuItem></MenuItem>
                        </TextField>
                    </div>
                    <div className="col-auto">
                        <a className="btn btn-primary" href={route('admin.dashboard.relatorios.create')}>Cadastrar</a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
