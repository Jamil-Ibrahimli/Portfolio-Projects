import  { useState } from 'react'
import styles from './star_rating.module.scss'
import { FC } from 'react'
import { IoStar } from "react-icons/io5";
import { IProduct } from '../../Common/Main/Main';


interface IStarRating {

    item: IProduct;
}


const StarRating: FC<IStarRating> = ({ item }) => {

    const [rating, setRating] = useState(item.rating.rate)


    return (

        <>

            <div className={styles.rating}>{[...Array(5)].map((star, index) => {

                const currentRate = index + 1

                return (

                    <IoStar key={index} className={styles.rating_star}
                        color={currentRate <= (rating) ?
                            'orange' : 'gray'} onClick={() => setRating(currentRate)} />

                )
            }

            )} </div>
        </>
    )
}

export default StarRating
