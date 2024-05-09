import styles from './ContentSection.module.css'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function ContentSection({ title, paragraph, btnText, type, img }) {
    return (
        <>
            {type == 1 ? (
                <section className={styles.section}>
                    <div className={styles.containerContent}>
                        <div className={styles.insideContainerContent}>
                            <h1>{title}</h1>
                            <p>
                                {paragraph}
                            </p>
                            <p className={styles.link}>
                                <a hhref="#">{btnText} <MdOutlineKeyboardArrowRight /></a>
                            </p>
                        </div>
                    </div>
                    <div className={styles.containerContent}>
                        <div className={styles.insideContainerContent}>
                            <img src={img} />
                        </div>
                    </div>
                </section>
            ) :
                <section className={`${styles.section} ${styles.sectionDark}`}>
                    <div className={styles.containerContent}>
                        <div className={styles.insideContainerContent}>
                            <img src={img} />
                        </div>
                    </div>
                    <div className={styles.containerContent}>
                        <div className={styles.insideContainerContent}>
                            <h1>{title}</h1>
                            <p>
                                {paragraph}
                            </p>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ContentSection