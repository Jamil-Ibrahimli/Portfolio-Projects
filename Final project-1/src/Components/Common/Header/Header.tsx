import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import styles from './header.module.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import classNames from 'classnames';
import CartItem from '../../UI/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterElectronics, filterJewelery,
    filterWomen, filteredAll,
    filteredMen, filterDiscounted, filterInputData
} from '../../../Redux/CategoriesSlice';
import { RootState } from '../../../Redux/Store';
import { GrClose } from "react-icons/gr";
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../Context/DataContext';
import searchingImage from '../../../assets/images/CartEmpty.png'
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import webLogo from '../../../assets/images/webLogo.png'
import { MdOutlineCategory } from "react-icons/md";


const Header = () => {

    const cart = useSelector((state: RootState) => state.AddToCartReducer.cart)
    const [isCart, setCart] = useState(false);
    const [previusScroll, setPreviusScroll] = useState(0)
    const [scrolling, setScrolling] = useState(false);
    const [isCategories, setCategories] = useState(false);
    const [inputData, setInputData] = useState('');
    const [searchMobileActive, setSearchMobileActive] = useState(false)
    const [navMobile, setNavMobile] = useState(false)
    const [activeLink, setActivelink] = useState<any>({

        option1: false,
        option2: false,
        option3: false,
        option4: false,

    });

    const { data } = useContext(DataContext);
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartElementRef = useRef<HTMLDivElement>(null)
    const cartButtonRef = useRef<HTMLDivElement>(null)

    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?


        ({ ...item, discountedPercent: 30, count: 0 })

        : ({ ...item, count: 0 })

    );


    useEffect(() => {
        if (location.pathname === '/shop') {

            setActivelink((prev: any) => ({ ...prev, option2: true }))
        } else {

            setActivelink((prev: any) => ({ ...prev, option2: false }))

        }
        if (location.pathname === '/') {

            setActivelink((prev: any) => ({ ...prev, option1: true }))

        }
        else {
            setActivelink((prev: any) => ({ ...prev, option1: false }))
        }
        if (location.pathname === '/contacts') {

            setActivelink((prev: any) => ({ ...prev, option3: true }))

        }
        else {
            setActivelink((prev: any) => ({ ...prev, option3: false }))

        }
        if (location.pathname === '/about') {

            setActivelink((prev: any) => ({ ...prev, option4: true }))

        }
        else {
            setActivelink((prev: any) => ({ ...prev, option4: false }))

        }


    }, [location.pathname])

    useEffect(() => {

        const handleScroll = () => {

            const currentScroll = window.scrollY

            if (currentScroll >= 0 && currentScroll >= previusScroll) {
                setScrolling(true)

            }
            else { setScrolling(false) }

            setPreviusScroll(currentScroll)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };

    }, [previusScroll])


    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if ((!cartButtonRef.current?.contains(event.target as Node)
                && !cartElementRef.current?.contains(event.target as Node))) {

                setCart(false)

            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => { document.removeEventListener('click', handleClickOutside) }

    }, [])


    const totalCount = cart.reduce((acc, curr) => acc + curr.count, 0)

    const totalPrice = cart.reduce((total, item) =>

        total + (item.count * (item.price - (item.price * ((item.discountedPercent || 0) / 100)))), 0)

    const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {

        setInputData(e.target.value)

    }


    const handleActiveCart = () => {

        setCart(prev => !prev)
        setCategories(false)
        setNavMobile(false)
    }

    const handleActiveCategories = () => {

        setCategories(prev => !prev)
        setCart(true)
        setNavMobile(false)
    }

    const handleNewPage = () => {

        setCart(false)
        setNavMobile(false)
        setCategories(false)

    }

    const handleKeyDown = (e: KeyboardEvent) => {

        if (e.key === 'Enter') {

            dispatch(filterInputData({ inputData, newData }))
            navigate('/shop')
        }
    }


    const handleClickInput = () => {

        dispatch(filterInputData({ inputData, newData }))
        navigate('/shop')
    }

    const handleSearchMobileActive = () => {

        setSearchMobileActive(prev => !prev)


    }
    const handleNavMobile = () => {

        setNavMobile(prev => !prev)
        setCart(false)
    }

    return (

        <header className={classNames(styles.header, { [styles['header-active']]: scrolling })}  >
            <div className={styles.header_uppart}>
                <div className={styles.header_uppart_left} >  <RxHamburgerMenu className={styles['burger-menu']} onClick={handleNavMobile} />
                    <img src={webLogo} alt="site_logo" onClick={() => navigate('/')} /></div>
                <div className={styles.header_uppart_center}>
                    <img src={webLogo} alt="site_logo" onClick={() => navigate('/')} />
                    <nav className={styles.header_uppart_center_nav}>
                        <ul className={styles.header_uppart_center_nav_ul} >
                            <li onClick={handleNewPage}><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option1 })} to='/' >Home</NavLink></li>
                            <li onClick={handleNewPage}><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option2 })} to='/shop' onClick={() => dispatch(filteredAll(newData))}>Shop</NavLink></li>
                            <li onClick={handleNewPage}><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option3 })} to='/contacts' >Contacts</NavLink></li>
                            <li onClick={handleNewPage}><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option4 })} to='/about' >About</NavLink></li>
                        </ul> </nav> </div>
                <div className={styles.header_uppart_right}>
                    <p className={styles.help}>Need Help?</p>
                    <p className={styles.number}>+94 423-23-221</p>
                    <span><FaPhoneVolume className={styles.call} /></span>
                </div>
            </div>

            <div className={styles.header_downpart}>

                <div className={styles.header_downpart_left} onClick={handleActiveCategories}>
                    <MdOutlineCategory className={styles['burger-menu']} />
                    <p>categories</p>
                </div>
                <div className={styles.header_downpart_center}>
                    <div className={styles.header_downpart_center_searching}>
                        <input type="text" placeholder='Search over 10.000 products' onChange={handleInputData} onKeyDown={handleKeyDown} />
                        <GoSearch className={styles.search} onClick={handleClickInput} />
                    </div>

                </div>

                <div className={styles.header_downpart_right}>
                    <GoSearch className={styles.search_mobile} onClick={handleSearchMobileActive} />
                    <BsPerson className={styles.avatar} />
                    <IoIosHeartEmpty className={styles.wishlist} />
                    <div className={styles.cart} ref={cartButtonRef}>< IoBagHandleOutline className={styles.cart_icon} onClick={handleActiveCart} />
                        <span className={styles.cart_counter}>{totalCount}</span></div>

                </div>

            </div>

            <div className={classNames(styles.header_categories, { [styles['categories-active']]: isCategories })} onDragCapture={handleActiveCategories}>
                <div className={styles.header_categories_heading}>
                    <p>categories</p>

                    < GrClose className={styles.header_categories_heading_close} onClick={handleActiveCategories} />

                </div>


                <div className={styles.header_categories_content}>

                    <ul className={styles.header_categories_content_list}>

                        <li onClick={() => dispatch(filteredAll(newData))}> <Link onClick={handleNewPage} className={styles.link} to='/shop'>All</Link> </li>
                        <li onClick={() => dispatch(filteredMen(newData))}><Link onClick={handleNewPage} className={styles.link} to='/shop'>Men</Link> </li>
                        <li onClick={() => dispatch(filterWomen(newData))}><Link onClick={handleNewPage} className={styles.link} to='/shop'>Women</Link></li>
                        <li onClick={() => dispatch(filterJewelery(newData))}><Link onClick={handleNewPage} className={styles.link} to='/shop'>Jewelery</Link></li>
                        <li onClick={() => dispatch(filterDiscounted(newData))}><Link onClick={handleNewPage} className={styles.link} to='/shop'>Discounted</Link></li>
                        <li onClick={() => dispatch(filterElectronics(newData))}><Link onClick={handleNewPage} className={styles.link} to='/shop'>Electronics</Link></li>

                    </ul>

                </div>

            </div>

            <div className={classNames(styles.header_cart, { [styles.cart_active]: isCart })} ref={cartElementRef}  >

                <div className={styles.header_cart_heading}>

                    <p className={styles.total}>Subtotal: ${totalPrice.toFixed(2)}</p>
                    < GrClose className={styles.cart} onClick={handleActiveCart} />

                </div>


                <div className={styles.header_cart_content} >
                    {cart.length > 0 ? cart.map((item) =>
                        <CartItem key={item.id} item={item} />) : <img src={searchingImage} className={styles.searcher} />}

                    <p className={styles.header_cart_content_empty}>{cart.length > 0 ? '' : 'Cart is empty'}</p>

                </div>

                {cart.length > 0 && <div className={styles.header_cart_view} onClick={() => navigate('./cart_page')}>
                    <p>view cart</p>
                </div>}

            </div>


            <div className={classNames(styles['header_nav-mobile'], { [styles['nav-mobile-active']]: navMobile })}>
                <div className={styles['header_nav-mobile_heading']}>
                    <h2>trend-look</h2>
                    < GrClose className={styles.close} onClick={handleNavMobile} /></div>
                <nav className={styles['header_nav-mobile_nav']}>

                    <ul className={styles['header_nav-mobile_nav_list']}>
                        <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active-mobile']]: activeLink.option1 })} to='/' >Home</NavLink></li>
                        <li ><NavLink className={classNames(styles.navlink, { [styles['navlink-active-mobile']]: activeLink.option2 })} to='/shop' onClick={() => dispatch(filteredAll(newData))}>Shop</NavLink></li>
                        <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active-mobile']]: activeLink.option3 })} to='/contacts' >Contacts</NavLink></li>
                        <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active-mobile']]: activeLink.option4 })} to='/about' >About</NavLink></li>
                        <li onClick={handleActiveCategories} >categories</li>
                    </ul> </nav> </div>

            <div className={classNames(styles.header_bottom, { [styles['bottom-active']]: searchMobileActive })}>
                <div className={styles.header_bottom_searcher}>
                    <input type="text" placeholder='Search over 10.000 products' onChange={handleInputData} onKeyDown={handleKeyDown} />

                </div>
                <button onClick={handleClickInput} >Search</button >
            </div>
        </header>

    )
}

export default Header
