import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { Cars } from './data/Cars'
import { Movies } from './data/Movies'
import { Cities } from './data/Cities'
import { Data, LetterState, } from './data/types'
import Letter from './Letter'
import { decode } from 'html-entities'


export interface LStates {
  [key: string]: LetterState
}

function App() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  function random_collection() {
    let array = [Cars, Cities, Movies]

    let random = array[Math.floor(Math.random() * array.length)]

    return random
  }

  const [data, setData] = useState<Data>(Cars)
  const [underscore, setUnderscore] = useState<string[]>([])
  const [item, setItem] = useState<string[]>([])
  const [states, setStates] = useState<LStates>({})
  const [lifes, setLifes] = useState<number>(10)


  useEffect(() => {
    if (lifes === 0) {
      alert(`What a pity!\n You lost😓 \n The word was ${item.join("")}.`)
      new_game()
    }
  }, [lifes])

  useEffect(() => {
    if (item.join("") != "" && underscore.join("") != "") {

      if (item.join("") === underscore.join("")) {
        alert("Conglatulations 😍 \n You guessed the word.")
        new_game()
      }
    }
  }, [underscore])

  useEffect(() => {

    new_game()
  }, [])

  function new_game() {
    setData(random_collection())

    const newItem = random_item()

    setItem(newItem)
    setLifes(10)

    setUnderscore(createUnderscore(newItem))
    setStates(getDefaultLettersState(letters))
  }

  function random_item() {
    let randomItem = data.data[Math.floor(Math.random() * data.data.length)]

    return randomItem.toUpperCase().split("")
  }


  function createUnderscore(word: string[]) {
    return word.map(m => m === " " ? "&nbsp" : "_");
  }

  function click(letter: string) {
    setUnderscore(prev => {
      const result = [...prev]

      for (let i = 0; i < item.length; ++i) {
        if (item[i] === letter.toUpperCase()) {
          result[i] = letter.toUpperCase()

        }
      }

      return result
    })

    setStates(prev => {
      const result = prev

      result[letter] = item.indexOf(letter) >= 0 ? LetterState.Correct : LetterState.Wrong
      return result
    })


    setLifes(prev => {
      let result = prev

      if (states[letter] === LetterState.Wrong) {
        result = result - 1;
      }

      return result
    })

  }

  function getDefaultLettersState(letters: string[]) {
    const result: LStates = {}

    for (const l of letters) {
      result[l] = LetterState.Default
    }

    return result
  }

  return <>

    <div className='main'>
      <div className="title">HANGMAN</div>
      <div className="subtitle">REACT HANGMAN GAME</div>
      <div className="requirement">Use the alphabet below to guess the word</div>

      <div className='buttons'>
        {
          letters.map((l, i) => <Letter
            letter={l}
            state={states[l]}
            click={() => click(l)}
            key={i}
          />)
        }
      </div>

      <div className='categories'>The category is: {data.category}</div>
      <div className='characters'>
        {underscore.map((u, i) => <div key={i} className="item">{decode(u)}</div>)}
      </div>
      <div className='lifes'>You have {lifes} lifes!</div>

    </div>

  </>
}

export default App
