import React, { useState, useEffect } from 'react'
import axios from '../config/axios'

const Account = (props) =>{
    const [ user, setUser ] = useState({})

    useEffect(() =>{
        axios.get(`/users/account`, {
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((res) =>{
                const result = res.data
                setUser(result)
            })
            .catch((err) =>{
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h2> Account Info </h2>
            <p> Email - { user.email } </p>
            <p> Username - { user.username} </p>
        </div>
    )
}

export default Account