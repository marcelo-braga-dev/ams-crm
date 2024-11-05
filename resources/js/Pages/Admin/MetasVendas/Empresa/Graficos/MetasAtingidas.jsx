import {Bar} from "react-chartjs-2";
import React from "react";
import {convertMoneyFloat} from "@/Helpers/converterDataHorario";

const meses = [
    {mes: '1', nome: 'Janeiro'},
    {mes: '2', nome: 'Fevereiro'},
    {mes: '3', nome: 'Março'},
    {mes: '4', nome: 'Abril'},
    {mes: '5', nome: 'Maio'},
    {mes: '6', nome: 'Junho'},
    {mes: '7', nome: 'Julho'},
    {mes: '8', nome: 'Agosto'},
    {mes: '9', nome: 'Setembro'},
    {mes: '10', nome: 'Outubro'},
    {mes: '11', nome: 'Novembro'},
    {mes: '12', nome: 'Dezembro'},
]

export default function MetasAtingidas({metasMensais, vendasMensais}) {

    const mesesNome = meses.map((item) => {
        return item.nome ?? ''
    })
    const metas = meses.map((item) => {
        return metasMensais[item.mes] ?? 0
    })
    const atingida = meses.map((item) => {
        return vendasMensais[item.mes]?.vendas ?? 0
    })


    const data = {
        labels: mesesNome,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#0000FFaa",
                data: metas,
            }, {
                label: "Alcançado",
                backgroundColor: "green",
                data: atingida,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    return (
        <Bar height={80} options={options} data={data}/>
    )
}
