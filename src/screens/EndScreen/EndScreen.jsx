import styles from './EndScreen.module.css'
import Button from '../../components/Button/Button';

export default function EndScreen({ retry, won, word, chances, score }) {

    const attempts = 5 - chances;
    const guessedWord = word.join("");
    const formatedWord = guessedWord[0].toUpperCase() + guessedWord.substring(1);
    console.log(formatedWord)
    let text = "";

    if (attempts < 1) {
        text = <p className={styles.paragraph}>Acertou a palavra <span>{formatedWord}</span> de primeira!</p>
    } else if (attempts === 1) {
        text = <p className={styles.paragraph}>Foi necessária apenas <span>{attempts}</span> tentativa para  acertar a palavra <span>{formatedWord}</span>!</p>
    } else {
        text = <p className={styles.paragraph}>Foram necessárias <span>{attempts}</span> tentativas para acertar a palavra <span>{formatedWord}</span></p>
    }

    return (
        <div className={styles.endScreenContainer}>
            <h1 className={styles.titleEndScreen}>{won ? "Parábens, você acertou!" : "Que pena, você errou..."}</h1>
            {won ? (
                text
            ) : (
                <p className={styles.paragraph}>A palavra correta é: <span>{formatedWord}</span></p>
            )}
            <p className={styles.score}>Total de pontos: <span>{score}</span></p>
            <div className={styles.buttonContainer}>
                <Button text={"Jogar novamente"} buttonSize={"big"} onClick={() => retry(false, won)} />
                <Button text={"Voltar ao início"} color={"white"} buttonSize={"big"} onClick={() => retry(true, won)} />
            </div>
        </div >
    )
}