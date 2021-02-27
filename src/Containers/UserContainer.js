import React from 'react'
import LoginForm from '../Components/LoginForm'
import { Route, NavLink } from 'react-router-dom'
import CreateUserForm from '../Components/CreateUserForm'


function UserContainer() {

    return (
        <>
                <NavLink to="/login">Login</NavLink>
                <Route path="/login" component={LoginForm} />

                <NavLink to="/user/new">Create Profile</NavLink>
                <Route path="/user/new" component={CreateUserForm} />
           
        </>
    )
}

export default UserContainer
