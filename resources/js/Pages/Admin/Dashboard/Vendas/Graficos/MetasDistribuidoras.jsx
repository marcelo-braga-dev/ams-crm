import {Bar} from "react-chartjs-2";
import "chart.js/auto";
import React from "react";

export default function MetasDistribuidoras({vendasDistribuidoras, metas}) {

    const mesesNomes = vendasDistribuidoras?.map(item => item?.fornecedor_nome)
    const metasMensal = 0
    const atingida = vendasDistribuidoras?.map(item => item?.valor)

    const data = {
        labels: mesesNomes,
        datasets: [
            {
                label: "Alcançado",
                backgroundColor: "orange",
                data: atingida,
            },
            {
                label: "Meta",
                backgroundColor: "#0000FFaa",
                data: metasMensal,
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
