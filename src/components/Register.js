import React, { useState } from 'react'
import axios from '../config/axios'
import validator from 'validator'

const Register = (props) =>{
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})

    //local vairable
    const errors = {}

    const handleChange = (e) => {
        if(e.target.name === 'username'){
                setUsername(e.target.value)
            } else if (e.target.name === 'email'){
                setEmail(e.target.value)
            } else if (e.target.name === 'password'){
                setPassword(e.target.value)
            }
    }

    //validations function
    const runValidations = () =>{
        //username
        if( username.trim().length === 0){
            errors.username = 'username cannot be blank'
        }

        //email
        if( email.trim().length === 0){
            errors.email = 'email cannot be blank'
        } else if (!validator.isEmail(email)){
            errors.email = 'invalid email format'
        }

        //password
        if( password.trim().length === 0){
            errors.password = 'password cannot be blank'
        }
    }

    //formSubmit
    const handleSubmit = (e) =>{
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const registerData = {
                username: username,
                email: email,
                password: password
            }

            axios.post(`/users/register`, registerData)
                .then((res) =>{
                    const result = res.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('Successfully Registered')
                        props.history.push('/login')
                    }
                })
                .catch((err) =>{
                    console.log(err)
                })

        } else {
            setFormErrors(errors)
            console.log('errors for validation', errors)
        }        
    }

    return (
        <div className='mb-3'>
            <h4> Register with us </h4>

            <form onSubmit={handleSubmit} >
                
                <div className="mb-3">
                    <input 
                        type='text' 
                        placeholder='enter username' 
                        value={username} 
                        onChange={handleChange} 
                        name='username' 
                    /> 
                    { formErrors.username && <span> { formErrors.username } </span> }

                    <br />    
                </div>

                <div className="mb-3">
                    <input 
                        type='text' 
                        placeholder='enter email' 
                        value={email} 
                        onChange={handleChange} 
                        name='email' 
                    /> 
                    { formErrors.email && <span> { formErrors.email } </span> } 
                    <br />
                </div>

                <div className="mb-3">
                    <input 
                        type='password' 
                        placeholder='enter password' 
                        value={password} 
                        onChange={handleChange} 
                        name='password' 
                    /> 
                    { formErrors.password && <span> { formErrors.password } </span> }

                    <br />
                </div>

                <input className="btn btn-primary btn-sm" type='submit' />

            </form>
        </div>
    )
}

export default Register