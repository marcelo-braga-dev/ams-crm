import PersonIcon from "@mui/icons-material/Person";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import React from "react";

export default function InfoLead({dado}) {
    return (
        <table className="m-2">
            <tbody>
            <tr>
                <td><PersonIcon sx={{fontSize: 25}}/></td>
                <td>
                    <span className="d-block"
                          style={{fontSize: 14}}><b>{dado.name}</b></span>
                    <span style={{fontSize: 15}}>{dado.razao_social}</span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <small className="me-4">ID: #{dado.id}</small>
                    <small className="me-4">{dado.data_criacao}</small>
                </td>
            </tr>
            {dado.cnpj && <tr>
                <td>
                    <AssignmentOutlinedIcon sx={{fontSize: 18}}/>
                </td>
                <td>
                    <span className="d-block">CNPJ: {dado.cnpj}</span>
                </td>
            </tr>}
            {dado.telefone && <tr>
                <td>
                    <LocalPhoneOutlinedIcon sx={{fontSize: 18}}/>
                </td>
                <td>
                    <span className="d-block">{dado.telefone}</span>
                </td>
            </tr>}

            {(dado.cidade || dado.estado) && <tr>
                <td>
                    <FmdGoodOutlinedIcon sx={{fontSize: 18}}/>
                </td>
                <td>
                    <span className="d-block">{dado.cidade} {dado.estado &&
                    <span>- {dado.estado}</span>}</span>
                </td>
            </tr>}
            </tbody>
        </table>
    )
}
