import React from "react";
import {Bar} from "react-chartjs-2";
import "chart.js/auto";

export default function TopLeadsGrafico({leads, dados, vendasLeadsComp}) {

    const nomes = leads.map(item => (item.lead_nome + ' [#' + item.lead_id + ']') ?? '?')
    const qtdVendas = leads.map(item => dados?.[item.lead_id]?.valor ?? 0)
    const qtdVendasComp = leads.map(item => vendasLeadsComp?.[item.lead_id]?.valor ?? 0)

    const colunas = [
        {
            label: "Total vendas por Lead",
            data: qtdVendas,
            backgroundColor: "#1128b8",
        }
    ]

    vendasLeadsComp.length !== 0 && colunas.push({
        label: "Total vendas por Lead Comparado",
        data: qtdVendasComp,
        backgroundColor: "#eabe0b",
    })

    const data = {
        labels: nomes,
        datasets: colunas
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

    return <Bar options={options} data={data} height={100}/>
}
