import styles from './home.module.scss'
import img1 from '../../../assets/images/slide_home_1.jpg'
import img2 from '../../../assets/images/slide_home_2.jpg'
import img3 from '../../../assets/images/slide_home_3.jpg'
import GaminImage from '../../../assets/images/gamingImage.png'
import WomenShoes from '../../../assets/images/Womans.jpg.png';
import MenShoes from '../../../assets/images/man.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Card from '../../UI/TopCard/Card'
import HotCard from '../../UI/HodCard/HotCard'
import { IProduct } from '../../Common/Main/Main'
import { FC, } from 'react'
import discountedImage from '../../../assets/images/imgDiscountBanner.jpg'
import jewelery from '../../../assets/images/jewelery2.jpg'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import {
    filterElectronics,
    filterJewelery, filterWomen,
    filteredAll, filteredMen
} from '../../../Redux/CategoriesSlice'
export interface IHome {

    data: IProduct[];
}


const Home: FC<IHome> = ({ data }) => {


    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?

        ({ ...item, discountedPercent: 30, count: 0 })

        : ({ ...item, count: 0 })

    );

    const topSelling = newData.filter(item =>
        item.rating.rate > 4.5)
    const hotDeals = newData.filter((item) =>
        item.rating.rate < 3.7)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShopAll = () => {

        dispatch(filteredAll(newData))
        navigate('/shop')

    }

    const handleCollection = (filter: any) => {

        dispatch(filter(newData))

        navigate('/shop')


    }

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

                    <div className={styles.collections_image}><div className={styles['image-cover']}>
                        <p>men's collection</p> <button onClick={() =>
                            handleCollection(filteredMen)}>shop now</button > </div>
                        <img src={MenShoes} alt="Man shoes" /></div>
                    <div className={styles.collections_image}><div className={styles['image-cover']}>
                        <p>women's collection</p> <button onClick={() =>
                            handleCollection(filterWomen)}>shop now</button> </div>
                        <img src={WomenShoes} alt="women shoes" /></div>
                    <div className={styles.collections_image}><div className={styles['image-cover']}>
                        <p>gamer's collection</p> <button onClick={() =>
                            handleCollection(filterElectronics)}>shop now</button> </div>
                        <img src={GaminImage} alt="Kids shoes" /></div>
                    <div className={styles.collections_image}><div className={styles['image-cover']}>
                        <p>jewelery collection</p> <button onClick={() =>
                            handleCollection(filterJewelery)}>shop now</button> </div>
                        <img src={jewelery} alt="Kids shoes" /></div>
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


                <div className={styles['discount-announcement']}>

                </div>


                <div className={styles['top-products']} >
                    <div className={styles['top-products_heading']}>
                        <h2>Top Selling</h2>
                        <p> Find the perfect product for you!</p>
                    </div>

                    <div className={styles['top-products_container']}>

                        <div className={styles['top-products_container_discounted-image']}>
                            <img src={discountedImage} alt="dicountedImg" />
                            <div className={styles['discount-img-cover']}>
                                <div className={styles['discount-img-cover_text']}>
                                    <p> up to 30%</p>
                                    <span>sale off</span>

                                </div>
                                <button className={styles['discount-img-button']} onClick={handleShopAll} >
                                    Shop now</button>
                            </div>

                        </div>
                        <div className={styles['top-products_container_items']}>

                            {topSelling.map((item) => <Card key={item.id}
                                image={item.image}
                                price={item.price}
                                title={item.title}
                                item={item} discountedPercent={item.discountedPercent} />)}

                        </div>
                    </div>

                </div>


            </section>

        </>

    )
}

export default Home

