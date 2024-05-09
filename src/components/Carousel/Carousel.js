import styles from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import { Autoplay, Pagination, Navigation } from 'swiper'

import Slider1 from './Slider1';
import Slider2 from './Slider2';
import Slider3 from './Slider3';
import Slider4 from './Slider4';

function Carousel() {

    return (
        <section className={styles.section}>
            <Swiper className={styles.swiper}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            >

                <SwiperSlide className={styles.slider}>
                    <Slider1 />
                </SwiperSlide>

                <SwiperSlide className={styles.slider}>
                    <Slider2 />
                </SwiperSlide>

                <SwiperSlide className={styles.slider}>
                    <Slider3 />
                </SwiperSlide>

                <SwiperSlide className={styles.slider}>
                    <Slider4 />
                </SwiperSlide>

            </Swiper>
        </section>
    )
}

export default Carousel