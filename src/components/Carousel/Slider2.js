import styles from './Slides.module.css'
import img2 from '../../../../img/imgCarousel2.png'

import { TbViewfinder } from "react-icons/tb";
import { MdCompare, MdOutlineQrCode2 } from "react-icons/md";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

function Slider2() {
    return (
        <div className={styles.sliderItem}>
            <div>
                <div className={`${styles.textContainer} ${styles.contentContainer}`}>
                    <h1>Aqui você pode:</h1>
                    <div className={styles.flexContainer}>
                        <div>
                            <TbViewfinder />
                            <p>Buscar</p>
                        </div>
                        <div>
                            <MdCompare />
                            <p>Comparar</p>
                        </div>
                        <div>
                            <MdOutlineQrCode2 />
                            <p>Identificar</p>
                        </div>
                        <div>
                            <HiOutlineSquares2X2/>
                            <p>Organizar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={img2} />
            </div>
        </div>
    )
}

export default Slider2