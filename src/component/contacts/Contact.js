import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'


class Contact extends Component {
  state = {
    showContactInfo: false,
  }
  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete
    (`https://jsonplaceholder.typicode.com/users/${id}`)
          dispatch({type:'DELETE_CONTACT', payload: id})
    }  catch(e){
      dispatch({type:'DELETE_CONTACT', payload: id})
  }
  }
  showInfoToggle = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    }) 
  }
  

  render() {
    const {id, name, email, phone}=this.props.contact
    const {showContactInfo} = this.state
    const toggleClass = showContactInfo ? 'fas fa-sort-up' : 'fas fa-sort-down'
    return (
      <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className="card card-body mb-3">
        <h4>Name: {name}
        <i
          className={toggleClass}
          onClick={this.showInfoToggle}
          style={{
            cursor: 'pointer',
            marginLeft: 5
          }}
        />
        <i
          className="fas fa-times"
          style={{float:"right", cursor:'pointer', color:'red'}}
          onClick={this.onDeleteClick.bind
          (this, id, dispatch)}></i>
          <Link to={`contact/edit/${id}`}>
            <i className="fas fa-pencil-alt" style={{
              float: "right", 
              cursor: "pointer", 
              color: "black", 
              marginRight: "1rem"}}>
            </i>
          </Link>
        </h4>
        {
          showContactInfo ? (
            <ul className="list-group">
              <li className="list-group-item">Emaile : {email}</li>
              <li className="list-group-item">Phone : {phone}</li>
            </ul>
          ) : null
        }
      </div>
        )
      }}
      </Consumer>
    )
  }
}

Contact.propTypes={
  contact: PropTypes.object.isRequired,
}
export default Contact;
