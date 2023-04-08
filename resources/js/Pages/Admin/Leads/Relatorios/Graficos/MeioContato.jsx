import {Bar} from "react-chartjs-2";
import React from "react";

export default function QtdAtendimento({dados}) {

    const data = {
        labels: [
            'Atendido: ' + dados.atendido,
            'Não Encontrado: ' + dados.nao_encontrado,
            'Não Interessado: ' + dados.nao_interessado,
            'Lig. Realizado: ' + dados.ligacao_realizada,
            'Sem Retorno: ' + dados.sem_retorno,
            'Finalizado: ' + dados.finalizado,
        ],
        datasets: [
            {
                label: "Qtd.",
                backgroundColor: "#3bbd0d",
                // borderColor: "rgb(255, 99, 132)",
                data: [
                    dados.atendido,
                    dados.nao_encontrado,
                    dados.nao_interessado,
                    dados.ligacao_realizada,
                    dados.sem_retorno,
                    dados.finalizado
                ],
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
                display: true,
                text: 'Status dos atendimentos',
            },
        },
    };

    return (
        <Bar options={options} data={data}/>
    )
}
