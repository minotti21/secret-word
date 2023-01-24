import { useState } from 'react';
import Button from '../../components/Button/Button';
import MadeBy from '../../components/MadeBy/MadeBy';
import styles from './StartScreen.module.css'

export default function StartScreen({ startGame }) {

    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className={styles.startScreenContainer}>
            <div className={styles.flexTitle}>
                <h1 className={styles.title}>Secret</h1>
                <div onClick={() => setIsFlipped(!isFlipped)} className={styles.flipWord}>
                    <div className={`${styles.flipWordContainer} ${isFlipped ? styles.flipFront : styles.flipBack}`}>
                        <div className={styles.flipWordFront}>
                        </div>
                        <div className={styles.flipWordBack}>
                            <h1 className={styles.hiddenTitle}>Word</h1>
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.text}>Clique no botão abaixo para iniciar o jogo!</p>
            <Button text={"Começar Jogo"} buttonSize={"big"} onClick={startGame} />
            <MadeBy />
        </div>
    );
}