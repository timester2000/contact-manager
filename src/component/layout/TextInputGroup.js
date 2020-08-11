import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const  TextInputGroup = ({
  lable,
  name,
  value,
  type,
  placeholder,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{lable}</label>
      <input className={classnames('form-control form-control-lg', {
        'is-invalid': error
      })}
      type={type} 
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}/>
      {error && 
      <div className = "invalid-feedback">
      This is wrong, {error} </div>}
      </div>
  )
}

TextInputGroup.prototype = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  error: PropTypes.string
}
TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup