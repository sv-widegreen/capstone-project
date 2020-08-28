import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

InputField.propTypes = {
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  registerFn: PropTypes.func,
  error: PropTypes.object,
  errorMessageMax: PropTypes.string,
  errorMessageRequired: PropTypes.string,
  onChange: PropTypes.func,
}

export default function InputField({
  labelText,
  placeholderText,
  name,
  type,
  registerFn,
  error,
  errorMessageMax,
  errorMessageRequired,
  onChange,
}) {
  return (
    <StyledLabel>
      {labelText}
      <input
        type={type}
        placeholder={placeholderText}
        name={name}
        ref={registerFn}
        onChange={onChange}
      ></input>
      {error && error.type === 'max' ? (
        <StyledError>{errorMessageMax}</StyledError>
      ) : (
        ''
      )}
      {error && error.type === 'required' ? (
        <StyledError>{errorMessageRequired}</StyledError>
      ) : (
        ''
      )}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  color: var(--teal-medium);
  font-size: 18px;
  font-weight: 200;
  margin-top: 10px;

  input {
    width: 275px;
    height: 40px;
    border-radius: 4px;
    padding: 0 10px;
    color: var(--teal-ultralight);
    font-size: 16px;
    background: var(--copper-ultralight);

    :focus {
      outline: none;
      box-shadow: 0 0 0 1pt var(--teal-ultralight);
    }

    /* Placeholder color was displayed as black in Chrome */
    ::-webkit-input-placeholder {
      color: var(--teal-ultralight);
    }
  }
`

const StyledError = styled.div`
  padding: 0 0 10px 0;
  font-size: 10px;
  color: var(--copper-dark);
`
