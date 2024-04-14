import StarRating from '../StarRating/StarRating';
import styles from './card.module.scss'
import { FC } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/AddToCartSlice';
import { IProduct } from '../../Common/Main/Main';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";


interface ICard {

    image: string;
    price: number;
    title: string;
    item: IProduct;
    discountedPercent: number;
    notify:any;
}


const Card: FC<ICard> = ({ image, price, title, item, discountedPercent,notify }) => {

    const discountedPrice = price - (price * (discountedPercent / 100))

    const dispatch = useDispatch()

const handleAddProduct=()=>{

    dispatch(addToCart(item))
 
    notify()

}

    return (

        <>
            <div className={styles.card}>
                <div className={styles.card_item}>
                    {item.discountedPercent &&<p className={styles.discount}>-30%</p> }
                    <p className={styles['add-wishlist']}><CiHeart className={styles['add-wishlist_icon']} /></p>
                    <p className={styles['add-cart']} onClick={handleAddProduct } >
                        <CiShoppingCart className={styles['add-cart_icon']}/></p>
                    <Link to={`prod_detail/${item.id}`}> <img src={image} alt="ItemImage" /> </Link>
                </div>

                <StarRating item={item} />
                <div className={styles.card_title}>

                    <h4>{title.slice(0, 18)}</h4>

                </div>

                <div className={styles.card_price}>

                    <p className={styles.card_price_discounted}>${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}</p>
                    {discountedPrice ? <p className={styles.card_price_original}>${price.toFixed(2)}</p> : null}

                </div>
                <p className={styles['add-wishlist-mobile']}><CiHeart className={styles['add-wishlist-mobile_icon']} /></p>
                <p className={styles['add-cart-mobile']} onClick={() => dispatch(addToCart(item))}><CiShoppingCart className={styles['add-cart-mobile_icon']}  /></p>
            </div>

        </>

    )
}

export default Card