
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit (e) {
    e.preventDefault()

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(userData, this.props.history)
  }

  render () {
    const { errors } = this.state
    return (
      <div className='container register-container mt-1'>
        <h2 className='align-center mt-1'>Register for free</h2>
        <form onSubmit={this.onSubmit} className='align-center mt-1r'>
          <div className='form-group'>
            <input className='form-control mt-1'
              type='text'
              name='name'
              placeholder='Name'
              onChange={this.onChange}
            />
            <span>{errors.name} </span>
            <input className='form-control mt-1'
              type='text'
              name='email'
              placeholder='email'
              onChange={this.onChange}
              aria-describedby='emailHelp'
            />
            <span>{errors.email} </span>
            <input
              className='form-control mt-1'
              type='password' name='password'
              placeholder='password'
              onChange={this.onChange}
            />
            <span>{errors.password} </span>
            <input
              className='form-control mt-1'
              type='password' name='password2'
              placeholder='Confirm password'
              onChange={this.onChange}
            />
            <span>{errors.password2}</span>
           <div className=' flex justify-center'>
              <input type='submit' id='btnRegister' className='btn btn-info mt-1r  align-center' />
           </div>
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  errors: state.errors
})

function mapDispatchToProps (dispatch) {
  return {
    registerUser: (userData, history) => dispatch(registerUser(userData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))