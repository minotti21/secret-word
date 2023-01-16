import { useState } from 'react'
import StartScreen from './screens/StartScreen/StartScreen'
import GameScreen from './screens/GameScreen/GameScreen'
import EndScreen from './screens/EndScreen/EndScreen'
import wordsList from './mocks/wordsList'
import styles from './App.module.css'
import { useEffect } from 'react'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [wordLetters, setWordLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [chances, setChances] = useState(5);
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [gameResult, setGameResult] = useState('playing');

  useEffect(() => {
    checkIfLostOrWon();
  })

  let currentGameScreen;

  const startGame = () => {

    const [word, category] = getRandomCategoryAndWord(wordsList);

    const letters = word.toLowerCase().split("");

    setWord(word);
    setCategory(category);
    setWordLetters(letters);

    setGameStage(stages[1].name);
  }

  function checkIfNotLetter(letter) {
    return !/^[a-zA-Z]/.test(letter);
  }

  const checkLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    if (checkIfNotLetter(normalizedLetter)) {
      setShowWarning("Apenas letras são aceitas!")
      return
    } else if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      setShowWarning("Você já tentou essa letra!")
      return
    } else if (wordLetters.includes(normalizedLetter)) {
      setGuessedLetters(prevLetters => [...prevLetters, normalizedLetter]);
    } else {
      setWrongLetters(prevLetters => [...prevLetters, normalizedLetter]);
      setChances(chances => chances - 1);
    }

    setShowWarning("")

  }

  const retry = (goToMenu) => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setChances(5);

    const [word, category] = getRandomCategoryAndWord(wordsList);

    const letters = word.toLowerCase().split("");

    setWord(word);
    setCategory(category);
    setWordLetters(letters);

    setGameStage(stages[1].name);

    if (gameResult === 'won') {
      setScore(prevScore => prevScore + 100);
    } else {
      setScore(0);
    }

    setGameStage(goToMenu ? stages[0].name : stages[1].name)

  }

  const formatWordLetters = wordLetters => [...new Set(wordLetters)]

  function checkIfLostOrWon() {

    const formatedWordLetters = formatWordLetters(wordLetters);

    if (guessedLetters.length === formatedWordLetters.length && wordLetters.length !== 0) {
      setGameStage(stages[2].name);
      setGameResult('won');
    } else if (chances === 0) {
      setGameStage(stages[2].name);
      setGameResult('lost')
    }
  }

  const getRandomCategoryAndWord = (wordsList) => {

    const categories = Object.keys(wordsList);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)];

    return [word, category];
  }

  if (gameStage === "start") {
    currentGameScreen = <StartScreen startGame={startGame} />
  } else if (gameStage === "game") {
    currentGameScreen = <GameScreen
      wordLetters={wordLetters}
      category={category}
      word={word}
      checkLetter={checkLetter}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      chances={chances}
      score={score}
      showWarning={showWarning} />

  } else {
    currentGameScreen = <EndScreen won={gameResult === 'won'} retry={retry} />
  }

  return (
    <div className={styles.appContainer}>
      {currentGameScreen}
    </div>
  );
}

export default App;
