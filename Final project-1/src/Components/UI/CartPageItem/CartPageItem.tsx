import styles from './cart_page_item.module.scss'
import { RiDeleteBin5Line } from "react-icons/ri";
import { FC } from 'react';
import { IProduct } from '../../Common/Main/Main';
import { useDispatch } from 'react-redux';
import { incrementCount, decrementCount, removeItem } from '../../../Redux/AddToCartSlice';
import ScrollUp from '../ScrollUp/ScrollUp';


interface ICartPageItem {

    item: IProduct;

}


const CartPageItem: FC<ICartPageItem> = ({ item }) => {
    const discountedPrice = Number((item.price - (item.price * item.discountedPercent / 100)).toFixed(2))

    const dispatch = useDispatch()

    const handleIncrement = () => {

        dispatch(incrementCount(item))


    }

    const handleDecrement = () => {

        dispatch(decrementCount(item))

    }
    const handleRemoveItem = () => {

        dispatch(removeItem(item))

    }

    return (

        <>
            <div className={styles.item}>

                <div className={styles.item_product}>
                    <div className={styles.item_product_image}><img src={item.image} alt="product_image" /></div>
                    <p className={styles.product_title}>{item.title.slice(0, 18)}</p>
                </div>

                {item.discountedPercent ?
                    <p className={styles.item_price}>${discountedPrice} <span>{item.price.toFixed(2)}</span> </p> :
                    <p className={styles.item_price}>${item.price.toFixed(2)}</p>}

                <div className={styles.item_buttons}>
                    <button onClick={handleDecrement}>-</button><p>{item.count}</p><button onClick={handleIncrement}>+</button>
                </div>
                {item.discountedPercent ? <p className={styles.item_subtotal}>${item.count * discountedPrice}<span>{(item.count*item.price).toFixed(2)}</span> </p> :

                    <p className={styles.item_subtotal}>${(item.count * (item.price)).toFixed(2)}</p>}

                <button className={styles.item_delete} onClick={handleRemoveItem}><RiDeleteBin5Line /></button>

<ScrollUp/>

            </div>

        </>
    )
}

export default CartPageItem