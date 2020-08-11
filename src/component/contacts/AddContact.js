import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';
class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }
  // onNameChange=(e)=> this.setState({name: e.target.value})
  // onEmailChange=(e)=> this.setState({email: e.target.value})
  // onPhoneChange=(e)=> this.setState({phone: e.target.value})
  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone } = this.state

    //check for Errors
    if (name === '') {
      this.setState({errors: {name: 'Name is required'}})
      return;
    }
    if (email === '') {
      this.setState({errors: {email: 'Email is required'}})
      return;
    }
    if (phone === '') {
      this.setState({errors: {phone: 'Phone is required'}})
      return;
    }

    const newContact = {
      name,
      email,
      phone
    }

    // const res = await axios.post
    // ('https://jsonplaceholder.typicode.com/users',
    // newContact)
      

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact)
    }
    
    fetch('https://jsonplaceholder.typicode.com/users/', options)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'ADD_CONTACT',
          payload: data
        })

        this.setState({
          name: '',
          email: '',
          phone: '',
          errors: {}
        })

        this.props.history.push('/')
      })
  }

  onChange=(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {name, email, phone, errors} = this.state

    return(
      <Consumer>
        {value => {
          const { dispatch } = value
          return(
            <div className="card border-primary mb-3">
              <div className="card-header">Add Contact
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label = "Name"
                      name = "name"
                      placeholder = "Enter Name"
                      value = {name}
                      onChange = {this.onChange}
                      error = {errors.name}
                    />
                    <TextInputGroup
                      label = "Email"
                      name = "email"
                      type = 'email'
                      placeholder = "Enter Email"
                      value = {email}
                      onChange = {this.onChange}
                      error = {errors.email}
                    />
                    <TextInputGroup
                      label = "Phone"
                      name = "phone"
                      placeholder = "Enter Phone"
                      value = {phone}
                      onChange = {this.onChange}
                      error = {errors.phone}
                    />
                      
                    <button 
                      className="btn btn-block btn-light"
                      type="submit">
                      Add Contact
                    </button>
                    <button
                      className="btn btn-block btn-light"
                      type="reset">
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact