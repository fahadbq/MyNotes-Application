import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import PrivateRoute from '../helpers/PrivateRoute'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyNotesContainer from './NotesComponents/MyNotesContainer'

const Navigate = (props) =>{
    const { userLoggedIn, handleAuth } = props

    return (
        <div className='col-md-8'>
            <nav aria-label="breadcrumb" >
                <ul className="breadcrumb" >
                    <li> <Link to='/' > Home </Link> </li> |

                    { userLoggedIn ? (
                        <>
                            <li> <Link to='/account'> Account </Link> </li> |
                            <li> <Link to='/mynotes' > My Notes </Link> </li> |
                            <li> <Link to='/' onClick={() =>{
                                localStorage.removeItem('token')
                                handleAuth()
                                const confirmLogOut = window.confirm('are you sure ?')
                                    if(confirmLogOut){
                                        alert('LoggedOut')
                                        props.history.push('/')
                                    }
                            }} > Logout </Link> </li>
                        </>
                    ) : (
                        <>
                            <li> <Link to='/register' > Register </Link> </li> |
                            <li> <Link to='/login' > Login </Link> </li>
                        </>
                    )}
                </ul>
            </nav>


            {/* Route Session */}
            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={Register} />
            <Route path='/login' render={(props) =>{
                return <Login 
                        {...props}
                        handleAuth={handleAuth}
                    />
                }} 
            />

            <PrivateRoute path="/account" component={Account} /> 
            <PrivateRoute path="/mynotes" component={MyNotesContainer} />
            
        </div>
    )
}

export default withRouter(Navigate)