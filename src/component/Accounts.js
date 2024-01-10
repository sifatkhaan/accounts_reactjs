import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Menu from '../Menu';

export default function Accounts() {

  const [date, setDate] = useState('');
  const [message, setSuccessMessage] = useState('')
  const [fields, setFields] = useState([
    {
      id: 1,
      item: '',
      price: 0,
      quantity: 0,
      total: 0
    } 
  ]);

  const addField = () => {
    const newField = { id: fields.length + 1, item: '', price: 0, quantity: 0, total: 0 };
    setFields([...fields, newField]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleFieldChange = (index, e) => {
    const updatedFields = [...fields];
    const { name, value } = e.target;
    updatedFields[index] = {
      ...updatedFields[index],
      [name]: value,
    };
    updatedFields[index].total = parseFloat(updatedFields[index].price ||0) * parseFloat(updatedFields[index].quantity||0);

    setFields(updatedFields);
  };

  const subtotal = fields.reduce((acc, field) => acc + (parseFloat(field.total) || 0), 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      date: date,
      sales_data: fields.map((field) => ({
        item: field.item,
        price: field.price,
        quantity: field.quantity,
        total: field.total,
      })),
    };
    console.log(data);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sales', data);

      if (response.status === 200) {
        setSuccessMessage('Data submitted successfully');
        setDate(''); // Clear the date field
        setFields([{ id: 1, item: '', price: 0, quantity: 0, total: 0 }]);
        console.log('Data submitted successfully');
      } else {
        // Handle errors
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <div className='container text-center'>
        <Menu/>
        <h1>This is accounts section</h1>
        {message && <div className="alert alert-success">{message}</div>}
        <div className='d-flex justify-content-center align-items-center vh-50 '>
          <div className="container">
            <form onSubmit={handleSubmit} className="row">
              <div className=' col-md-5'>
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-sm-3 col-form-label">Date</label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" id="name" placeholder="Enter your name" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-sm-3 col-form-label">Total</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="name" readOnly value={subtotal} disabled/>
                  </div>
                </div>
              </div>
              <div className='col-md-10'>
                <table className='table table-bordered' style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                  <tr className='bg-info'>
                    <th>SL</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                  {fields.map((field, index) => (
                    <tr key={field.id}>
                      <td >
                        {index + 1}
                      </td>
                      <td>
                        <input
                          style={{ border: '1px solid black', marginRight: '10px' }}
                          type="text"
                          className="form-control"
                          id={`name_${index}`}
                          name="item"
                          value={field.item}
                          onChange={(e) => handleFieldChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          style={{ border: '1px solid black', marginRight: '10px' }}
                          type="number"
                          className="form-control"
                          name="price"
                          value={field.price}
                          onChange={(e) => handleFieldChange(index, e)}
                        />
                      </td>
                      <td >
                        <input
                          style={{ border: '1px solid black', marginRight: '10px' }}
                          type="number"
                          className="form-control"
                          id={`value_${index}`}
                          name="quantity"
                          value={field.quantity}
                          onChange={(e) => handleFieldChange(index, e)}
                        />
                      </td>
                      <td >
                        <input
                          style={{ border: '1px solid black', marginRight: '10px' }}
                          type="text"
                          className="form-control"
                          id={`value_${index}`}
                          name="total"
                          value={field.total || 0}
                          disabled
                          readOnly
                        />
                      </td>
                      <td>
                        <div className="col-sm-2">
                          <button type="button" onClick={() => removeField(index)} className="btn btn-xs btn-danger">-</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>

              <div className="col-6 text-center">
                <button type="button" onClick={addField} className="btn btn-sm btn-success">Add Field</button>
              </div>
              <div className="col-6 text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}
