import React, { useEffect } from 'react'
import { fetchCategories } from '../actions/categoryActions.js';

import { useSelector, useDispatch } from 'react-redux';
import {Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';

const MyNavbar = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
    return (
      <Navbar bg="light" expand="lg">
        {/* <Nav.Link className='nav-link' href='/'>{' '} <img src={logo} alt='logo' style={logoStyle} /></Nav.Link>    */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <div className='navbar-nav'>
              <Nav.Link className='nav-link' href='/'>{' '}Home</Nav.Link>    
              <Nav.Link className='nav-link' href='/register'>{' '}Register</Nav.Link>
              <Nav.Link className='nav-link' href='/login'>{' '}Login</Nav.Link>

              <DropdownButton title="Dropdownxs">
      <Dropdown.Item href="#books">Books</Dropdown.Item>
      <Dropdown.Item href="#podcasts">Podcasts</Dropdown.Item>
      <Dropdown.Item href="#">Tech I Like</Dropdown.Item>
      <Dropdown.Item href="#">About me</Dropdown.Item>
      <Dropdown.Item href="#addBlog">Add a Blog</Dropdown.Item>
    </DropdownButton>
              
              {categories.map((cat)=> {
                let res = 'parrent';
                let link = ''
                // categories.forEach((c) => {
                //   if(c.subCat.includes(cat.id)){

                //   }
                // }) 
                
                categories.filter((c) => {
                  if(c && c.subCat && c.subCat.includes(cat.id)){
                      console.log("it is sub cat", cat.id)
                      res = "sub"
                      //  res = <Nav.Link className='text-danger' href='/login'>{' ' + cat.text}</Nav.Link>;
                      return
                  } else {
                    // res = <Nav.Link className='text-danger' href='/login'>{' ' + cat.text}</Nav.Link>;
                    console.log("it is parrent cat", cat.id)
                    
                    return
                  }
                })
                if(res === "parrent"){
                  let hasSubCat = cat && cat.subCat && cat.subCat.length;
                  link = (
                    <div>
                      <Nav.Link 
                       role="button"
                        className={ hasSubCat ? 'nav-link dropdown-toggle' : ''}
                         href={'#'}>{' ' + cat.text}
                      </Nav.Link>
                      {cat && cat.subCat && cat.subCat.length > 0 ? 
                      cat.subCat.map((subCat) =>{
                        let subCatTxt = categories.find((cat)=> {
                          if(cat.id === subCat){
                            return cat
                          }
                        });
                        return <Nav.Link className='text-danger' href='/login'>{' ' + subCatTxt.text}</Nav.Link>
                      })
                       : ''  
                    }
                    </div>
                  )
                }

                return link;
              })}
            </div>   
        </Navbar.Collapse>
      </Navbar>
    )
  }




export default MyNavbar