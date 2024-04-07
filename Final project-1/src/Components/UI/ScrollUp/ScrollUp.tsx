import  { useEffect, useState } from 'react'
import styles from './scroll_up.module.scss';
import classNames from 'classnames';
import { FaChevronUp } from "react-icons/fa";


const ScrollUp = () => {

    const [scrollPos, setScrollPos] = useState(false)
    const [scrollPosBottom, setScrollPosBottom] = useState(false)

    useEffect(() => {

        const handleScrollPosition = () => {

            const currentScroll = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight
            const windowHeight = window.innerHeight
            const scrollBottom = windowHeight + currentScroll >= scrollHeight

            if (currentScroll > scrollHeight * 0.2) {

                setScrollPos(true)
                if (scrollBottom) {
                    setScrollPosBottom(true)
                }
                else { setScrollPosBottom(false) }
            }

            else { setScrollPos(false) }

        }

        window.addEventListener('scroll', handleScrollPosition)
        return () => window.removeEventListener('scroll', handleScrollPosition)

    }, [])

    const handleScrollTop = () => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    }

    console.log(scrollPos)
    return (
        <>
            <FaChevronUp className={classNames(styles['scroll-up-icon'], { [styles['scroll-up-icon-active']]: scrollPos }, { [styles['scroll-up-icon-active2']]: scrollPosBottom })} onClick={handleScrollTop} />
        </>
    )
}

export default ScrollUp