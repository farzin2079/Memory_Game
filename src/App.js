import { useEffect, useState } from 'react';
import './App.css';
import SingelCard from './component/singelCard';

const cardImage = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const  shuffelCards = () => {
    const shuffeledCards = [...cardImage, ...cardImage]
      .sort( () => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffeledCards);
      setTurns(0);
  }

  const handelChoices = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurn => prevTurn + 1 )
      setDisabled(false)
  }

  useEffect(() => {

    if(choiceTwo && choiceOne){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
          setCards( prevCards => {
            return prevCards.map( (card) => {
              if(card.src === choiceOne.src) {
                return {...card, matched: true};
              } else {
                return card;
              }
            })
          })
          resetTurn()
        } else {
        setTimeout(() => resetTurn(), 1000); 
        }
    }

  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffelCards()
  }, [])
  return (
    <div className="App">
     <h1> Memory Game</h1>
     <button onClick={shuffelCards}> New Game </button>

      <div className="card-grid">
    {cards.map( card => (
      <SingelCard 
      key={card.id} 
      card={ card }  
      handelChoices={handelChoices} 
      flipped={card === choiceOne || card === choiceTwo || card.matched}
      disabled={disabled}
      />
    ))}
      </div>
      <p> turns: { turns }</p>
    </div>
  );
}

export default App;
