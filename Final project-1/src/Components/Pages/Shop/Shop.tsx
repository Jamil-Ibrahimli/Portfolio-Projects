import { useEffect, useState } from 'react';
import styles from './shop.module.scss';
import { IProduct } from '../../Common/Main/Main';
import { FC } from 'react';
import ShopCard from '../../UI/ShopCard/ShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import {
    filteredAll, filteredMen,
    filterWomen, filterJewelery, filterElectronics,
    filterDiscounted,
} from '../../../Redux/CategoriesSlice';
import { LiaFilterSolid } from "react-icons/lia";
import { HiOutlineSortAscending } from "react-icons/hi";
import classNames from 'classnames';
import womenBanner from '../../../assets/images/women_collection.png';
import { useLocation } from 'react-router';
export interface IShop {

    data: IProduct[];

}

const Shop: FC<IShop> = ({ data }) => {

    const newData = data.map((item) => item.rating.count < 200 && item.rating.rate < 3.7 ?

        ({ ...item, discountedPercent: 30, count: 0 })

        : ({ ...item, count: 0 })

    );

    const category = useSelector((state: RootState) => state.CategoriesReducer.filteredData)
    const [sortActive, setSortActive] = useState(false)
    const [filterActive, setFilterActive] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation()
    const [filterOptions, setFilterOptions] = useState<any>({

        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,

    });


    const [sortingOptions, setSortingOptions] = useState<any>({

        sortOption1: false,
        sortOption2: false,
        sortOption3: false,
        sortOption4: false,
        sortOption5: false
    })

    const handleSortingChechbox = (option: string) => {

        setSortingOptions((prev: any) => ({

            [option]: !prev[option]

        }))


        setSortingOptions((prev: any) => {

            for (const key in prev) {
                if (key !== option) {

                    prev[key] = false

                }


            }
            return prev
        })

    }

    useEffect(() => {

        setTimeout(() => {

            if (window.innerWidth <= 1400 && (location.pathname = '/shop') && window.innerWidth >= 800) {

                window.scrollTo({ top: 600, left: 0, behavior: 'smooth' })

            }

        }, 2000)

    }, [])


    const handleFilterCheckbox = (option: string) => {

        setFilterOptions({
            ...filterOptions,
            [option]: !filterOptions[option]

        })


    }

    const filteredData = (category.length === 0 ? newData : category).filter((item) => {

        const discountedPrice = item.price - (item.price * item.discountedPercent / 100)

        if (filterOptions.option1 && (item.discountedPercent ?
            (discountedPrice >= 0 && discountedPrice <= 20) :
            (item.price > 0 && item.price <= 20))) return true;
        if (filterOptions.option2 && (item.discountedPercent ?
            (discountedPrice >= 20 && discountedPrice <= 50) :
            (item.price > 20 && item.price <= 50))) return true;
        if (filterOptions.option3 && (item.discountedPercent ?
            (discountedPrice >= 50 && discountedPrice <= 100) :
            (item.price > 50 && item.price <= 100))) return true;
        if (filterOptions.option4 && (item.discountedPercent ?
            (discountedPrice >= 100 && discountedPrice <= 300) :
            (item.price > 100 && item.price <= 300))) return true;
        if (filterOptions.option5 && (item.discountedPercent ?
            (discountedPrice >= 300 && discountedPrice <= 700) :
            (item.price > 300 && item.price <= 700))) return true;

    })


    const sortedData = [...(category.length === 0 ? (filteredData.length === 0 ? newData : filteredData) : (filteredData.length === 0 ? category : filteredData))].sort((a, b) => {
        const discountedPriceA = (a.price * a.discountedPercent / 100) || 0
        const discountedPriceB = (b.price * b.discountedPercent / 100) || 0

        if (sortingOptions.sortOption1) { return ((a.price - discountedPriceA) - (b.price - discountedPriceB)) }
        if (sortingOptions.sortOption2) { return ((b.price - discountedPriceB) - (a.price - discountedPriceA)) }
        if (sortingOptions.sortOption3) { return (b.rating.rate - a.rating.rate) }
        if (sortingOptions.sortOption4) { return (a.rating.rate - b.rating.rate) }
        if (sortingOptions.sortOption5) { return (a.title.localeCompare(b.title)) }

        return 0

    }

    )

    const handleFilterBoard = () => {
        setFilterActive(prev => !prev)
        setSortActive(false)
    }
    const handleSortBoard = () => {
        setSortActive(prev => !prev)
        setFilterActive(false)
    }

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [category])


    return (

        <div className={styles.container} >

            <div className={styles.banner}>
                <img src={womenBanner} alt="womenBanner" />
                <div className={styles['banner_cover']}>
                    <div className={styles.banner_cover_info}>

                        <p>Explore Quality </p>
                        <p>Upgrade Your Style</p>


                    </div>
                </div>
            </div>
            <div className={styles.categories}>
                <div className={styles.sorting} ><div className={classNames(styles['sorting-board'],
                    { [styles['sorting-board-active']]: sortActive })}>
                    <ul>
                        <li><label><input type="checkbox" checked={sortingOptions.sortOption5} onChange={() => handleSortingChechbox('sortOption5')} /> name</label></li>
                        <li><label><input type="checkbox" checked={sortingOptions.sortOption1} onChange={() => handleSortingChechbox('sortOption1')} /> price: low to high</label></li>
                        <li><label><input type="checkbox" checked={sortingOptions.sortOption2} onChange={() => handleSortingChechbox('sortOption2')} /> price: high to low</label></li>
                        <li><label><input type="checkbox" checked={sortingOptions.sortOption3} onChange={() => handleSortingChechbox('sortOption3')} /> rating: high to low</label></li>
                        <li><label><input type="checkbox" checked={sortingOptions.sortOption4} onChange={() => handleSortingChechbox('sortOption4')} /> rating: low to high</label></li>

                    </ul>

                </div><div onClick={handleSortBoard}><HiOutlineSortAscending className={styles.sorting_icon} /> Sort by</div>
                </div>
                <div className={styles.filtration} >  <div className={classNames(styles['filtration-board'],
                    { [styles['filtration-board-active']]: filterActive })}>
                    <ul>
                        <li> <label>
                            <input type="checkbox" onChange={() => handleFilterCheckbox('option1')} /> price: $0 - $20
                        </label></li>
                        <li> <label>
                            <input type="checkbox" onChange={() => handleFilterCheckbox('option2')} /> price: $20 - $50
                        </label></li>
                        <li> <label>
                            <input type="checkbox" onChange={() => handleFilterCheckbox('option3')} /> price: $50 - $100
                        </label></li>
                        <li> <label>
                            <input type="checkbox" onChange={() => handleFilterCheckbox('option4')} /> price: $100 - $300
                        </label></li>
                        <li> <label>
                            <input type="checkbox" onChange={() => handleFilterCheckbox('option5')} /> price: $300 - $700
                        </label></li>
                    </ul>
                </div>

                    <div onClick={handleFilterBoard} ><LiaFilterSolid className={styles.filtration_icon} /> Filter </div>
                </div>

                <p onClick={() => dispatch(filteredAll(newData))}>All</p>
                <p onClick={() => dispatch(filterElectronics(newData))}>Electronics</p>
                <p onClick={() => dispatch(filterWomen(newData))}>Women</p>
                <p onClick={() => dispatch(filteredMen(newData))}>Men</p>
                <p onClick={() => dispatch(filterJewelery(newData))}>Jewelery</p>
                <p onClick={() => dispatch(filterDiscounted(newData))}>Discounted</p>


            </div>

            <div className={classNames(styles.products, { [styles['products-active']]: sortActive || filterActive })}>

                <div className={styles.products_container}>

                    <div className={styles.products_container_cards}>
                        {
                            sortedData.length > 0 ? sortedData.map((item) =>
                                <ShopCard key={item.id} image={item.image}
                                    price={item.price}
                                    title={item.title}
                                    item={item}
                                    discountedPercent={item.discountedPercent}
                                />) :
                                filteredData.length > 0 ? filteredData.map((item) =>
                                    <ShopCard key={item.id} image={item.image}
                                        price={item.price}
                                        title={item.title}
                                        item={item}
                                        discountedPercent={item.discountedPercent}
                                    />) :

                                    category.length > 0 ? category.map((item) =>
                                        <ShopCard key={item.id} image={item.image}
                                            price={item.price}
                                            title={item.title}
                                            item={item}
                                            discountedPercent={item.discountedPercent}
                                        />) :

                                        newData.map((item) =>
                                            <ShopCard key={item.id} image={item.image}
                                                price={item.price}
                                                title={item.title}
                                                item={item}
                                                discountedPercent={item.discountedPercent}
                                            />)

                        }

                    </div>
                </div>
            </div>

        </div>
    )

}

export default Shop
