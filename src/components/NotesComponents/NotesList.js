import React from 'react'
import NoteItem from './NoteItem'

const NotesList = (props) =>{
    const { notes, handleRemove, handleEvent } = props

    return (
        <div className='row'>
            <div className='col-md-12'>
                { notes.length === 0 ? (
                    <>
                        <h2> No notes found</h2>
                        <p> Add your first note </p>
                    </>
                    ) : (
                    <div>
                        <h2> My Notes - {notes.length} </h2> <br />
                        { notes.map((note) =>{
                            return (
                                <NoteItem 
                                    key = {note._id}
                                    {...note}
                                    handleRemove={handleRemove}
                                    handleEvent={handleEvent}
                                />
                            )
                        })}
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default NotesList