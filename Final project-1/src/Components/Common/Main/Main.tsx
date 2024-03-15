
import { useContext, useEffect } from 'react';
import Home from '../../Pages/Home/Home';
import Shop from '../../Pages/Shop/Shop';
import styles from './main.module.scss';
import { Routes, Route } from 'react-router';
import axios from 'axios'
import { DataContext } from '../../Context/DataContext';


export interface IProduct {

  id: number;
  rating: any;
  image: string;
  price: number;
  title: string;
  count: number;
  discountedPercent: number;
  category: string;

}


const Main = () => {

  const { data, setData } = useContext(DataContext)

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios('https://fakestoreapi.com/products')
        setData(response.data)

      } catch (error) {

        alert(error)

      }

    }
    fetchData()
  }, [])



  return (

    <>

      <Routes>
        <Route path='/' element={<Home data={data} />} />

        <Route path='/shop' element={<Shop data={data} />} />
      </Routes>

    </>


  )
}

export default Main