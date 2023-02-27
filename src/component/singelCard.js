import './singleCard.css';

export default function SingelCard({ card, handelChoices, flipped, disabled}) {

    const handelClick = () => {
      if(!disabled){

        handelChoices(card);
        
      }
    }

  return (
    <div className="card">  
        <div className={flipped ? 'flipped' : ""} >
          <img src={card.src} alt="card front" className="front" />
          <img src="/img/cover.png" alt="card back" className="back" onClick={handelClick}/>
        </div>
      </div>
      )}