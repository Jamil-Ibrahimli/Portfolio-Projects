
import styles from './hot_card.module.scss'
import { FC } from 'react';
import StarRating from '../StarRating/StarRating';
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/AddToCartSlice';
import { IProduct } from '../../Common/Main/Main';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";


interface IHotCard {

    image: string;
    price: number;
    title: string;
    item: IProduct;
    discountedPercent: number;
    notify: any;
}


const HotCard: FC<IHotCard> = ({ image, title, price, discountedPercent, item, notify }) => {
    const discountedPrice = price - (price * (discountedPercent / 100))
    const dispatch = useDispatch()

    const handleAddtoCart = () => {
   
         dispatch(addToCart(item))

        notify()

    }

    return (
        <>
            <div className={styles.card}>

                <div className={styles.card_item}>
                    {item.discountedPercent && <p className={styles.discount}>-30%</p>}
                    <p className={styles['add-wishlist']}><CiHeart className={styles['add-wishlist_icon']} /></p>
                    <p className={styles['add-cart']} onClick={handleAddtoCart}>
                        <CiShoppingCart className={styles['add-cart_icon']} /></p>
                    <Link to={`prod_detail/${item.id}`}> <img src={image} alt="ItemImage" /></Link>

                </div>


                <StarRating item={item} />
                <div className={styles.card_title}>

                    <h4>{title.slice(0, 13)}</h4>

                </div>

                <div className={styles.card_price}>

                    <p className={styles.card_price_discounted}>${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}</p>
                    {discountedPrice ? <p className={styles.card_price_original}>${price.toFixed(2)}</p> : null}

                </div>
            </div>
        </>
    )
}

export default HotCard
