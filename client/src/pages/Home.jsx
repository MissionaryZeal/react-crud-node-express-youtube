import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { RiDeleteBin7Fill as DeleteIcon } from "react-icons/ri";
import UpdateProduct from '../components/UpdateProduct';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

export const Home = ({ products, isAddProduct, setIsAddProduct, fetchProduct }) => {

    const [updateId, setUpdateId] = useState(null);
    const [readMoreStates, setReadMoreStates] = useState({});

    const handleEdit = (id) => {
        setUpdateId(id);
    }

    const toggleReadMore = (id) => () => {
        setReadMoreStates({
           ...readMoreStates,
            [id]:!readMoreStates[id]
        });
    }

    const showText = (description, id) => {
        const maxLength = 50;
        if(description.length > maxLength) {
            if(readMoreStates[id]) {
                return (
                    <>{description}<span className="text-blue-600 cursor-pointer" onClick={toggleReadMore(id)}>Read Less</span></>
                );
            } else {
                return (
                    <>{description.substr(0, maxLength)}...<span className="text-blue-600 cursor-pointer" onClick={toggleReadMore(id)}>Read More</span></>
                );
            }
        }

        return description;

    }
   
    const handleDelete = async (id) => {

        if (confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`${BASE_URL}/api/products/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                const result = await response.json();
                console.log(result);
                toast.success(result.message);
                fetchProduct();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <>
            <div className='mx-auto'>
                <table className="table-fixed w-full mt-4 border border-gray-200">
                    <thead className='bg-green-600 text-white'>
                        <tr>
                            <th className='border-b border-gray-200 py-2'>Name</th>
                            <th className='border-b border-gray-200 py-2'>Slug</th>
                            <th className='border-b border-gray-200 py-2'>Price</th>
                            <th className='border-b border-gray-200 py-2'>Description</th>
                            <th className='border-b border-gray-200 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 && (
                            products.map(product => (
                                <tr key={product._id}>
                                    <td className='border-b border-gray-200 py-2'>{product.name}</td>
                                    <td className='border-b border-gray-200 py-2'>{product.slug}</td>
                                    <td className='border-b border-gray-200 py-2'>{product.price}</td>
                                     <td className='border-b border-gray-200 py-2'>{showText(product.description, product._id)}</td>
                                    <td className='border-b border-gray-200 py-2'>
                                        <button className='bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 me-2' onClick={() => handleEdit(product._id)}><EditIcon /></button>
                                        <button className='bg-red-600 text-white p-2 rounded hover:bg-red-700' onClick={() => { handleDelete(product._id) }}><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div >

            {
                isAddProduct && (
                    <AddProduct setIsAddProduct={setIsAddProduct} fetchProduct={fetchProduct} />
                )

            }

            {
                updateId && (
                    <UpdateProduct updateId={updateId} setUpdateId={setUpdateId} fetchProduct={fetchProduct} />
                )
            }
        </>

    )
}
