import styles from './HowItWorks.module.scss'
import img1 from '../../img/dottedline.webp'

import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

let title = ""
let step1 = ""
let step2 = ""
let step3 = ""

function HowItWorks({ tipo }) {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })

    if (tipo == '1') {
        title = "Como posso doar?"
        step1 = "Crie uma conta como pessoa física ou jurídica."
        step2 = "Acesse Doações para verificar os itens publicados como pedido de doação."
        step3 = "Verifique os detalhes do item, projeto, e leia os termos. Pronto! agora é só confirmar sua doação"
    } else {
        title = "Como posso receber doações?"
        step1 = "Crie uma conta como pessoa física ou jurídica."
        step2 = "Primeiramente, crie um projeto. Acesse o ícone 'engrenagem' → Minha Área → Criar Novo Projeto"
        step3 = "Acesse: Ver Meus Projetos → Adicionar Item. Agora é só fornecer as informações e publicar."
    }

    return (
        <section className={styles.steps}>
            <h1 className={styles.steps__title} data-aos="fade-up">{title}</h1>
           
            <div className={styles.steps__item} data-aos="fade-up">
                <div className={styles.steps__itemNumber}>1</div>
                <div className={styles.steps__itemTitle}>Passo 1</div>
                <div className={styles.steps__itemDescription}>{step1}</div>
            </div>

            <div className={styles.lineDivCards} data-aos="fade-up">
                <img src={img1} alt='Linha' />
            </div>

            <div className={styles.steps__item} data-aos="fade-up">
                <div className={styles.steps__itemNumber}>2</div>
                <div className={styles.steps__itemTitle}>Passo 2</div>
                <div className={styles.steps__itemDescription}>{step2}</div>
            </div>

            <div className={styles.lineDivCards} data-aos="fade-up">
                <img src={img1} alt='Linha' />
            </div>

            <div className={styles.steps__item} data-aos="fade-up">
                <div className={styles.steps__itemNumber}>3</div>
                <div className={styles.steps__itemTitle}>Passo 3</div>
                <div className={styles.steps__itemDescription}>{step3}</div>
            </div>

        </section>
    )
}

export default HowItWorks

