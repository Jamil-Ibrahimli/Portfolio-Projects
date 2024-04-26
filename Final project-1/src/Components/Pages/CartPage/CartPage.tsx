
import styles from './cart_page.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/Store'
import CartPageItem from '../../UI/CartPageItem/CartPageItem'
import { useNavigate } from 'react-router'



const CartPage = () => {

    const cart = useSelector((state: RootState) => state.AddToCartReducer.cart)
    const navigate = useNavigate()

    const subTotalPrice = cart.reduce((total, item) =>

        total + (item.count * ((item.price) - (item.price * ((item.discountedPercent || 0) / 100)))), 0).toFixed(2)

    const shippingPrice = 5

    let totalPrice = (parseFloat(subTotalPrice) + shippingPrice).toFixed(2)

    

    console.log(cart)
    return (

        <div className={styles.container}>

            <div className={styles['cart-page']}>
                <span onClick={() => navigate('/')}> Home {'>'} </span><span onClick={() => { navigate('/shop') }}>Shop</span>
                <div className={styles['cart-page_heading']}> <h3>Cart page</h3> </div>
                <div className={styles['cart-page_content']}>
                    <div className={styles['cart-page_content_titles']}>
                        <div className={styles.product}> <p>product</p></div>

                        <p className={styles.price}>price</p>
                        <p className={styles.quantity}>quantity</p>
                        <p className={styles.subtotal}>subtotal</p>

                    </div>
                    <div className={styles['cart-page_content_items']}>

                        {cart.map((item) => <CartPageItem key={item.id} item={item} />)}

                    </div>

                </div>
                <div className={styles.checkout}>
                    <div className={styles.checkout_subtotal}><p>subtotal</p><span>{subTotalPrice}</span></div>
                    <div className={styles.checkout_shipping}><p>shipping</p><span>$5.00</span></div>
                    <div className={styles.checkout_total}><p>Total</p><span>${totalPrice}</span></div>
                    <button className={styles.checkout_proceed}>Proceed to Checkout</button>

                </div>

            </div>


        </div>
    )
}


export default CartPage
