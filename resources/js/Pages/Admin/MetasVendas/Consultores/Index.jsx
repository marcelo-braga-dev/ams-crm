import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {ListItemButton} from "@mui/material";

export default function ({usuarios}) {
    return (
        <Layout container titlePage="Metas de Vendas" menu="menu-meta-vendas" submenu="meta-vendas">
            <List>
                {usuarios.map((item) => {
                    return (
                        <ListItem key={item.id} className="border-bottom">
                            <ListItemButton href={route('admin.metas-vendas.consultores.edit', item.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={item.nome} src={item.foto}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.nome} secondary={
                                    <>
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
