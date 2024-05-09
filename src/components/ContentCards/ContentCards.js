import styles from './ContentCards.module.scss'

import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

import img1 from "../../img/about1.jpeg"
import img2 from "../../img/about2.jpg"
import img3 from "../../img/about3.PNG"


function ContentCards() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })

    return (
        <section className={styles.container}>
            <h1 className={styles.titleContainer} data-aos="fade-up">Sobre Nós</h1>
            <div className={styles.containerCards}>

                <div className={styles.card_hover} data-aos="fade-up">
                    <div className={styles.card_hover__content}>
                        <h3 className={styles.card_hover__title}>
                            Esperança
                        </h3>
                        <p className={styles.card_hover__text}>"A esperança é o combustível da mudança. Suas doações são um raio de esperança para quem enfrenta desafios."</p>
                    </div>
                    <div className={styles.card_hover__extra}>
                        <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                    </div>
                    <img src={img1} alt="img" />
                </div>

                <div className={styles.card_hover} data-aos="fade-up"> 
                    <div className={styles.card_hover__content}>
                        <h3 className={styles.card_hover__title}>
                            Solidariedade
                        </h3>
                        <p className={styles.card_hover__text}>"A solidariedade é o elo que une corações generosos. Juntos, podemos fazer a diferença na vida de muitos."</p>
                    </div>
                    <div className={styles.card_hover__extra}>
                        <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                    </div>
                    <img src={img2} alt="img" />
                </div>

                <div className={styles.card_hover} data-aos="fade-up">
                    <div className={styles.card_hover__content}>
                        <h3 className={styles.card_hover__title}>
                            Generosidade
                        </h3>
                        <p className={styles.card_hover__text}>"A generosidade é a linguagem universal do coração. Compartilhe sua generosidade e ajude a construir um mundo mais acolhedor."</p>
                    </div>
                    <div className={styles.card_hover__extra}>
                        <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                    </div>
                    <img src={img3} alt="img" />
                </div>

            </div>
        </section>
    )
}

export default ContentCards