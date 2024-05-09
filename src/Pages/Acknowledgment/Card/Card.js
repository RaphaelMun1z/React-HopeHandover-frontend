import styles from './Card.module.scss'
import img from '../../../img/handshake.svg'
import img2 from '../../../img/logo.png'

function Card({ name, date }) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR'); 

    function abbreviateDate(fullDate) {
        const parts = fullDate.split('/');

        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2].slice(-2);

            return `${day}/${month}/${year}`;
        } else {
            return fullDate;
        }
    }

    return (
        <div className={styles.cardsContainer}>

            <div className={styles.cardContainer}>
                <img src={img2} className={styles.imgBg} />
                <div className={styles.insideCard}>
                    <img src={img} alt="Handshake" className={styles.imgSvg} />
                </div>
                <div className={styles.insideCard}>
                    <div>
                        <h3><b>{name}</b> agradeceu por suas colaborações!</h3>
                        <p>{abbreviateDate(formattedDate)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card