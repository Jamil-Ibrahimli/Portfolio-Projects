import { useEffect, useState } from 'react';
import styles from './product_details.module.scss';
import { IProduct } from '../../Common/Main/Main';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BsCashCoin } from "react-icons/bs";
import { addToCart } from '../../../Redux/AddToCartSlice';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import CardRelated from '../../UI/CardRelated/CardRelated';
import { MdDiscount } from "react-icons/md";


interface IProductDetails {
    data: IProduct[];

}

const ProductDetails: FC<IProductDetails> = ({ data }) => {
    const [countActive, setCountActive] = useState(false)
    const [countState, setCountState] = useState(0)
    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?

        ({ ...item, discountedPercent: 30, count: countState })

        : ({ ...item, count: countState })

    );


    const { id } = useParams();
    const dispatch = useDispatch();
    const itemDetail = newData.find((item) => item.id === Number(id));
    const filterRelated = newData.filter((item) =>
        (item.category === itemDetail?.category) && item.id !== itemDetail?.id);
    const discountedPrice = itemDetail &&
        (itemDetail.price - (itemDetail.price * itemDetail.discountedPercent / 100));
    const navigate = useNavigate()



    const handleIncrement = () => {

        setCountState((prev) => prev += 1)
        setCountActive(false)

    }

    const handleDecrement = () => {

        if (countState > 0) {

            setCountState((prev) => prev -= 1)

        }

    }

    const sendToCart = () => {

        if (countState > 0 && itemDetail) {
            dispatch(addToCart(itemDetail))
            setCountState(0)
            setCountActive(false)
        }
        else {

            setCountActive(true)
        }
    }

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [id])

    return (

        <div className={styles.container}>
            <div className={styles.details}>
                <p className={styles.details_path}>
                    <span onClick={() => navigate('/')}> Home</span> {'>'} <span onClick={() => navigate('/shop')}>Shop</span></p>
                <div className={styles.details_title}><h2>Armor Air X Fear</h2></div>

                <div className={styles.details_content}>
                    <div className={styles.details_content_image}>

                        {itemDetail?.discountedPercent ?
                            <div className={styles.discount}><MdDiscount className={styles.icon} /><span>-30%</span></div> :
                            itemDetail && itemDetail.price > 100 ?
                                <div className={styles.new}><MdDiscount className={styles.icon} /><span>new</span></div> :
                                <div className={styles.hot}><MdDiscount className={styles.icon} /><span>hot</span></div>}
                        {itemDetail ? <img src={itemDetail.image} alt="product image" /> :
                            <p>No details for the provided ID</p>}</div>

                    <div className={styles.details_content_info}>

                        <div className={styles.details_content_info_description}>
                            <h3>Details</h3>
                            {itemDetail ? <p>{itemDetail.description}</p> : null}</div>
                        <div className={styles.details_content_info_options}>
                            <div className={styles.details_content_info_options_content}>

                                <div className={styles.toppart}>
                                    <p className={styles.quantity}>quantity</p>
                                    <span className={classNames(styles.alert, { [styles['alert-active']]: countActive })}>
                                        Choose a quantity *</span>
                                    <div className={classNames(styles.count, { [styles['count-active']]: countActive })}>
                                        <button onClick={handleDecrement}>-</button>
                                        <p>{countState}</p> <button onClick={handleIncrement}>+</button> </div>
                                </div>
                                <div className={styles.centerpart}>
                                    {itemDetail?.discountedPercent ? <div className={styles.centerpart_prices}>
                                        <p className={styles['new-price']}>${discountedPrice?.toFixed(2)}</p>
                                        <p className={styles.percent}>-30%</p>
                                        <p className={styles['old-price']}>{itemDetail.price.toFixed(2)}</p></div> :
                                        <div className={styles.centerpart_prices}>
                                            <p className={styles['new-price']}>${itemDetail?.price.toFixed(2)}</p></div>}
                                    {itemDetail ? <button className={styles.centerpart_addcart} onClick={sendToCart}>
                                        add to cart</button> : null}
                                </div>
                                <div className={styles.bottompart}>
                                    <button className={styles.bottompart_buynow}>buy now <BsCashCoin /></button>
                                    <button className={styles.bottompart_addwish}>add to wish</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.related}>
                <div className={styles.related_heading}><h3>Related</h3><p>You may also like similar products</p></div>
                <div className={styles.related_items}>

                    {filterRelated.map((item) => <CardRelated key={item.id} item={item} />)}

                </div>

            </div>

        </div>
    )
}

export default ProductDetails