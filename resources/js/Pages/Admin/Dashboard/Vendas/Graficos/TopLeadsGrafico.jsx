import React from "react";
import { Pie, Bar } from "react-chartjs-2";

export default function TopLeadsGrafico({ dados }) {

    const qtdVendas = dados.map(item => item.valor)
    const estados = dados.map(item => (item.lead_nome + ' [#' + item.lead_id + ']') ?? '?')

    const data = {
        labels: estados,
        datasets: [
            {
                label: "Total vendas por Lead",
                data: qtdVendas,
                backgroundColor: "#1128b8",
            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false // Hide X axis labels
            }
        }
    };

    return (
        <Bar options={options} data={data}
            height={100} />
    )
}
