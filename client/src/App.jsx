import { useEffect, useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './config';
import { FaPlus } from "react-icons/fa";

function App() {
  const [isAddProduct, setIsAddProduct] = useState(false);

  const [products, setProducts] = useState()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      data.reverse()
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])


  const handleAddProduct = () => {
    setIsAddProduct(true);

  }
  return (
    <>
      <ul className='list-none flex justify-between'>
        <li className='bg-blue-600 p-2 text-white'>MERN APP</li>
        <li className=''><button className='bg-green-600 p-3 text-white flex items-center justify-between' onClick={handleAddProduct}><FaPlus /> &nbsp; Add Product</button></li>
      </ul>
      <Home products={products} isAddProduct={isAddProduct} setIsAddProduct={setIsAddProduct} fetchProduct={fetchProduct} />
      <ToastContainer />
    </>
  )
}

export default App
