import React, { useState } from 'react'
import axios from '../../config/axios'

const NotesForm = (props) =>{
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')
    const [ formErrors, setForErrors] = useState({})

    const { addNote } = props

    //local variable
    const errors = {}

    const handleChange = (e) =>{
        if(e.target.name === 'title'){
            setTitle(e.target.value)
        } else if (e.target.name === 'body') {
            setBody(e.target.value)
        }
    }

    //validation function
    const runValidations = () =>{
        if( title.trim().length === 0 ){
            errors.title = 'Title is required.'
        }
    }

    //form Submit
    const handleSubmit = (e) =>{
        e.preventDefault()

        runValidations() // invoking validation function
        
        if (Object.keys(errors).length === 0){
            setForErrors({})
            const formData = {
                title: title,
                body: body
            }

            axios.post(`/api/notes`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token') 
                }
            })
                .then((res) =>{
                    const result = res.data
                    addNote( result ) 
                })
                .catch(err =>{ console.log(err.message) 
                }) 

            setTitle('')
            setBody('')

        } else {
            setForErrors(errors)
        }
    }

    return (
        <div className='border border-3 shadow p-2 mb-5 bg-body rounded' style={{float: "right", width: "250px"}}>
                <h3> Add Note </h3>
                <form onSubmit={handleSubmit} > 
                    <input 
                        type='text' 
                        placeholder='Title' 
                        value={title} 
                        onChange={handleChange} 
                        name='title' 
                        className='form-control'
                    /> 
                    { formErrors.title && <span> { formErrors.title} </span> }  <br />

                    <textarea placeholder='Body' value={body} onChange={handleChange} name='body' className='form-control' > </textarea> <br />

                    <input type='submit' value='Save' className="btn btn-success btn-sm d-grid gap-2 col-12 mx-auto" />
                </form>
            </div>
    )
}

export default NotesForm