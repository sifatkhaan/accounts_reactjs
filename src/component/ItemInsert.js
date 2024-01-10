import React from 'react'
import Menu from '../Menu'

export default function ItemInsert() {
  const handleSubmit= ()=>{

  }
  return (
    <>
        <div className='container'>
            <Menu/>
            <div className='d-flex min-vh-100 justify-content-center'>
            <form onSubmit={handleSubmit} className='form-group'>
                <div className='mb-3'>
                    <label>Name:</label>
                    <input type='text' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label>Price:</label>
                    <input type='text' className='form-control'/>
                </div>
                <div className='mb-3'>
                    <label>UOM:</label>
                    <input type='text' className='form-control'/>
                </div>
                <div>
                   
                    <input className='btn btn-sm btn-primary' type='submit' />
                </div>
            </form>
            </div>
        </div>
    </>
  )
}
