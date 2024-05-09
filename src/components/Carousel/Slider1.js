import styles from './Slides.module.css'
import { RxSection } from "react-icons/rx";
import { BsFillBagCheckFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import img1 from '../../../../img/imgCarousel1.png'

function Slider1() {
    return (
        <div className={styles.sliderItem}>
            <div>
                <div className={styles.textContainer}>
                    <h1>Buscando por um</h1>
                    <div>
                        <article className={styles.item3}>
                            <div>
                                <RxSection />
                            </div>
                            <div>
                                <a href="#">setor</a>
                            </div>
                        </article>
                        <article className={styles.item2}>
                            <div>
                                <BiCategoryAlt />
                            </div>
                            <div>
                                <a href="#">categoria</a>
                            </div>
                        </article>
                        <article className={styles.item1}>
                            <div>
                                <BsFillBagCheckFill />
                            </div>
                            <div>
                                <a href="#">produto</a>
                            </div>
                        </article>
                    </div>
                    <span>?</span>
                </div>
            </div>
            <div>
                <img src={img1} />
            </div>
        </div>
    )
}

export default Slider1