
import React from 'react'
import { Route } from 'react-router-dom'
import APP from './components/App'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'



export default(
    <div>
        <Route exact path="/" component={ APP }></Route>
        <Route path="/login" component={ LoginPage }></Route>
        <Route path="/signup" component={ SignupPage }></Route>
    </div>
)