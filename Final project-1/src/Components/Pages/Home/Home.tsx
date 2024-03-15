import styles from './home.module.scss'
import img1 from '../../../assets/images/slide_home_1.jpg'
import img2 from '../../../assets/images/slide_home_2.jpg'
import img3 from '../../../assets/images/slide_home_3.jpg'
import KidShoes from "../../../assets/images/Kid's shoes.jpg"
import WomenShoes from '../../../assets/images/Woman shoes.jpg';
import KidsShoes from '../../../assets/images/Kids shoes.jpg'
import MenShoes from '../../../assets/images/Man shoes (2).jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Card from '../../UI/TopCard/Card'
import HotCard from '../../UI/HodCard/HotCard'
import { IProduct } from '../../Common/Main/Main'
import { FC } from 'react'



export interface IHome {

    data: IProduct[];
}


const Home: FC<IHome> = ({ data }) => {


    const topSelling = data.filter(item => item.rating.rate > 4.5).map((item) => item.rating.count < 200 ? ({ ...item, discountedPercent: 30 }) : item)
    const hotDeals = data.filter((item) =>
        item.rating.rate < 3.7).map((item) => item.rating.count < 200 ? ({ ...item, discountedPercent: 30 }) : item)


    return (
        <>
            <div className={styles.background}></div>
            <section className={styles.container}>

                <Swiper
                    pagination={{
                        dynamicBullets: true,

                    }}

                    modules={[Pagination]}
                    className={styles.mySwiper}

                >
                    <SwiperSlide className={styles.mySwiper_image}><img src={img1} alt="IMG1" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img2} alt="IMG2" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img3} alt="IMG3" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img1} alt="IMG1" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img2} alt="IMG2" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img3} alt="IMG3" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img1} alt="IMG1" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img2} alt="IMG2" /></SwiperSlide>
                    <SwiperSlide className={styles.mySwiper_image}><img src={img3} alt="IMG3" /></SwiperSlide>
                </Swiper>

                <div className={styles.collections}>

                    <div className={styles.collections_men}><img src={MenShoes} alt="Man shoes" /></div>
                    <div className={styles.collections_women}><img src={WomenShoes} alt="women shoes" /></div>
                    <div className={styles.collections_kids}><img src={KidShoes} alt="Kids shoes" /></div>
                </div>

                <div className={styles['top-products']} >

                    <div className={styles['top-products_container']}>
                        <div className={styles['top-products_container_heading']}>
                            <h2>Top Selling</h2>
                            <p> Find the perfect product for you!</p>
                        </div>
                        <div className={styles['top-products_container_items']}>

                            {topSelling.map((item) => <Card key={item.id}
                                image={item.image}
                                price={item.price}
                                title={item.title}
                                item={item} discountedPercent={item.discountedPercent}/>)}

                        </div>
                    </div>

                </div>

                <div className={styles['discount-announcement']}>

                </div>

                <div className={styles['discounted-products']}>
                    <div className={styles['discounted-products_container']}>
                        <div className={styles['discounted-products_container_heading']}>
                            <h2>best deals</h2>
                            <p>Discover featured products now</p>

                        </div>
                        <div className={styles['discounted-products_container_items']}>

                            {hotDeals.map((item) =>
                                <HotCard key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    item={item}
                                    discountedPercent={item.discountedPercent} />)}

                        </div>

                    </div>

                </div>



            </section>

        </>

    )
}

export default Home

