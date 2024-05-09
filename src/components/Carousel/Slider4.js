import styles from './Slides.module.css'
import img4 from '../../../../img/imgCarousel4.png'

function Slider4() {
    return (
        <div className={styles.sliderItem}>
            <div>
                <div className={styles.textContainer}>
                    <h1>Viaje nessa experiência</h1>
                    <div>
                        <h3>Aqui vai ter alguma coisa...</h3>
                    </div>

                </div>
            </div>
            <div>
                <img src={img4} className={styles.fly} />
            </div>
        </div>
    )
}

export default Slider4