import styles from './Slides.module.css'
import img3 from '../../../../img/imgCarousel3.png'

function Slider3() {
    return (
        <div className={styles.sliderItem}>
            <div>
                <div className={styles.textContainer}>
                    <h1>Conheça nossas ferramentas</h1>
                    <div>
                        <h3>Aqui vai ter alguma coisa...</h3>
                    </div>

                </div>
            </div>
            <div>
                <img src={img3} />
            </div>
        </div>
    )
}

export default Slider3