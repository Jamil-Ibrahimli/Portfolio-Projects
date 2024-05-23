
import { useContext, useEffect } from 'react';
import Home from '../../Pages/Home/Home';
import Shop from '../../Pages/Shop/Shop';
import { Routes, Route } from 'react-router';
import axios from 'axios'
import { DataContext } from '../../Context/DataContext';
import ProductDetails from '../../Pages/ProductDetails/ProductDetails';
import CartPage from '../../Pages/CartPage/CartPage';
import NotFound from '../../UI/NotFound/NotFound';
import SignIn from '../../Pages/Sign_In/SignIn';



export interface IProduct {

  id: number;
  rating: any;
  image: string;
  price: number;
  title: string;
  count: number;
  discountedPercent: number;
  category: string;
  description: string
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

        <Route path='/prod_detail/:id' element={<ProductDetails data={data} />} />

        <Route path='/cart_page' element={<CartPage />} />

        <Route path='/notFound' element={<NotFound />} />

        <Route path='/sign_in' element={<SignIn />} />

        <Route path='*' element={<NotFound />} />



      </Routes>

    </>


  )
}

export default Main