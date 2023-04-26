import React, {useState} from "react";
import $ from 'jquery';

export default function ScrollControlHorizontal({lateral = null}) {

// Função que faz o scroll suave
    function scrollSuave(old, des, atu, ele) {
        let easeOutCubic = function (t) {
            return (--t) * t * t + 1
        };
        atu += 0.5; // move de 1 em 1 pixel. Aumentando o valor, irá aumentar a velocidade
        let ease = easeOutCubic(atu / 100);
        let del = des - old;
        del *= ease;
        del += old;
        ele.scrollTo(del, 0);

        if (atu < 30) {
            window.requestAnimationFrame(function () {
                scrollSuave(old, des, atu, ele);
            });
        }
    }

    function toggleBtn(posicaoFinal, posicaoAtual, larguraTabela) {
        // Botao Direito
        if (posicaoAtual > larguraTabela) $('.btn-scroll-right').removeClass('btn-dark');
        else $('.btn-scroll-right').addClass('btn-dark');

        // Botao Esquerdo
        if (posicaoFinal < 10) $('.btn-scroll-left').removeClass('btn-dark');
        else $('.btn-scroll-left').addClass('btn-dark');
    }

    function moveScroll(idx) {
        const element = document.getElementById("scrollControlHorizontal");
        const ccs_s = element.scrollLeft;
        const larguraTabela = element.querySelector("table").offsetWidth;
        const wid = element.querySelector("th").offsetWidth;
        const posicaoFinal = idx === 1 ? wid + ccs_s : ccs_s - wid;
        const posicaoAtual = element.scrollLeft + element.offsetWidth;

        toggleBtn(posicaoFinal, posicaoAtual, larguraTabela);
        scrollSuave(ccs_s, posicaoFinal, 0, element);
    }

    if (lateral === 'e') {
        return (
            <div className="row h-100"
                 onMouseEnter={() => moveScroll(0)}
                 onClick={() => moveScroll(0)}>

                <div className="col" style={{minHeight: '100%'}}>
                    <button className="btn btn-scroll-left" type="button">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        )
    }
    if (lateral === 'd') {
        return (
            <div className="row h-100"
                 onMouseEnter={() => moveScroll(1)}
                 onClick={() => moveScroll(1)}>
                <div className="col">
                    <button className="btn btn-dark btn-scroll-right" type="button">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        )
    }

    return <>
        <button className="btn btn-dark mx-2 btn-scroll-left" onClick={() => moveScroll(0)} type="button">
            <i className="fas fa-arrow-left"></i>
        </button>
        <button className="btn btn-dark mx-2 btn-scroll-right" onClick={() => moveScroll(1)}>
            <i className="fas fa-arrow-right"></i>
        </button>
    </>
}
