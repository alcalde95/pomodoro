import styles from './styles.module.css'

/*
    action es una función que es pasada por el padre de Button
    y que es llamada en el onClick de este.
*/

const Button = ({ value, action }) => {
    return (
        <div
            className={styles.btns}
            onClick={() => action()}
        >
            {value}
        </div>
    )
}

export default Button