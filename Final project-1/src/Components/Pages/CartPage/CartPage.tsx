import React from 'react'
import styles from './cart_page.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/Store'
import CartPageItem from '../../UI/CartPageItem/CartPageItem'



const CartPage = () => {

    const cart = useSelector((state: RootState) => state.AddToCartReducer.cart)
    const dispatch = useDispatch()


    return (

        <div className={styles.container}>

            <div className={styles['cart-page']}>
                <span> Home {'>'} Shop {'>'} Details</span>
                <div className={styles['cart-page_heading']}> <h3>Cart page</h3> </div>
                <div className={styles['cart-page_content']}>
                    <div className={styles['cart-page_content_titles']}>
                        <div className={styles.product}> <p>product</p></div>

                        <p className={styles.price}>price</p>
                        <p className={styles.quantity}>quantity</p>
                        <p className={styles.subtotal}>subtotal</p>

                    </div>
                    <div className={styles['cart-page_content_items']}>
                     

                     {cart.map((item)=>  <CartPageItem key={item.id} item={item}/>)}


                    </div>

                </div>

            </div>

            <div className={styles.checkout}></div>

        </div>
    )
}


export default CartPage
