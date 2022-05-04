import React, { useState, useEffect } from 'react'
import Navigate from './components/Navigate'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = (props) =>{
    const [ userLoggedIn, setUserLoggedIn ] = useState(false)

    const handleAuth = () =>{
        setUserLoggedIn(!userLoggedIn)
    }

    useEffect(() =>{
        if(localStorage.getItem('token')){
            handleAuth()
        }
    }, [])

    return (
        <div className='container'>
            <h2> User Authentication </h2>
            <Navigate userLoggedIn={userLoggedIn} handleAuth={handleAuth} />    
        </div>
    )
}

export default App