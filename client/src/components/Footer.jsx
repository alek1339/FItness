import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/authActions'

class Footer extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const authLinks = (
      <a
        href=''
        onClick={this.onLogoutClick.bind(this)}
        className='nav-link'
      >
        {/* Hello {user.name} */}
        {' '}
        Logout
      </a>
    )

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
    )

    return (
      <div className='footer p-5 text-center text-white'>
        <div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <p id='footer-text'>Copyright © 2020 Fitness.bg All rights reserved.</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Footer)