import React, {useState, useEffect } from 'react'
import Menu from '../Menu'
import axios from 'axios';
import dayjs from 'dayjs'
export default function Home() {

  const [parchase, setParchase] = useState([]);


  const getParchase = () =>{
    axios({
        method: 'get',
        url:"http://127.0.0.1:8000/api/parchase",
        responseType: 'json'
    }).then( function (response) {
      setParchase(response.data.data)
    }).catch(error=>{console.error("error fetching data", error)})
  }

  useEffect(()=>{
    getParchase()
  }, [])
  console.log(parchase, "room data")

  return (
    <>
    <div className='container text-center'>
    <Menu />
        <div>
          <table className='table table-bordered col-md-8'>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Parchase Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
            {parchase.map((p, i)=>
              <tr key={i}>
                <td>{i+1}</td>
                <td>{dayjs(p.date).format("DD-MM-YYYY")}</td>
                <td>{p.item}</td>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                <td>{p.total}</td>
                <td>{p.total}</td>
              </tr>
            )}
          </table>
        </div>
    </div>
        </>
  )
}
