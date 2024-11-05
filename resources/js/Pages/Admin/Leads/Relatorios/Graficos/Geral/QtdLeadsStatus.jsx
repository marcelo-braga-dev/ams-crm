import {Bar} from "react-chartjs-2";
import React from "react";

export default function QtdLeadsStatus({nomes, qtd}) {

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Qtd.",
                backgroundColor: "rgba(0,0,255,0.5)",
                // borderColor: "rgb(255, 99, 132)",
                data: qtd,
            }
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
                text: 'Status dos atendimentos',
            },
        },
    };

    return (
        <Bar options={options} data={data}/>
    )
}
