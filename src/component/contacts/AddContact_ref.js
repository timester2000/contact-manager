import React, { Component } from 'react'

class AddContact extends Component {
  constructor(props){
    super(props);

    this.nameInput = React.createRef()
    this.emailInput = React.createRef()
    this.phoneInput = React.createRef()
  }

  onSubmit = (e) => {
    e.preventDefault()
    const contact = {
      name: this.nameInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value,
    }
    console.log(contact);
  }

  static defaultProps = {
    name: 'mohammad',
    email: 'mestertist@gmail.com',
    phone: '446391-548-2548'
  }

  render() {
    const {name, email, phone} = this.props
    
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control form-control-lg"
                type="text" 
                name="name"
                defaultValue={name}
                placeholder="Enter Name..."
                ref = {this.nameInput}
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control form-control-lg"
                type="email" 
                name="email"
                defaultValue={email}
                placeholder="Enter Email..."
                ref = {this.emailInput}
                />
                </div>
                <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input className="form-control form-control-lg"
                type="string" 
                name="phone"
                defaultValue={phone}
                placeholder="Enter Phone..."
                ref = {this.phoneInput}
                />
              </div>
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
  }
}

export default AddContact