import {Bar} from "react-chartjs-2";
import "chart.js/auto";
import React from "react";

export default function MetasAtingidas({vendas, metas, meses}) {

    const mesesNomes = meses.map(item => item.abv.toUpperCase())
    const metasMensal = meses.map(item => metas?.[item.mes])
    const atingida = meses.map(item => vendas?.[item.mes]?.vendas)

    const data = {
        labels: mesesNomes,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#0000FFaa",
                data: metasMensal,
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
        <Bar height={100} options={options} data={data}/>
    )
}
