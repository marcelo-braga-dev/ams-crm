import {Pie} from "react-chartjs-2";
import React from "react";

export default function QtdTipoAtendimento({dados}) {

    const data = {
        labels: [
            'Whatsapp: ' + (dados.whatsapp ?? 0),
            'Ligação: ' + (dados.ligacao ?? 0),
            'Email: ' + (dados.email ?? 0),
        ],
        datasets: [
            {
                label: "Qtd.",
                data: [dados.whatsapp, dados.ligacao, dados.email],
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
                text: 'Tipo Contato',
            },
        },
    };

    return (
        <Pie options={options} data={data}/>
    )
}
