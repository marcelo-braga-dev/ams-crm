import {Bar} from "react-chartjs-2";
import React from "react";
import {convertMoneyFloat} from "@/Helpers/converterDataHorario";

export default function MetasAtingidas({metasAnual, vendasAnual}) {

    const mesesRegistros = [
        {mes: 1, nome: 'jan'},
        {mes: 2, nome: 'fev'},
        {mes: 3, nome: 'mar'},
        {mes: 4, nome: 'abr'},
        {mes: 5, nome: 'mai'},
        {mes: 6, nome: 'jun'},
        {mes: 7, nome: 'jul'},
        {mes: 8, nome: 'ago'},
        {mes: 9, nome: 'set'},
        {mes: 10, nome: 'out'},
        {mes: 11, nome: 'nov'},
        {mes: 12, nome: 'dev'},
    ]

    const meses = mesesRegistros.map((item) => {
        return item.mes ?? ''
    })

    const metas = mesesRegistros.map((item) => {
        return metasAnual?.[item.nome] ?? 0
    })

    const atingida = mesesRegistros.map((item) => {
        return vendasAnual?.[item.nome] ?? 0
    })


    const data = {
        labels: meses,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#0000FFaa",
                data: metas,
            }, {
                label: "Alcançado",
                backgroundColor: "rgba(229,210,4)",
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
