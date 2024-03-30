import styles from './home.module.scss'
import GaminImage from '../../../assets/images/gamingImage.png'
import WomenShoes from '../../../assets/images/Womans.jpg.png';
import MenShoes from '../../../assets/images/man.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation, Parallax } from 'swiper/modules';
import Card from '../../UI/TopCard/Card'
import HotCard from '../../UI/HodCard/HotCard'
import { IProduct } from '../../Common/Main/Main'
import { FC, useEffect, useState } from 'react'
import discountedImage from '../../../assets/images/imgDiscountBanner.jpg'
import jewelery from '../../../assets/images/jewelery2.jpg'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import {
    filterElectronics,
    filterJewelery, filterWomen,
    filteredAll, filteredMen
} from '../../../Redux/CategoriesSlice'

import { bannerSliders, logoSliders } from '../../../assets/images/Images_datas'
import classNames from 'classnames';


export interface IHome {

    data: IProduct[];
}

const Home: FC<IHome> = ({ data }) => {

    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?

        ({ ...item, discountedPercent: 30, count: 0 })

        : ({ ...item, count: 0 })

    );


    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const [infoActive, setInfoActive] = useState({

        option0: false,
        option1: false,
        option2: false

    })
    const [anounceActive, setAnounceActive] = useState(false)

    const handleSlideChange = (swiper: any) => {

        const newIndex = swiper.realIndex

        setActiveSlideIndex(newIndex)

        handleActiveInfo(`option${newIndex}`)

    }


    const handleActiveInfo = (option: string) => {

        setInfoActive((prev: any) =>

            ({ ...prev, [option]: true })

        )

        setInfoActive((prev: any) => {

            for (const key in prev) {
                if (key !== option) {

                    prev[key] = false

                }
            }

            return prev
        })

    }

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
    useEffect(() => {

        const handleAnnounceActive = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = document.documentElement.scrollHeight;
            const thresHoldStart = windowHeight * 0.35;
            const thresHoldEnd = windowHeight * 0.5;


            if (scrollPosition >= thresHoldStart && scrollPosition < thresHoldEnd) {
                setAnounceActive(true)

            }
            else { setAnounceActive(false) }

        }

        return () => window.addEventListener('scroll', handleAnnounceActive)


    }, [])



    return (
        <>
            <div className={styles.background}></div>
            <section className={styles.container}>

                <Swiper

                    onSlideChange={handleSlideChange}

                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}


                    loop={true}
                    modules={[Pagination, Autoplay]}


                    className={styles.mySwiper}

                >

                    {bannerSliders.map((item, index) =>
                        <SwiperSlide className={styles.mySwiper_image} key={index} >

                            <div className={`${styles.mySwiper_image_cover} ${index > 1 && styles['cover-active']}`}>
                                <div className={`${styles.info}  ${styles['info' + index]}`}>
                                    <h2 className={classNames(styles.info_title, { [styles['info_title-active']]: infoActive[`option${index}` as keyof typeof infoActive] })} >
                                        attack air
                                    </h2>
                                    <h2 className={classNames(styles.info_title, { [styles['info_title-active']]: infoActive[`option${index}` as keyof typeof infoActive] })} >
                                        {index === 0 ? ' vapormax flyknit 3' : index === 1 ? "max 720 sage low" : "monarch iv se"}
                                    </h2>
                                    <p className={classNames(styles.info_text, { [styles['info_text-active']]: infoActive[`option${index}` as keyof typeof infoActive] })}>{index <= 1 ? 'Limited items available at this price' : 'Lightweight cushioning and durable support with a Phylon midsole'}</p>

                                    <button className={classNames(styles.info_button, { [styles[`info_button-active`]]: infoActive[`option${index}` as keyof typeof infoActive] })} >shop now</button>
                                </div>
                            </div>

                            <img src={item} alt="bannerImage" />
                        </SwiperSlide>)}
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


                <div className={styles['discount-announcement']} >
                    <div className={styles.info}>
                        <h2 className={classNames(styles.info_title, { [styles['title-active']]: anounceActive })} >
                            armor
                        </h2>
                        <h2 className={classNames(styles.info_title, { [styles['title-active']]: anounceActive })}>
                            air color 720
                        </h2>
                        <p className={classNames(styles.info_text, { [styles['text-active']]: anounceActive })}>

                            Lightweight cushioning and durable support with a Phylon midsole
                        </p>

                        <div className={classNames(styles.info_bottom, { [styles['bottom-active']]: anounceActive })}> <p className={styles.info_bottom_price}>$90.00 <span>$170.00</span></p>
                            <button className={styles.info_bottom_button} >shop now</button></div>


                    </div>
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

                        <div className={styles['top-products_container_swiper']}>
                            <Swiper

                                speed={700}

                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: false,
                                }}

                                slidesPerView={3}
                                loop={true}
                                modules={[Autoplay]}
                                className={styles.products}

                            >
                                {topSelling.map((item) => <SwiperSlide className={styles.products_item} > <Card key={item.id}
                                    image={item.image}
                                    price={item.price}
                                    title={item.title}
                                    item={item} discountedPercent={item.discountedPercent} />
                                </SwiperSlide>)}

                            </Swiper>
                        </div>
                    </div>

                </div>
                <div className={styles.logos}>

                    <Swiper
                        speed={700}

                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}

                        slidesPerView={6}
                        loop={true}
                        modules={[Autoplay]}
                        className={styles.logos_mySwiper}
                    >
                        {logoSliders.map((item, index) =>
                            <SwiperSlide className={styles.logos_mySwiper_} key={index}>
                                <img src={item} alt="IMG1" />
                            </SwiperSlide>)}

                    </Swiper>

                </div>




            </section>

        </>

    )
}

export default Home

