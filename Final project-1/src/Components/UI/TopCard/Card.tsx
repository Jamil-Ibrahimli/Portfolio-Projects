import StarRating from '../StarRating/StarRating';
import styles from './card.module.scss'
import { FC } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import { addToCart } from '../../../Redux/AddToCartSlice';
import { IProduct } from '../../Common/Main/Main';

interface ICard {

    image: string;
    price: number;
    title: string;
    item: IProduct;
    discountedPercent: number;
}


const Card: FC<ICard> = ({ image, price, title, item,discountedPercent }) => {

    const discountedPrice = price - (price * (discountedPercent / 100))
    const cart = useSelector((state: RootState) => state.AddToCartReducer.cart)
    const dispatch = useDispatch()
    console.log(cart)


    return (

        <>
            <div className={styles.card}>
                <div className={styles.card_item}>
                    {item.discountedPercent ? <p className={styles.discount}>-30%</p> :
                        price > 100 ? <p className={styles.new}>new</p> : <p className={styles.hot}>hot</p>}
                    <p className={styles['add-wishlist']}><FaRegHeart className={styles['add-wishlist_icon']} /></p>
                    <p className={styles['add-cart']} onClick={() => dispatch(addToCart(item))}>
                        <CiShoppingCart className={styles['add-cart_icon']} /></p>

                    <img src={image} alt="ItemImage" />
                </div>

                <StarRating item={item} />
                <div className={styles.card_title}>

                    <h4>{title.slice(0, 18)}</h4>

                </div>

                <div className={styles.card_price}>

                    <p className={styles.card_price_discounted}>${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}</p>
                    {discountedPrice ? <p className={styles.card_price_original}>${price.toFixed(2)}</p> : null}

                </div>
            </div>

        </>

    )
}

export default Card