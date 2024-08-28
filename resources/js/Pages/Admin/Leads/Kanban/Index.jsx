import Layout from "@/Layouts/Layout.jsx";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";
import CardKanbanLeads from "@/Pages/Admin/Leads/Kanban/Components/CardKanbanLeads.jsx";
import ScrollContainer from "react-indiana-drag-scroll";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

const Page = ({registros}) => {

    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField label="Representante" select fullWidth>
                        <MenuItem value={1}>Vendedor 1</MenuItem>
                        <MenuItem value={2}>Vendedor 2</MenuItem>
                        <MenuItem value={3}>Vendedor 3</MenuItem>
                    </TextField>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ScrollContainer>
                        <table>
                            <thead>
                            <tr>
                                {Object.values(registros).map(item => (
                                    <th key={item.status} className=" ps-2"
                                        style={{width: 300}}>
                                        <div className={styleCard} style={{backgroundColor: item.status_dados?.cor ?? 'black'}}>
                                            <div className='col-auto'>
                                                <Typography>{item.status_dados?.nome}</Typography>
                                            </div>
                                            <div className='col-auto'>Qdt: {item?.items?.length}</div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                {Object.keys(registros).map(statusKey => {
                                        const statusGroup = registros[statusKey];
                                        return (
                                            <td key={statusKey} style={{padding: 10}}>
                                                {statusGroup.items?.map(item => <CardKanbanLeads key={item.id} item={item}/>)}
                                            </td>
                                        )
                                    }
                                )}
                            </tr>
                            </tbody>
                        </table>
                    </ScrollContainer>
                </div>

            </div>
        </Layout>
    )
}
export default Page
