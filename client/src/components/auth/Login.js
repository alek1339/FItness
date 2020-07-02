import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render () {
    const { errors } = this.state
    return (
      <div className='container'>
          <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input className='form-control'
              type='text'
              name='email'
              placeholder='email'
              onChange={this.onChange}
              aria-describedby='emailHelp'
            />
            <span>{errors.email}</span>
            <input className='form-control' type='password' name='password' placeholder='password' onChange={this.onChange} />
            <span>{errors.password}</span>
            <input type='submit' id='btnLogin' className='btn btn-primary' />
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  auth: state.auth,
  errors: state.errors
})

function mapDispatchToProps (dispatch) {
  return {
    loginUser: (userData) => dispatch(loginUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)