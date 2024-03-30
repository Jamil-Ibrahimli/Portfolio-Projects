import React, { useEffect, useState } from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { useLocation } from 'react-router';

const Footer = () => {

    const [footerActive, setFooterActive] = useState(false)
    const location = useLocation()
    useEffect(() => {

        const handleFooterActive = () => {

            if (window.scrollY >= 2300 && location.pathname === '/') {

                setFooterActive(true)

            }
            else {
                setFooterActive(false)
            }

        }
        return window.addEventListener('scroll', handleFooterActive)

    }, [])



    return (

        <footer className={classNames(styles.footer, { [styles['footer-active']]: footerActive })}>
            <div className={styles.footer_container}>
                <div className={styles.footer_container_uppart}>
                    <ul className={styles.list}><h3>quick links</h3>
                        <li>About us</li>
                        <li>Faq</li>
                        <li>Help</li>
                        <li>My account</li>
                        <li>Blog</li></ul>
                    <ul className={styles.list}><h3>categories</h3>
                        <li>Clothes</li>
                        <li>Ectronics</li>
                        <li>Furniture</li>
                        <li>Glasses</li>
                        <li>Shoes</li></ul>
                    <ul className={styles.list}><h3>contacts</h3>
                        <li>Baku str tagizadeh</li>
                        <li>+94 423 23 221</li>
                        <li>info@allaia</li>

                    </ul>
                    <div><div><h3>Keep in touch</h3> <input type="text" /></div>

                        <div><h3>Follow us</h3></div>
                    </div>
                </div>
                <div className={styles.footer_container_downpart}></div>

            </div>

        </footer>


    )
}

export default Footer