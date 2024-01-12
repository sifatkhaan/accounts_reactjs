import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import axios from 'axios';

export default function ItemInsert() {
// states
    const [formData, setFormData] = useState({ name: '', price: 0, uom: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [item, setItem] = useState([])
  
//data insert and updating 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingIndex !== null) {
                const itemId = item[editingIndex].id;
                console.log('Updating item with ID:', itemId);
                await axios.put(`http://127.0.0.1:8000/api/item/${itemId}`, formData);
                setEditingIndex(null);
            } else {
                await axios.post('http://127.0.0.1:8000/api/item', formData);
            }
            setFormData({ name: '', price: '', uom: '' });
            getItem();
        } catch (error) {
            console.error(error)
        }
    }
//table data
    const getItem = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/item',
            responseType: 'json'
        }).then(function (response) {
            setItem(response.data.data)
        }).catch(error => { console.error("data fetching error", error) })
    }
    useEffect(() => {
        getItem();
    }, [])

    // handle
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleEdit = async (index) => {
        setEditingIndex(index);
        console.log('Editing Index:', index);
        const selectedItem = item[index];
        setFormData({
            name: selectedItem.name,
            price: selectedItem.price,
            uom: selectedItem.uom,
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/item/${id}`);
        getItem();
    }

    return (
        <>
            <div className='container'>
                <Menu />
                <div className='d-flex min-vh-60 justify-content-center'>
                    <form onSubmit={handleSubmit} className='form-group'>
                        <div className='mb-3'>
                            <label>Name:</label>
                            <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Enter Name' className='form-control' />
                        </div>
                        <div className='mb-3'>
                            <label>Price:</label>
                            <input type='text' name='price' value={formData.price} onChange={handleChange} placeholder='Enter Price' className='form-control' />
                        </div>
                        <div className='mb-3'>
                            <label>UOM:</label>
                            <input type='text' name='uom' value={formData.uom} onChange={handleChange} placeholder='Enter UOM' className='form-control' />
                        </div>
                        <div>

                            <input className='btn btn-sm btn-primary' type='submit' />
                        </div>
                    </form>
                </div>

                <div className='mt-20'>
                    <table className='table table-bordered'>
                        <tr>
                            <th>SL</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>UOM</th>
                            <th>Action</th>
                        </tr>
                        {item.map((d, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{d.name}</td>
                                <td>{d.price}</td>
                                <td>{d.uom}</td>
                                <td>
                                    <button className='btn btn-sm btn-primary' onClick={() => handleEdit(i)}>Edit</button> &nbsp;
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(d.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}
