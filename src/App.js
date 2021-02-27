import './App.css';
import React from 'react'
import HomeContainer from './Containers/HomeContainer';
import LoginForm from './Components/LoginForm'
import {connect} from 'react-redux'
import { loginUser } from './Redux/actions';


class App extends React.Component{

  componentDidMount = () => {
    const user = localStorage.getItem("USER_DATA")
    if(user){ this.props.loginUser(user)}
  }

  render(){

    return (
      <>
        {this.props.logged_in === false 
        ? 
        <LoginForm/> 
        : 
        <HomeContainer />
        }        
      </>
    );
  }
}

function msp(state){
  return{
    logged_in: state.logged_in
  }
}

function mdp(dispatch){
  return{
    loginUser: (userObj) => dispatch(loginUser(userObj))
  }
}

export default connect(msp, mdp)(App);

