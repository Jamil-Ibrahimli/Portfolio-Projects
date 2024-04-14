
import styles from './cart_item.module.scss'
import { IProduct } from '../../Common/Main/Main';
import { FC, MouseEvent} from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeItem, incrementCount, decrementCount } from '../../../Redux/AddToCartSlice';
import { useDispatch } from 'react-redux';


interface ICartItem {

    item: IProduct

}


const CartItem: FC<ICartItem> = ({ item }) => {

    let originalPrice = item.price
    let discountedPrice = item.price - item.price * (item.discountedPercent / 100)
    const dispatch = useDispatch()

const handleRemoveItem=(event:MouseEvent)=>{


    dispatch(removeItem(item))
    event.stopPropagation()
}

    return (
        <>
            <div className={styles['cart-item']}>
                <div className={styles['cart-item_image']}>
                    <img src={item.image} alt="cartImage" />
                </div>
                <div className={styles['cart-item_center']}>
                    <p className={styles.title}>{item.title.slice(0, 25)}</p>
                    <div className={styles.count}>
                        <button onClick={() => dispatch(decrementCount(item))}>-</button> <p>{item.count}</p> <button onClick={() => dispatch(incrementCount(item))}>+</button>
                    </div>
                </div>
                <div className={styles['cart-item_left']}>
                    <button className={styles.delete}>
                        <RiDeleteBin5Line onClick={handleRemoveItem} /></button>

                    {item.discountedPercent ?
                        <>
                            <p className={styles['price-original']}>${(originalPrice * item.count).toFixed(2)}</p>
                            <p className={styles['price-discounted']}>${(discountedPrice * item.count).toFixed(2)}</p>

                        </> :
                        <p className={styles.price}>${(originalPrice * item.count).toFixed(2)}</p>
                    }
                </div>

            </div>
        </>
    )
}


export default CartItem
