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
                backgroundColor: "#3bbd0daa",
                data: meta,
            }, {
                label: "Venda",
                backgroundColor: "#0000FFaa",
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
