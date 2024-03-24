import { Link } from 'react-router-dom'
import { IProduct } from '../../Common/Main/Main'
import styles from './card_related.module.scss'
import React, { FC } from 'react'

interface ICardRelated {

    item: IProduct

}


const CardRelated: FC<ICardRelated> = ({ item }) => {
    const discountedPrice = item.price - (item.price * (item.discountedPercent / 100))

    return (

        <div className={styles.card}>
            <div className={styles.card_item}>


                <Link to={`/prod_detail/${item.id}`}> <img src={item.image} alt="ItemImage" /> </Link>
            </div>


        </div>

    )
}

export default CardRelated
