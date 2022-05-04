import React, { useState, useEffect } from 'react'
import axios from '../../config/axios'
import swal from 'sweetalert'
import NotesForm from './NotesForm'
import NotesList from './NotesList'

const MyNotesContainer = (props) =>{
    const [ notes, setNotes ] = useState([])

    useEffect(() =>{
        axios.get(`/api/notes`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((res) =>{
                const result = res.data
                setNotes( result )
                console.log(result)
            })
            .catch( err => { console.log(err.message) })
    }, [])

    //comm with child AddNote Component
    const addNote = (formData) =>{
        setNotes([ formData, ...notes ])
    }

    //comm with child NoteItem component
    const handleRemove = (id) =>{

        //sweetAlert package
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
              //if user press yes
            if (willDelete) {
                //api request through axios 
                axios.delete(`/api/notes/${id}`, {
                    headers: {
                        "x-auth": localStorage.getItem('token')
                    }
                })
                    .then((res) =>{
                        const result = res.data
                        console.log(result)
                    })
                    .catch( err => { console.log( err.message )})

                //changing the value of state variable
                const result = notes.filter((note) =>{
                    return note._id !== id
                })
                setNotes(result)

              swal("Poof! Your note has been deleted!", {
                icon: "success",
              })
            } else {
              swal("Your note is safe!");
            }
          })
    }       

    const handleEvent= (id) =>{
        axios.get(`/api/notes/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((res) =>{
                const result = res.data
                swal(`Title - ${result.title}`, `Body - ${result.body}`);
            })
            .catch(err =>{ console.log(err.message) })
    }

    return (
        <div style={{width: "1000px"}} >
            <NotesForm addNote={addNote} />
            <NotesList notes={notes} handleRemove={handleRemove} handleEvent={handleEvent} />
        </div>
    )
}

export default MyNotesContainer