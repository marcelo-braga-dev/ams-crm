import React, {useState, useEffect} from 'react';
import './App.css';

import AMS from './Images/AMS.png';
import img1 from './Images/CLAMPER.png';
import img2 from './Images/COIN.jpg';
import img3 from './Images/DEYE.png';
import img4 from './Images/GROWATT.png';
import img5 from './Images/HELIUS.png';
import img6 from './Images/HONOR SOLAR.png';
import img7 from './Images/OSDA.png';
import img8 from './Images/SOLIS.png';
import {Typography} from "@mui/material";

const initialCards = [
    {id: 1, content: 'A', matched: false, img: img1},
    {id: 2, content: 'B', matched: false, img: img2},
    {id: 3, content: 'C', matched: false, img: img3},
    {id: 4, content: 'D', matched: false, img: img4},
    {id: 5, content: 'E', matched: false, img: img5},
    {id: 6, content: 'F', matched: false, img: img6},
    {id: 7, content: 'G', matched: false, img: img7},
    {id: 8, content: 'H', matched: false, img: img8},
    {id: 9, content: 'A', matched: false, img: img1},
    {id: 10, content: 'B', matched: false, img: img2},
    {id: 11, content: 'C', matched: false, img: img3},
    {id: 12, content: 'D', matched: false, img: img4},
    {id: 13, content: 'E', matched: false, img: img5},
    {id: 14, content: 'F', matched: false, img: img6},
    {id: 15, content: 'G', matched: false, img: img7},
    {id: 16, content: 'H', matched: false, img: img8},
];

const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};

const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);

    useEffect(() => {
        setCards(shuffleCards([...initialCards]));
    }, []);
    let cardClicado
    const [cardAtual, setCardAtual] = useState()
    const handleCardClick = (index) => {

        if (flippedCards.length === 2 || flippedCards.includes(index) || cards[index].matched || cardAtual === index) return;

        setCardAtual(index)

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstIndex, secondIndex] = newFlippedCards;
            if (cards[firstIndex].content === cards[secondIndex].content) {
                const newCards = [...cards];
                newCards[firstIndex].matched = true;
                newCards[secondIndex].matched = true;
                setCards(newCards);
                setMatchedPairs(matchedPairs + 1);
            }
            setCardAtual()
            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    return (<>
            {!!matchedPairs && <Typography>VOCÊ GANHOU</Typography>}
            <div className="game-board">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${flippedCards.includes(index) || card.matched ? 'flipped pe-none' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-content">
                            {flippedCards.includes(index) || card.matched ? <img src={card.img} alt="card"/> : <img src={AMS} alt="card"/>}
                        </div>
                    </div>
                ))}

                {matchedPairs === initialCards.length / 2 && <div className="win-message">Você venceu!</div>}
            </div>
        </>
    );
};

export default Game;
