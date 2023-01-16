import styles from './Button.module.css'

export default function Button({ text, buttonSize, onClick = () => { }, disabled = false, type = "button", color = "red" }) {
    return <button className={`${styles.button} ${styles[buttonSize]} ${styles[color]}`} onClick={onClick} type={type} disabled={disabled}>{text}</button>
}