import React from 'react'

const NoteItem = (props) =>{
    const { _id, title, body, handleRemove, handleEvent } = props

    return (
        <div>
            <h3 onClick={() =>{
                handleEvent( _id )
            }}> {title} </h3>
            <p> {body} </p>
            <button onClick={() =>{
                handleRemove( _id )
            }} className="btn btn-danger btn-sm" > remove </button> <hr />
        </div>
    )
}

export default NoteItem