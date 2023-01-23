import { useState } from 'react'
import StartScreen from './screens/StartScreen/StartScreen'
import GameScreen from './screens/GameScreen/GameScreen'
import EndScreen from './screens/EndScreen/EndScreen'
import { wordsList } from './mocks/wordsList'
import styles from './App.module.css'
import { useEffect } from 'react'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

const amountOfChances = 5;

function App() {

  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(amountOfChances);
  const [category, setCategory] = useState("");
  const [wordLetters, setWordLetters] = useState([]);
  const [wordLettersWithoutAccent, setWordLettersWithoutAccent] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [gameResult, setGameResult] = useState('playing');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameStage, setGameStage] = useState(stages[0].name);

  useEffect(() => {
    checkIfLostOrWon();
    console.log(`render`)
  }, [guessedLetters, chances]);

  let currentGameScreen;

  function removeAccents(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function generateWord() {
    const [word, category] = getRandomCategoryAndWord(wordsList);
    const letters = word.toLowerCase().split("");
    const lettersWithoutAccent = removeAccents(word).toLowerCase().split("");

    setCategory(category);
    setWordLetters(letters);
    setWordLettersWithoutAccent(lettersWithoutAccent);
  }

  function startGame() {
    generateWord();
    setGameStage(stages[1].name);
  }

  function checkIfNotLetter(letter) {
    return !/^[a-zA-Z]/.test(letter);
  }

  function checkLetter(letter) {
    const normalizedLetter = letter.toLowerCase();

    if (checkIfNotLetter(normalizedLetter)) {
      setShowWarning("Apenas letras são aceitas!")
      return
    } else if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      setShowWarning("Você já tentou essa letra!")
      return
    } else if (wordLettersWithoutAccent.includes(normalizedLetter)) {
      setGuessedLetters(prevLetters => [...prevLetters, normalizedLetter]);
    } else {
      setWrongLetters(prevLetters => [...prevLetters, normalizedLetter]);
      setChances(chances => chances - 1);
    }

    setShowWarning("")
  }

  function retry(goToMenu, won) {
    setGuessedLetters([]);
    setWrongLetters([]);
    setChances(amountOfChances);

    generateWord();

    !won && setScore(0);

    setGameStage(goToMenu ? stages[0].name : stages[1].name);
  }

  function formatWordLetters(wordLetters) {
    return [...new Set(wordLetters)];
  }

  function checkIfLostOrWon() {
    const formatedWordLetters = formatWordLetters(wordLettersWithoutAccent);

    if (guessedLetters.length === formatedWordLetters.length && wordLetters.length !== 0) {
      setGameStage(stages[2].name);
      setGameResult('won');
      setScore(score + 100);
    } else if (chances === 0) {
      setGameStage(stages[2].name);
      setGameResult('lost')
    }
  }

  function getRandomCategoryAndWord(wordsList) {
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
      wordLettersWithoutAccent={wordLettersWithoutAccent}
      category={category}
      checkLetter={checkLetter}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      chances={chances}
      score={score}
      showWarning={showWarning}
    />
  } else {
    currentGameScreen = <EndScreen
      score={score}
      word={wordLetters}
      won={gameResult === 'won'}
      retry={retry}
      chances={chances} />
  }

  return (
    <div className={styles.appContainer}>
      {currentGameScreen}
    </div>
  );
}

export default App;
