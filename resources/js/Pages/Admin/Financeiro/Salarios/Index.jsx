import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, TextField } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { router } from "@inertiajs/react";

export default function ({ usuarios, setores, setor }) {
    function selecionarSetor(setorSelecionado) {
        router.get(route('admin.financeiro.salarios.index'), { setor: setorSelecionado })
    }

    return (
        <Layout titlePage="Salários" menu="financeiro" submenu="financeiro-salarios">
            <div className="row">
                <div className="mb-4 col-md-2">
                    <TextField label="Setor" select fullWidth defaultValue={setor}
                        onChange={e => selecionarSetor(e.target.value)}>
                        <MenuItem>Todos</MenuItem>
                        {setores.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                    </TextField>
                </div>
            </div>

            <List>
                {usuarios.map((item) => {
                    return (
                        <ListItem key={item.id} className="border-bottom">
                            <ListItemButton href={route('admin.financeiro.salarios.edit', item.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={item.nome} src={item.foto} />
                                </ListItemAvatar>
                                <ListItemText primary={item.nome} secondary={
                                    <>
                                        {item.franquia}<br />
                                        {item.setor}<br />
                                        {item.funcao}<br />
                                    </>
                                } />
                                <button className="btn btn-primary">Ver</button>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Layout>
    )
}
