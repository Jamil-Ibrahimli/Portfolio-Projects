import React, { useEffect, useState } from 'react';
import styles from './shop.module.scss';
import { IProduct } from '../../Common/Main/Main';
import { FC } from 'react';
import ShopCard from '../../UI/ShopCard/ShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import {
    filteredAll, filteredMen,
    filterWomen, filterJewelery, filterElectronics,
    filterDiscounted, filterPriceTill50
} from '../../../Redux/CategoriesSlice';
import { LiaFilterSolid } from "react-icons/lia";
import { HiOutlineSortAscending } from "react-icons/hi";
import classNames from 'classnames';

export interface IShop {

    data: IProduct[];

}

const Shop: FC<IShop> = ({ data }) => {

    const newData = data.map((item) => item.rating.count < 200 ?

        ({ ...item, discountedPercent: 30 })

        : item

    );

    const category = useSelector((state: RootState) => state.CategoriesReducer.filteredData)
    const [sortActive, setSortActive] = useState(false)
    const [filterActive, setFilterActive] = useState(false)
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState<any>({

        option1: false,
        option2: false,
        option3: false,
        option4: false

    });

    const handleCheckboxChange = (option: string) => {

        setFilterOptions({
            ...filterOptions,
            [option]: !filterOptions[option]

        })

    }

    const filteredData = (category.length === 0 ? newData : category).filter((item) => {
        const discountedPrice = item.price - (item.price * item.discountedPercent / 100)

        if (filterOptions.option1 && (item.discountedPercent ? (discountedPrice >= 0 && discountedPrice <= 50) : (item.price > 0 && item.price <= 50))) return true;
        if (filterOptions.option2 && (item.discountedPercent ? (discountedPrice >= 50 && discountedPrice <= 100) : (item.price > 50 && item.price <= 100))) return true;
        if (filterOptions.option3 && (item.discountedPercent ? (discountedPrice >= 100 && discountedPrice <= 300) : (item.price > 100 && item.price <= 300))) return true;
        if (filterOptions.option4 && (item.discountedPercent ? (discountedPrice >= 300 && discountedPrice <= 700) : (item.price > 300 && item.price <= 700))) return true;

    })

    console.log(filteredData)


    const handleFilterBoard = () => {
        setFilterActive(prev => !prev)
    }
    const handleSortBoard = () => {
        setSortActive(prev => !prev)
    }

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [category])




    return (

        <div className={styles.container} >

            <div className={styles.banner}>
            </div>
            <div className={styles.categories}>
                <div className={styles.sorting} onClick={handleSortBoard}><div className={classNames(styles['sorting-board'],
                    { [styles['sorting-board-active']]: sortActive })}>
                    <ul><li>price: high to</li>
                        <li>price: low to high</li>
                        <li>rating: high to</li>
                        <li>rating: low to high</li></ul>

                </div> <HiOutlineSortAscending className={styles.sorting_icon} /> Sort by</div>
                <p onClick={() => dispatch(filteredAll(newData))}>All</p>
                <p onClick={() => dispatch(filteredMen(newData))}>Men</p>
                <p onClick={() => dispatch(filterWomen(newData))}>Women</p>
                <p onClick={() => dispatch(filterJewelery(newData))}>Jewelery</p>
                <p onClick={() => dispatch(filterElectronics(newData))}>Electronics</p>
                <p onClick={() => dispatch(filterDiscounted(newData))}>Discounted</p>

                <div className={styles.filtration} >  <div className={classNames(styles['filtration-board'],
                    { [styles['filtration-board-active']]: filterActive })}>
                    <ul>
                        <li> <label><input type="checkbox" onChange={() => handleCheckboxChange('option1')} /> price: $0 - $50</label></li>
                        <li> <label><input type="checkbox" onChange={() => handleCheckboxChange('option2')} /> price: $50 - $100</label></li>
                        <li> <label><input type="checkbox" onChange={() => handleCheckboxChange('option3')} /> price: $100 - $300</label></li>
                        <li> <label><input type="checkbox" onChange={() => handleCheckboxChange('option4')} /> price: $300 - $700</label></li>
                    </ul>
                </div>

                    <div onClick={handleFilterBoard} ><LiaFilterSolid className={styles.filtration_icon} /> Filter </div> </div>

            </div>

            <div className={classNames(styles.products, { [styles['products-active']]: sortActive || filterActive })}>

                <div className={styles.products_container}>

                    <div className={styles.products_container_cards}>
                        {(category.length === 0 ? newData : filteredData.length > 0 ? filteredData : category).map((item) =>
                            <ShopCard key={item.id} image={item.image}
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
