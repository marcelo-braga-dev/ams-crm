import {Bar} from "react-chartjs-2";
import React from "react";
import {convertMoneyFloat} from "@/Helpers/converterDataHorario";

export default function MetasAtingidas({items, dados, vendasMensalUsuario}) {

    const meses = items.map((item) => {
        return item.abv ?? ''
    })
    const metas = items.map((item) => {
        return convertMoneyFloat(dados.metas?.[item.abv] ?? 0)
    })
    const atingida = items.map((item) => {
        return vendasMensalUsuario[item.abv]?.vendas ?? 0
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
