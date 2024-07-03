import React from "react";
import {Bar} from "react-chartjs-2";
import "chart.js/auto";

export default function DistribuidorasGrafico({dados}) {

    const nomes = dados.map(item => item.fornecedor_nome ?? '')
    const qtdVendas = dados.map(item => item.valor ?? 0)
    // const qtdVendasComp = leads.map(item => vendasLeadsComp?.[item.lead_id]?.valor ?? 0)

    const colunas = [
        {
            label: "Total vendas",
            data: qtdVendas,
            backgroundColor: "#29ca11",
        }
    ]

    // vendasLeadsComp.length !== 0 && colunas.push({
    //     label: "Total vendas por Lead Comparado",
    //     data: qtdVendasComp,
    //     backgroundColor: "#0d5505",
    // })

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

    return <Bar options={options} data={data} height={200}/>
}
