import React from "react";
import {Pie, Bar} from "react-chartjs-2";

export default function VendasMensasPie({dados}) {

    const vendas = dados.map(item => item.mes != 'total' ? item.total_vendas : null)
    const metas = dados.map(item => item.mes != 'total' ? item.total_metas : null)
    const meses = dados.map(item => item.mes != 'total' ? item.mes : null)

    const data = {
        labels: meses,
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
             height={200}/>
    )
}
