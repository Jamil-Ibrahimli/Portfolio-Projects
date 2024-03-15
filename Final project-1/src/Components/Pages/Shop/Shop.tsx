import React, { useEffect } from 'react';
import styles from './shop.module.scss';
import { IProduct } from '../../Common/Main/Main';
import { FC } from 'react';
import ShopCard from '../../UI/ShopCard/ShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import {
    filteredAll, filteredMen,
    filterWomen, filterJewelery, filterElectronics,
    filterDiscounted
} from '../../../Redux/CategoriesSlice';


export interface IShop {

    data: IProduct[];

}

const Shop: FC<IShop> = ({ data }) => {

    const newData = data.map((item) => item.rating.count < 200 ?

        ({ ...item, discountedPercent: 30 }) : item

    );

    const dispatch = useDispatch()


    const filtered = useSelector((state: RootState) => state.CategoriesReducer.filteredData)



console.log(filtered)
    return (
        <div className={styles.container}>

            <div className={styles.banner}>
            </div>
            <div><button onClick={() => dispatch(filteredAll(newData))}>All</button>
                <button onClick={() => dispatch(filteredMen(newData))}>Men</button>
                <button onClick={() => dispatch(filterWomen(newData))}>Women</button>
                <button onClick={() => dispatch(filterJewelery(newData))}>Jewelery</button>
                <button onClick={() => dispatch(filterElectronics(newData))}>Electronics</button>
                <button onClick={() => dispatch(filterDiscounted(newData))}>Discounted</button>

            </div>
            <div className={styles.products}>

                <div className={styles.products_container}>

                    <div className={styles.products_container_cards}>
                        {(filtered.length === 0 ? newData : filtered).map((item) => <ShopCard key={item.id} image={item.image}
                            price={item.price}
                            title={item.title}
                            item={item}
                            discountedPercent={item.discountedPercent}
                        />)}

                    </div>
                </div>


            </div>


        </div>
    )

}

export default Shop
