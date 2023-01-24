import styles from './MadeBy.module.css'

const linkedin = "https://www.linkedin.com/in/viniciusminotti/";

export default function MadeBy() {
    return <p className={styles.madeBy}>Feito com <span>❤</span> por <a target='_blank' href={linkedin}>Vinicius Minotti</a></p>
}