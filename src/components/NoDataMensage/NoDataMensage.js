import styles from './NoDataMensage.module.scss'
import img1 from '../../../src/img/noData.svg'
import img2 from '../../../src/img/loading.svg'

function NoDataMensage({ type, msg }) {
    let image;
    if (type === 'noData') {
        image = img1
    } else if (type === 'loading') {
        image = img2
    }

    return (
        <section className={styles.definedStatusSection}>
            <img src={image} alt={msg} title={msg} />
            <h1>{msg}</h1>
        </section>
    );
}

export default NoDataMensage;
