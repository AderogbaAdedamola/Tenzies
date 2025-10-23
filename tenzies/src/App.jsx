import Die from "./Die"
import {useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Footer from "./Footer"

function App() {
  const [diceValue, setDiceValue] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)
  
  let gameWon = diceValue.every(die => die.isHeld && die.value === diceValue[0].value)
  useEffect(() => {
    buttonRef.current.focus()
  },[gameWon])

  function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          })
          )
  }
  
  /** map over dice here */
    const diceElements = diceValue.map((dieObj) => <Die 
      value={dieObj.value} 
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      hold={() => hold(dieObj.id)}
      />
    )
    
     
    function rollDice(){
        setDiceValue(oldDice => oldDice.map(die => 
          die.isHeld ? 
          die : 
          {...die, value : Math.ceil(Math.random() * 6)}
        ))
    }
    function newGame(){
         setDiceValue(generateAllNewDice())
  
    }
    function hold(id) {
      setDiceValue(oldDice => oldDice.map(die =>
          die.id === id ?
              { ...die, isHeld: !die.isHeld } :
              die
      ))
    }
  return (
    <>
      <main className="game-background">
        {gameWon && <Confetti />}
         <div aria-live="polite" className="sr-only">
            {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
         </div>
        <h1 className="title">Tenzies{gameWon && "! 🏆"}</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
         {diceElements}
        </div>
        <button 
          onClick={gameWon ? newGame : rollDice}
          ref={buttonRef}
          className="roll-dice"
          >
             {gameWon ? "New Game" : "Roll "}
        </button>
      </main>
      <Footer />
    </>
  )
}

export default App
