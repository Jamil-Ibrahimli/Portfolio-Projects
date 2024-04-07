import { useEffect, useRef, useState } from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { IoHomeOutline } from "react-icons/io5";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FaAnglesRight } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { visas } from '../../../assets/images/Images_datas';
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
const Footer = () => {

    const [footerActive, setFooterActive] = useState(false)
    const [footerActive2, setFooterActive2] = useState(false)
    const [activeList, setActiveList] = useState({ option1: false, option2: false, option3: false, option4: false })
    const location = useLocation()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleFooterActive = () => {
            const windowHeight = window.innerHeight;
            const currentScroll = window.scrollY;
            const element = containerRef.current;
            const scrollHeight = document.documentElement.scrollHeight;
            const bottomOfPage = currentScroll + windowHeight >= scrollHeight;
            const windowWidth = window.innerWidth;

            if (windowWidth > 1000) {
                if (element) {
                    const { bottom } = element.getBoundingClientRect()

                    if ((currentScroll > scrollHeight * 0.65) &&
                        (location.pathname === '/')) {

                        setFooterActive(true)

                    }
                    else { setFooterActive(false) }

                    if ((bottom <= windowHeight) && (bottomOfPage)) {

                        setFooterActive2(true)

                    }
                    else {
                        setFooterActive2(false)
                    }
                }

            }

        }

        window.addEventListener('scroll', handleFooterActive)
        return () => window.removeEventListener('scroll', handleFooterActive)

    }, [window.scrollY])

    const handleActiveList = (option: string) => {

        setActiveList((prev: any) => ({ ...prev, [option]: !prev[option] }))

    }



    return (

        <footer className={classNames(styles.footer, { [styles['footer-active']]: footerActive },
            { [styles['footer-active2']]: footerActive2 })} >
            <div className={styles.footer_container} ref={containerRef}>
                <div className={styles.footer_container_uppart}>
                    <nav className={styles.nav} onClick={() => handleActiveList('option1')}>
                        <h3 >quick links  {activeList['option1' as keyof typeof activeList] ? <AiOutlinePlus /> : <AiOutlineMinus />}</h3>
                        <ul className={classNames(styles.nav_list, { [styles['list-active']]: activeList['option1' as keyof typeof activeList] })}>
                            <li>About us</li>
                            <li>Faq</li>
                            <li>Help</li>
                            <li>My account</li>
                            <li>Blog</li></ul>

                    </nav>

                    <nav className={styles.nav} onClick={() => { handleActiveList('option2') }}><h3 >categories {activeList['option2' as keyof typeof activeList] ? <AiOutlinePlus /> : <AiOutlineMinus />}</h3>
                        <ul className={classNames(styles.nav_list, { [styles['list-active']]: activeList['option2' as keyof typeof activeList] })}>
                            <li>Clothes</li>
                            <li>Ectronics</li>
                            <li>Furniture</li>
                            <li>Glasses</li>
                            <li>Shoes</li></ul></nav>

                    <nav className={styles.nav} onClick={() => { handleActiveList('option3') }}><h3 >contacts {activeList['option3' as keyof typeof activeList] ? <AiOutlinePlus /> : <AiOutlineMinus />}</h3>
                        <ul className={classNames(styles.nav_list, { [styles['list-active']]: activeList['option3' as keyof typeof activeList] })}>
                            <li><IoHomeOutline className={styles.icon} />97845 Baker st. <br /> 567 Los Angels-US</li>
                            <li><PiPhoneCallLight className={styles.icon} /> +94 423 23 221</li>
                            <li><CiMail className={styles.icon} />info@allaia</li>

                        </ul></nav>
                    <div className={styles.right} onClick={() => { handleActiveList('option4') }}>
                        <h3 >Keep in touch {activeList['option4' as keyof typeof activeList] ? <AiOutlinePlus /> : <AiOutlineMinus />}</h3>
                        <div className={classNames(styles.right_search, { [styles['list-right-active']]: activeList['option4' as keyof typeof activeList] })}>
                            <div className={styles.right_search_searcher}>
                                <input type="text" placeholder='Your email' /><button><FaAnglesRight /></button></div>

                            <div className={styles.right_search_medias}>
                                <h3>Follow us</h3>
                                <div className={styles.right_search_medias_icons}>
                                    <FaFacebookSquare className={styles.icon} />
                                    <IoLogoInstagram className={styles.icon} />
                                    <FaTelegramPlane className={styles.icon} />
                                    <FaWhatsapp className={styles.icon} />
                                    <FaTiktok className={styles.icon} /></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.footer_container_downpart}>
                    <div className={styles.footer_container_downpart_icons}>
                        {visas.map((item, index) => <img src={item} alt="visaImage" key={index} />)}</div>
                    <div className={styles.footer_container_downpart_copyright}><p>&copy; 2024 Developed by Jamil Ibrahimli </p><p>All rights reserved</p></div>
                </div>

            </div>


        </footer>


    )
}

export default Footer