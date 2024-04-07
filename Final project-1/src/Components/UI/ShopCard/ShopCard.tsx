
import styles from './shop_card.module.scss';
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/AddToCartSlice';
import StarRating from '../StarRating/StarRating';
import { IProduct } from '../../Common/Main/Main';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IShopCard {
    item: IProduct;
    image: string;
    title: string;
    price: number;
    discountedPercent: number;

}


const ShopCard: FC<IShopCard> = ({ item, image, title, price, discountedPercent }) => {
    const discountedPrice = price - (price * (discountedPercent / 100))
    const dispatch = useDispatch()


    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_item}>
                    {item.discountedPercent ? <p className={styles.discount}>-30%</p> :
                        price > 100 ? <p className={styles.new}>new</p> : <p className={styles.hot}>hot</p>}

                    <p className={styles['add-wishlist']}><FaRegHeart className={styles['add-wishlist_icon']} /></p>
                    <p className={styles['add-cart']} onClick={() => dispatch(addToCart(item))}>
                        <CiShoppingCart className={styles['add-cart_icon']} /></p>

                   <Link to={`/prod_detail/${item.id}`}> <img src={image} alt="ItemImage" /> </Link>
                   
                </div>

                <StarRating item={item} />
                <div className={styles.card_title}>

                    <h4>{title.slice(0, 16)}</h4>

                </div>

                <div className={styles.card_price}>

                    <p className={styles.card_price_discounted}>${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}</p>
                    {discountedPrice ? <p className={styles.card_price_original}>${price.toFixed(2)}</p> : null}

                </div>


            </div>


        </>
    )
}

export default ShopCard
