import styles from './styles.module.css'

const Display = ({ value }) => {
    return (
        <div id={styles.displayContainer}>
            <p>{value}</p>
        </div>
    )
}

export default Display