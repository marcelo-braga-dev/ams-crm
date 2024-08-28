import Layout from "@/Layouts/Layout.jsx";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";
import CardKanbanLeads from "@/Pages/Admin/Leads/Kanban/Components/CardKanbanLeads.jsx";

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

            <table>
                <thead>
                <tr>
                    {Object.values(registros).map(item => (
                        <th key={item.status} className="sticky-top" id="th-3">
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
                <tr className="align-top bg-white">
                    {Object.keys(registros).map(statusKey => {
                            const statusGroup = registros[statusKey];
                            return (
                                <td key={statusKey} style={{minWidth: 300, padding: 10}}>
                                    {statusGroup.items?.map(item => <CardKanbanLeads key={item.id} item={item}/>)}
                                </td>
                            )
                        }
                    )}
                </tr>
                </tbody>
            </table>
        </Layout>
    )
}
export default Page
