import logo from './logo.svg';
import './App.css';
import flashcardsData from './data/flashcards.json'
// instead of importing all of react:
// import{ only, what, we, need} from 'react'
import { useState} from 'react';

const App = () => {
  // array destructuring is shorthand for giving a var name to indexed items:
  // const flashcardsStatePair = useState(flashcardsData)
  // const flashcards = flashcardsStatePair[0]
  // const setFlashcards = flashcardsStatePair[1]
  const [flashcards, setFlashcards] = useState(flashcardsData)

  const handleFlipCardClick = (event, selectedIdx) =>{
    // console.log("clicked");
    const updatedCards = flashcards.map((card, i) => {
      // this modifies the original card object, so it can cause unintended side effects
      if (i === selectedIdx) {
        return{
        // spread operator to clone/copy all of the current card data
          ...card,
          // change/add "flipped" property on the new (duplicated) object
          flipped: !card.flipped
        // card.flipped = !card.flipped
        }
      }
      return card
    })
    // if we don't pass in a new array, react won't re-render
    // that's why we can't use '.push'
    setFlashcards(updatedCards)
}
// Using classes to conditionally display front or back of cards
  // return (
  //   <div className="App">
  //     <header sytle={{ textAlign: 'center'}}>
  //       <h1>Programming Flash Cards</h1>
  //       <hr />
  //     </header>

  //     <main className="flex-row flex-wrap">
  //       {flashcards.map((card, i )=> {
  //         const classes = ["card"]
  //         // conditionally add "flipped" class to our cards
  //         if(card.flipped){
  //           classes.push("flipped")
  //         }
  //         // key (on line 17) should be an id if available(e.g using primary key id as the key property)
  //         return(
  //           <section key={i} className={classes.join("")} onClick ={event => handleFlipCardClick(event, i)}>
  //             <h3>{card.category}</h3>
  //             <p>{card.front}</p>
  //             <p>{card.back}</p>
  //           </section>
  //         )
  //       })}
  //     </main>

  //   </div>
  // );
// Using conditional rendering to display front/back of card
  return (
    <div className='container'>
      <header style={{textAlign: 'center'}}>
        <h1>Programming Flash Cards</h1>
          <hr/>
      </header>
      <main className='flex-row flex-wrap'>
        {flashcards.map((card,i)=>{
          return (
            <section key={i} className="card" onClick={(event)=>{ handleFlipCardClick(event, i);}} >
                  <h3>{card.category}</h3>
                  {/* since we are already in JSX return, we use a ternary since a ternary can specify a return value
                  condition? 'return this if true': 'return this if false'*/}
                  {card.flipped? (<p>{card.back}</p>) : (<p>{card.front}</p>)}
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
