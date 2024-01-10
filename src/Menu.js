import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <>
      <div  style={{textDecoration:'none', listStyle:'none',}}>
       <nav  style={{background:'#0082e6', height:'50px', width:'100%'}}>
    
        {/* <a href='#' className=' text-lg font-semibold'>Accounts</a> */}
        <ul  style={{ float: 'center', marginRight: '20px' }}>
          <li  style={{ display: 'inline-block', lineHeight: '50px', margin:'0 5px' }}>
            <NavLink style={{ color: 'white', fontSize: '20px', textTransform:'uppercase', textDecoration:'none',}}
              exact
              to='/'
              activeClassName='font-bold'
            >
              Home
            </NavLink>
          </li>
          <li style={{ display: 'inline-block', lineHeight: '50px', margin:'0 5px' }}>
            <NavLink style={{ color: 'white', fontSize: '20px', textTransform:'uppercase', textDecoration:'none',}}
              to='/accounts'
             
              activeClassName='font-bold'
            >
              Accounts
            </NavLink>
          </li>
          <li style={{ display: 'inline-block', lineHeight: '50px', margin:'0 5px' }}>
            <NavLink style={{ color: 'white', fontSize: '20px', textTransform:'uppercase', textDecoration:'none',}}
              to='/report'
              
              activeClassName='font-bold'
            >
              Report
            </NavLink>
          </li>
        </ul>
     
    </nav>
    </div>
    </>
  )
}
