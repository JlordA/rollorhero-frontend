import React from 'react'
import { connect } from 'react-redux'
import { loginUser, userLoggedIn } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

class LoginForm extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.currentUser(this.state)
        this.props.userLoggedIn()
    }

    render() {

        return (
            <Wrapper className="login-form">
                <Details>
                    <Logo>ROLL OR HERO</Logo>
                    <Info>An homage to the NYC sandwich scene. </Info> 
                    <Info>From bodega to brasserie this is the place for those who enjoy their food on delicious bread.</Info>
                </Details>
                <Form onSubmit={this.submitHandler}>
                    <Header>Login</Header>
                    <p><input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /></p>
                    <Button color='grey'>Login</Button>
                </Form>
            </Wrapper>
        )
    }
}

function mdp(dispatch) {
    return {
        currentUser: (userObj) => dispatch(loginUser(userObj)),
        userLoggedIn: () => dispatch(userLoggedIn())
    }
}

export default connect(null, mdp)(LoginForm)

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: space-around;
    border-bottom: 3px solid black;
    height: 500px;
`

const Logo = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 38pt;
`

const Header = styled.h3`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 24pt;
`

const Info = styled.div`
    font-family: 'Roboto Condensed', sans-serif;
    font-style: italic;
    font-size: large;
`

const Form = styled.form`

`
const Details = styled.div`

`