import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import styles from './header.module.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
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



const Header = () => {

    const cart = useSelector((state: RootState) => state.AddToCartReducer.cart)
    const [isCart, setCart] = useState(false);
    const [isCategories, setCategories] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [inputData, setInputData] = useState('');
    const { data } = useContext(DataContext);
    const location = useLocation()
    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?

        ({ ...item, discountedPercent: 30, count: 0 })

        : ({ ...item, count: 0 })

    );
    const [activeLink, setActivelink] = useState<any>({

        option1: false,
        option2: false,
        option3: false,
        option4: false

    });


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

    }, [location.pathname])



    // const handleActiveLink = (option: string) => {

    //     setActivelink((prev: any) =>

    //         ({ [option]: !prev[option] })

    //     )

    //     setActivelink((prev: any) => {

    //         for (const key in prev) {
    //             if (key !== option) {

    //                 prev[key] = false

    //             }
    //         }

    //         return prev
    //     })

    //     dispatch(filteredAll(newData))
    // }


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY) {
                setScrolling(true)
            } else { setScrolling(false) }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };

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
    }

    const handleActiveCategories = () => {

        setCategories(prev => !prev)
        setCart(false)

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


    return (

        <header className={classNames(styles.header, { [styles['header-active']]: scrolling })}>
            <div className={styles.header_uppart}>
                <div className={styles.header_uppart_left} onClick={() => navigate('/')}><h2>Trend-Look</h2></div>
                <div className={styles.header_uppart_center}>
                    <nav className={styles.header_uppart_center_nav}>
                        <ul className={styles.header_uppart_center_nav_ul}>
                            <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option1 })} to='/' >Home</NavLink></li>
                            <li ><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option2 })} to='/shop' onClick={() => dispatch(filteredAll(newData))}>Shop</NavLink></li>
                            <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option3 })} to='/contacts' >Contacts</NavLink></li>
                            <li><NavLink className={classNames(styles.navlink, { [styles['navlink-active']]: activeLink.option4 })} to='/about' >About</NavLink></li>
                        </ul> </nav> </div>
                <div className={styles.header_uppart_right}>
                    <p className={styles.help}>Need Help?</p>
                    <p className={styles.number}>+94 423-23-221</p>
                </div>
            </div>

            <div className={styles.header_downpart}>

                <div className={styles.header_downpart_left} onClick={handleActiveCategories} >
                    <RxHamburgerMenu className={styles['burger-menu']} />
                    <p>categories</p>
                </div>
                <div className={styles.header_downpart_center}>
                    <div className={styles.header_downpart_center_searching}>
                        <input type="text" placeholder='Search over 10.000 products' onChange={handleInputData} onKeyDown={handleKeyDown} />
                        <GoSearch className={styles.search} onClick={handleClickInput} />
                    </div>

                </div>

                <div className={styles.header_downpart_right}>
                    <RxAvatar className={styles.avatar} />
                    <FaRegHeart className={styles.wishlist} />
                    <div className={styles.cart}><HiOutlineShoppingBag className={styles.cart_icon} onClick={handleActiveCart} />
                        <span className={styles.cart_counter}>{totalCount}</span></div>

                </div>


            </div>

            <div className={classNames(styles.header_categories, { [styles['categories-active']]: isCategories })} onMouseLeave={handleActiveCategories}>

                <div className={styles.header_categories_content}>

                    <ul className={styles.header_categories_content_list}>

                        <li > <Link className={styles.link} to='/shop'>All</Link> </li>
                        <li onClick={() => dispatch(filteredMen(newData))}><Link className={styles.link} to='/shop'>Men</Link> </li>
                        <li onClick={() => dispatch(filterWomen(newData))}><Link className={styles.link} to='/shop'>Women</Link></li>
                        <li onClick={() => dispatch(filterJewelery(newData))}><Link className={styles.link} to='/shop'>Jewelery</Link></li>
                        <li onClick={() => dispatch(filterDiscounted(newData))}><Link className={styles.link} to='/shop'>Discounted</Link></li>
                        <li onClick={() => dispatch(filterElectronics(newData))}><Link className={styles.link} to='/shop'>Electronics</Link></li>

                    </ul>

                </div>

            </div>

            <div className={classNames(styles.header_cart, { [styles.cart_active]: isCart })} onMouseLeave={handleActiveCart} >

                <div className={styles.header_cart_heading}>

                    <p className={styles.total}>Subtotal: ${totalPrice.toFixed(2)}</p>
                    < GrClose className={styles.cart} onClick={handleActiveCart} />

                </div>

                <div className={styles.header_cart_content}>

                    {cart.length > 0 ? cart.map((item) =>
                        <CartItem key={item.id} item={item} />) : <img src={searchingImage} className={styles.searcher} />}

                    <p className={styles.header_cart_content_empty}>{cart.length > 0 ? '' : 'Cart is empty'}</p>

                </div>

                <div className={styles.header_cart_view} onClick={() => navigate('./cart_page')}>
                    <p>view cart</p>
                </div>

            </div>


        </header>
    )
}

export default Header
