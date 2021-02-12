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
              
              {categories.map((cat)=> {
                let res = 'parrent';
                let link = '';
                categories.filter((c) => {
                  if(c && c.subCat && c.subCat.includes(cat.id)){
                      res = "sub"
                      return
                  } else {     
                    return
                  }
                })
                if(res === "parrent"){
                  let hasSubCat = cat && cat.subCat && cat.subCat.length;
                  link = (
                    <div>
                      {hasSubCat ? 
                      <DropdownButton
                       role="button"
                       title={ cat.text}
                         href={'#'}>
                           {
                             cat.subCat.map((subCat) =>{
                              let subCatTxt = categories.find((cat)=> {
                                if(cat.id === subCat){
                                  return cat
                                }
                              });
                              return <Dropdown.Item className='' href={cat.route}>{' ' + subCatTxt.text}</Dropdown.Item>
                            })
                           }
                      </DropdownButton>
                      : 
                      <Nav.Link 
                       role="button"
                        className={ hasSubCat ? 'nav-link dropdown-toggle' : ''}
                         href={cat.route}>{' ' + cat.text}
                      </Nav.Link>
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