import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

import { useSelector, useDispatch } from 'react-redux';

const FooterNew = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    const guestLinks = (
        <div>
          <button>
            <Link className='nav-link' to='/login'>
              Login
            </Link>
          </button>
          <button>
            <Link className='nav-link' to='/register'>
              Register
            </Link>
          </button>
        </div>
      );

     const authLinks = (
        <a
          href=''
          onClick={()=> dispatch(logoutUser())}
          className='nav-link'
        >
          {/* Hello {user.name} */}
          {' '}
          Logout
        </a>
      );
  

    return (
        <div className='footer p-5 text-center text-white'>
        <div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <p id='footer-text'>Copyright © 2020 Fitness.bg All rights reserved.</p>
      </div>
    );
};

export default FooterNew;