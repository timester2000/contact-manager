import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';
class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount(){
    const { id } = this.props.match.params

    // const res = await axios.get
    // (`https://jsonplaceholder.typicode.com/users/${id}`)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        const contact = data

        this.setState({
          name: contact.name,
          email: contact.email,
          phone: contact.phone
        })
      })

  }

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

    const updContact = {
      name,
      email,
      phone
    }

    const { id } = this.props.match.params

    // const res = await axios.put
    // (`https://jsonplaceholder.typicode.com/users/${id}`, updContact)

    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updContact)
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, options)
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'UPDATE_CONTACT', payload: data})

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
              <div className="card-header">Edit Contact
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
                      type="submit"
                      value="Edit Contact">
                      Update Contact
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

export default EditContact








// const newContact = {
//       name,
//       email,
//       phone
//     }
//     const res = await axios.post
//     ('https://jsonplaceholder.typicode.com/users',
//     newContact)
//       dispatch({type: 'ADD_CONTACT',
//       payload: res.data})