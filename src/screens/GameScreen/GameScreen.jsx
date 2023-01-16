import styles from './GameScreen.module.css'
import Button from '../../components/Button/Button';
import { useRef, useState } from 'react';

export default function GameScreen({ checkLetter, wordLetters, category, word, guessedLetters, wrongLetters, score, chances, showWarning }) {

    const [chosenLetter, setChosenLetter] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const letterInputRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        checkLetter(chosenLetter);
        setIsDisabled(true);
        setChosenLetter('');
        letterInputRef.current.focus();
    }

    function handleChange(value) {
        setChosenLetter(value);
        checkIfNeedToDisable(value);
    }

    function checkIfNeedToDisable(value) {
        if (value) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    return (
        <div className={styles.gameScreenContainer}>
            <p className={styles.points}><span>Pontuação: {score}</span></p>
            <h1 className={styles.title}>Adivinhe a palavra: </h1>
            <h2 className={styles.tip}>Dica sobre a palavra: <span>{category}</span></h2>
            <h3>Você tem {chances} tentativas</h3>
            <div className={styles.wordContainer}>
                {wordLetters.map((letter, index) => (
                    guessedLetters.includes(letter) ? <span key={index} className={styles.letter}>{letter}</span> : <span key={index} className={styles.blankSquare}></span>
                ))}
            </div>
            <div className={styles.letterContainer}>
                <p>Adivinhe uma letra da palavra: </p>
                <form onSubmit={handleSubmit}>
                    <input onChange={e => handleChange(e.target.value)} autoFocus ref={letterInputRef} value={chosenLetter} type="text" name="letter" maxLength={1} />
                    <Button disabled={isDisabled} text={"Jogar"} buttonSize={"medium"} type={"submit"} />
                </form>
            </div>
            {wrongLetters.length > 0 && <p className={styles.wrongLettersText}>Letras erradas:</p>}
            <div className={styles.wrongLettersContainer}>
                {wrongLetters.map((letter, index) => <span key={index} className={styles.wrongLetters}>{letter}</span>)}
            </div>
            {showWarning.length > 0 && (
                <div className={styles.warning}>
                    <p>{showWarning}</p>
                </div>
            )}
        </div>
    );
}
