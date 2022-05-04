import React, { useState } from 'react'
import axios from '../config/axios'
import validator from 'validator'

const Login = (props) =>{
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})

    //local variable
    const errors = {}

    const handleChange = (e) =>{
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    //validation function
    const runValidations = () =>{
        //email
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        } else if (!validator.isEmail(email)){
            errors.email = 'invalid email format'
        }

        //password
        if(password.trim().length === 0){
            errors.password = 'password cannot be blank'
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        runValidations()

        if( Object.keys(errors).length === 0 ){
            setFormErrors({})
            const LoginData = {
                email: email,
                password: password
            }

            axios.post(`/users/login`, LoginData)
                .then((res) =>{
                    const result = res.data
                        if(result.hasOwnProperty('errors')){ // Object.keys(result).includes('errors)
                            alert(result.errors)
                        } else {
                            alert('Successfully Logged In')
                            localStorage.setItem('token', result.token)
                            props.history.push('/Account')
                            props.handleAuth()
                        }
                })
                .catch((err) =>{
                    alert(err.message)
                })
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <h2> Login </h2>

            <form onSubmit={handleSubmit}>

                <div className='mb-3' >
                    <input 
                        type='text'
                        placeholder='enter your email'
                        value={email}
                        onChange={handleChange}
                        name='email'
                    /> 
                    { formErrors.email && <span> {formErrors.email} </span> }
                    <br />
                </div>

                <div className='mb-3' >
                    <input 
                        type='password'
                        placeholder='enter your password'
                        value={password}
                        onChange={handleChange}
                        name='password'
                    /> 
                    { formErrors.password && <span> {formErrors.password} </span> }
                    <br />
                </div>

                <input type='submit' className='btn btn-primary btn-sm' />

            </form>
        </div>
    )
}

export default Login