import {Bar} from "react-chartjs-2";
import React from "react";

export default function QtdLeads({nomes, qtd}) {

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Qtd.",
                backgroundColor: "#0000FF",
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
