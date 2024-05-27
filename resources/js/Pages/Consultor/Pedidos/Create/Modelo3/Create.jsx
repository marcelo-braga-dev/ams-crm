import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import Form from "./Partials/Form";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

export default function Create({fornecedores, lead, endereco}) {

    return (
        <Layout empty menu="pedidos" container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>
            <div className="card card-body mb-4">
                <span><b>Cliente:</b> {lead.nome} (#{lead.id})</span>
            </div>

            <div className="card card-body mb-4">
                <div className="row mb-4">
                    <div className="col-md-4">
                        <TextField label="Estrutura" select fullWidth>
                            <MenuItem value={1}>Telha Colonial</MenuItem>
                            <MenuItem value={2}>Paraf. Estrutura Madeira</MenuItem>
                            <MenuItem value={3}>Paraf. Estrutura Metal</MenuItem>
                            <MenuItem value={4}>Perfil 55cm</MenuItem>
                            <MenuItem value={5}>Ondulada</MenuItem>
                            <MenuItem value={6}>Laje</MenuItem>
                            <MenuItem value={7}>Telha Metálica Zipada</MenuItem>
                            <MenuItem value={8}>Sem Estrutura</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Tensão" select fullWidth>
                            <MenuItem value={1}>220V/Bifásico</MenuItem>
                            <MenuItem value={2}>220V/Trifásico</MenuItem>
                            <MenuItem value={2}>380V/Bifásico</MenuItem>
                            <MenuItem value={4}>380V/Trifásico</MenuItem>
                        </TextField>
                    </div>

                    <div className="col-md-3">
                        <TextField label="Direção Instalação" select fullWidth>
                            <MenuItem value={1}>Norte</MenuItem>
                            <MenuItem value={2}>Leste</MenuItem>
                            <MenuItem value={3}>Oeste</MenuItem>
                            <MenuItem value={4}>Sul</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <TextField
                            label="Média Consumo"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">kW/h</InputAdornment>,
                            }}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}









