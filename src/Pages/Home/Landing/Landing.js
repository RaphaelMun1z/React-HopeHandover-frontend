import styles from './Landing.module.css'
import img from '../../../img/illustrationBG.png'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function Landing() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })

    return (
        <section className={styles.section}>
            <div className={styles.container} data-aos="fade-up">

                <div className={styles.insideContainer}>
                    <h1>Hope<br />Handover</h1>
                </div>

                <div className={styles.insideContainer}>
                    <img src={img} alt="Imagem de fundo" />
                </div>

            </div>
        </section >
    )
}

export default Landing