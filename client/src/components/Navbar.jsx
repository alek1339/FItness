import React, { Component } from 'react'


import {Navbar, Nav} from 'react-bootstrap'

class MyNavbar extends Component {
  render () {
    return (
      <Navbar bg="light" expand="lg">
        {/* <Nav.Link className='nav-link' href='/'>{' '} <img src={logo} alt='logo' style={logoStyle} /></Nav.Link>    */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <div className='navbar-nav'>
              <Nav.Link className='nav-link' href='/'>{' '}Home</Nav.Link>    
              <Nav.Link className='nav-link' href='/register'>{' '}Register</Nav.Link>
              <Nav.Link className='nav-link' href='/login'>{' '}Login</Nav.Link>
            </div>   
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const logoStyle = {
  width: '55px'
}



export default MyNavbar