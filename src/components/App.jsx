import React, { useState, useEffect } from "react";
import axios from "axios";

import CardList from './CardList.jsx';
import SubmitName from './SubmitName.jsx';
import LeaderBoard from "./LeaderBoard.jsx";
import "../styles/app.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardsFlipped, setCardsFlipped] = useState(0);
  const [choice1, setChoice1] = useState({});
  const [choice2, setChoice2] = useState({});
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showSubmitName, setShowSubmitName] = useState(false);

  const getAllCards = async () => {
    const res = await axios.get("/kanji");
    const allCards = res.data;
    const shuffledCards = allCards.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
  };

  const setNewGame = async () => {
    await getAllCards();
    setTurns(0);
    setCardsFlipped(0);
    setShowSubmitName(false);
  };

  const cardClickHandler = (card) => {
    if (card.flipped) return;
    card.flipped = true;
    setTurns(turns + 1);
    setChoices(card);
  };

  const setChoices = (card) => {
    turns % 2 === 1 ? setChoice1(card) : setChoice2(card);
  };

  const checkMatch = async () => {
    if (choice1.id && choice2.id) {
      if (choice1.meaning === choice2.meaning) {
        choice1.flipped = true;
        choice2.flipped = true;
        setCardsFlipped(cardsFlipped + 2)
        setChoice1({});
        setChoice2({});
      } else {
        setTimeout(() => {
          choice1.flipped = false;
          choice2.flipped = false;
          setChoice1({});
          setChoice2({});
        }, "600");
      }
    }
  };

  const displayLeaderBoard = () => {
    setShowLeaderBoard(!showLeaderBoard);
  };

  useEffect(() => {
    if (cardsFlipped > 0 && cardsFlipped === cards.length) setShowSubmitName(true);
  }, [cardsFlipped]);

  useEffect(() => {
    if (choice1.id && choice2.id) checkMatch();
  }, [choice1, choice2]);

  return (
    <div>
      <h1>Kanji Memory Game</h1>
      <button className="new-game-btn" onClick={setNewGame}>
        New Game
      </button>

      {showSubmitName && <SubmitName turns={turns} setShowSubmitName={setShowSubmitName} />}

      <CardList cards={cards} cardClickHandler={cardClickHandler} />

      {cards.length > 0 && (
        <div className="display-turns">
          <h2>Turns: {turns}</h2>
        </div>
      )}

      <button className="board-btn" onClick={displayLeaderBoard}>Leader Board</button>
      {showLeaderBoard && <LeaderBoard />}
    </div>
  );
};

export default App;
