import styles from './EndScreen.module.css'
import Button from '../../components/Button/Button';

export default function EndScreen({ retry, won }) {

    return (
        <div className={styles.endScreenContainer}>
            <h1 className={styles.titleEndScreen}>{won ? "Parábens, você ganhou!" : "Que pena, você perdeu..."}</h1>
            <div className={styles.buttonContainer}>
                <Button text={"Jogar novamente"} buttonSize={"big"} onClick={() => retry(false)} />
                <Button text={"Voltar ao início"} color={"white"} buttonSize={"big"} onClick={() => retry(true)} />
            </div>
        </div >
    )
}