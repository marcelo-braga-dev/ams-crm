import React from "react";
import {Pie, Bar} from "react-chartjs-2";

export default function VendasMensasPie({dados}) {

    const vendas = dados.map(item => item.total_vendas)
    const metas = dados.map(item => item.total_metas)

    const data = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
            {
                label: "Metas",
                data: metas,
                backgroundColor: "#3b087a",
            },{
                label: "Vendas",
                data: vendas,
                backgroundColor: "#177a08",
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
        <Bar options={options} data={data}
             height={500} width={500}/>
    )
}
