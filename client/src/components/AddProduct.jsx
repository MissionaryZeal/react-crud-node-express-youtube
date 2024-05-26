import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';
import { FaRegCircleXmark } from "react-icons/fa6";


const AddProduct = ({ setIsAddProduct, fetchProduct }) => {

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        price: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        });
    }

    const closeModal = () => {
        setIsAddProduct(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(JSON.stringify(error));
            }

            const result = await res.json();
            closeModal();
            fetchProduct();
            toast.success(result.message);

        } catch (error) {
            setErrors(JSON.parse(error.message));
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='fixed inset-0 bg-black opacity-50' onClick={closeModal}></div>
            <div className='bg-white p-6 rounded-lg z-10 max-w-xl w-full'>
                <div className="flex justify-between"> <h2 className='text-2xl font-bold text-gray-800 text-start'>Add Product</h2>
                    <span className='text-2xl font-bold cursor-pointer' onClick={closeModal}><FaRegCircleXmark /></span>
                </div>

                <form onSubmit={handleSubmit} className='mt-4 text-start'>
                    <div className='mb-3'>
                        <label htmlFor="product-name" className='text-lg font-semibold text-gray-500 mb-2'>Product Name<span className='text-red-500'>*</span></label>
                        <input type="text" id="product-name" name="name" className='border border-gray-500 p-3 rounded w-full outline-none' onChange={handleChange} />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="product-slug" className='text-lg font-semibold text-gray-500 mb-2'>Product Slug</label>
                        <input type="text" id="product-slug" name="slug" className='border border-gray-500 p-3 rounded w-full outline-none' onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="product-price" className='text-lg font-semibold text-gray-500 mb-2'>Product Price<span className='text-red-500'>*</span></label>
                        <input type="number" id="product-price" name="price" className='border border-gray-500 p-3 rounded w-full outline-none' onChange={handleChange} />
                        {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
                    </div>
                    <label htmlFor="product-name" className='text-lg font-semibold text-gray-500 mb-2'>Product Description</label>
                    <textarea type="text" id="product-name" name="description" className='border border-gray-500 p-3 rounded w-full outline-none' onChange={handleChange} />
                    <div className='my-3 mt-5 text-right'>
                        <button type='submit' className='bg-green-600 hover:bg-green-700 text-white py-3 px-5 border-none rounded'>Save</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default AddProduct