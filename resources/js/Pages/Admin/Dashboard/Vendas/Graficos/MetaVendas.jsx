import {Bar} from "react-chartjs-2";
import React from "react";

export default function MetaVendas({dados}) {

    const nomes = dados.map((item) => {
        return item.nome
    })
    const meta = dados.map((item) => {
        return item.meta
    })
    const venda = dados.map((item) => {
        return item.vendas
    })

    const data = {
        labels: nomes,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#3bbd0d",
                // borderColor: "rgb(255, 99, 132)",
                data: meta,
            },{
                label: "Venda",
                backgroundColor: "rgba(0,0,255,0.7)",
                // borderColor: "rgb(255, 99, 132)",
                data: venda,
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
        <Bar options={options} data={data}/>
    )
}
