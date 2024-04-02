import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import ListItem from "@mui/material/ListItem";
import {ListItemButton} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import * as React from "react";

export default function ({usuarios}) {
    return (
        <Layout titlePage="Salários" menu="financeiro" submenu="financeiro-salarios">
            <List>
                {usuarios.map((item) => {
                    return (
                        <ListItem key={item.id} className="border-bottom">
                            <ListItemButton href={route('admin.financeiro.salarios.edit', item.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={item.nome} src={item.foto}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.nome} secondary={
                                    <>
                                        {item.franquia}<br/>
                                        {item.setor}<br/>
                                        {item.tipo}<br/>
                                    </>
                                }/>
                                <button className="btn btn-primary">Ver</button>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Layout>
    )
}
