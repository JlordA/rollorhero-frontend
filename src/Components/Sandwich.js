import React from 'react'
import { connect } from 'react-redux'
import { getSandwich, likeSandwich, sandwichBeenClicked } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

class Sandwich extends React.Component {

    state = {
        sandwichId: 0
    }

    componentDidUpdate() {
        if (this.props.sandwich.id !== this.state.sandwichId) {
            this.setState({ sandwichId: this.props.sandwich.id }, () => this.props.getSandwich(this.props.sandwich))
        }

    }

    likeHandler = () => {
        this.setState({ sandwichId: 0 }, () => {
            let newLike = {
                sandwich_id: this.props.sandwich.id,
                user_id: this.props.user.id
            }
            this.props.sendLike(newLike)
        })
    }

    allSandwichRender = () => {
        this.props.sandwichBeenClicked()
    }

    render() {
        console.log()
        let sandwich = this.props.sandwich
        return (
            <SandwichWrapper>
                <SandwichDetails>
                    <Header>{sandwich.name}</Header>
                    <DetailTitle>Associated Deli:</DetailTitle>
                    <Detail>{this.props.sandwich.delis === undefined ? <p>Loading</p> : this.props.sandwich.delis[0].name}</Detail>
                    <DetailTitle>Description:</DetailTitle>
                    <Detail>{sandwich.description}</Detail>
                    <DetailTitle>Price:</DetailTitle>
                    <Detail>{sandwich.price}</Detail>
                    <DetailTitle>Style:</DetailTitle>
                    <Detail>{sandwich.style}</Detail>
                    <DetailTitle>Rating:</DetailTitle> 
                    <Detail>{sandwich.rating}</Detail>
                    <DetailTitle>Likes:</DetailTitle>
                    <Detail>{this.props.sandwich.likes === undefined ? 0 : this.props.sandwich.likes.length}  <Button color='grey' size='tiny' onClick={this.likeHandler}>Like</Button></Detail>
                    <ButtonDiv>
                        <Button color='grey' onClick={this.allSandwichRender}>All Sandwiches</Button>
                    </ButtonDiv>
                </SandwichDetails>
                <SandwichPic>
                    <Header>Gallery</Header>
                    
                        <Image src={this.props.sandwich.image} alt={this.props.sandwich.name} width="200" height="300" />
                    
                </SandwichPic>
            </SandwichWrapper>
        )
    }
}

function mdp(dispatch) {
    return {
        sendLike: (newLike) => dispatch(likeSandwich(newLike)),
        getSandwich: (sandwichObj) => dispatch(getSandwich(sandwichObj)),
        sandwichBeenClicked: () => dispatch(sandwichBeenClicked())
    }
}

function msp(state) {
    return {
        sandwich: state.sandwich,
        likes: state.likes,
        user: state.user
    }
}

export default connect(msp, mdp)(Sandwich)

const SandwichWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    border: 2px solid black;
    height: 500px;
    margin-top: 20px;
    background-color: #94BFA7;
    margin-left: 30px;
    margin-right: 30px;
`

const SandwichDetails = styled.div`
    justify-content: left;
    border: 2px solid black;
    width: 40%;
    background-color: #FFE8C2;
    overflow: scroll;
    max-height: 450px;
`

const SandwichPic = styled.div`
    justify-content: right;
    border: 2px solid black;
    width: 40%;
    background-color: #FFE8C2;
    overflow: scroll;
    max-height: 450px;
`

const Header = styled.h1`
    text-decoration: underline;
    font-family: 'Roboto Condensed', sans-serif;
    margin-left: 20px
`

const DetailTitle = styled.p`
    font-weight: bold;
    margin-right: 50px;
    margin-left: 50px;
    border: solid black;
    background: #44444c;
    color: white;
`

const Detail = styled.p`
    font-weight: bold;
    margin-right: 50px;
    margin-left: 60px;
`

const ButtonDiv = styled.div`
    margin-left: 50px;
    margin-bottom: 20px;
`

const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 50%;
`