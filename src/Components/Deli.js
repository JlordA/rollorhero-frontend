import React from 'react'
import { connect } from 'react-redux'
import { renderSandwichForm, deliClick, getDeliOfReview } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import SandwichListItem from './SandwichListItem'
import styled from 'styled-components'

class Deli extends React.Component {

    componentDidMount(){
        this.props.fetchDeli(this.props.deli.id)
    }

    clickHandler = () => {
        this.props.renderSandwichForm()
    }

    delisClickHandler = () => {
        this.props.deliClicked()
    }

    sandwichesOfDeli = () => {
        return this.props.deli.sandwiches.map(sandEl => {
            return <SandwichListItem key={sandEl.id} sandwichObj={sandEl} />
        })
    }

    render() {
        return (
            <DeliWrapper>
                <DeliDetails>
                    <Header>{this.props.deli.name}</Header>
                    <DetailTitle>Address:</DetailTitle>
                    <Detail>{this.props.deli.address}</Detail>
                    <DetailTitle>Style:</DetailTitle>
                    <Detail>{this.props.deli.style}</Detail>
                    <DetailTitle>Hours:</DetailTitle>
                    <Detail>{this.props.deli.hours_open}</Detail>
                    <DetailTitle>Neighborhood:</DetailTitle>
                    <Detail>{this.props.deli.neighborhood}</Detail>
                    <DetailTitle>Borough:</DetailTitle>
                    <Detail>{this.props.deli.borough}</Detail>
                    <ButtonDiv>
                        <Button color='grey' onClick={this.delisClickHandler}>All Delis</Button>
                        <Button color='grey' onClick={this.clickHandler}>Add Sandwich</Button>
                    </ButtonDiv>
                </DeliDetails>
                <Associated>
                    <Header>Associated Sandwiches</Header>
                    <AssociatedDetail>{this.props.deli.sandwiches ? this.sandwichesOfDeli() : null}</AssociatedDetail>
                </Associated>
            </DeliWrapper>
        )
    }
}

function msp(state) {
    return {
        deli: state.deli
    }
}

function mdp(dispatch) {
    return {
        deliClicked: () => dispatch(deliClick()),
        renderSandwichForm: () => dispatch(renderSandwichForm()),
        fetchDeli: (deliId) => dispatch(getDeliOfReview(deliId))
    }
}

export default connect(msp, mdp)(Deli)

const DeliWrapper = styled.div`
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

const DeliDetails = styled.div`
    justify-content: left;
    border: 2px solid black;
    width: 40%;
    background-color: #FFE8C2;
    overflow: scroll;
    max-height: 450px;
`

const Associated = styled.div`
    justify-content: right;
    border: 2px solid black;
    width: 40%;
    background-color: #FFE8C2;
    overflow: scroll;
    max-height: 450px;
`

const Detail = styled.p`
    font-weight: bold;
    margin-right: 50px;
    margin-left: 60px;
`

const DetailTitle = styled.p`
    font-weight: bold;
    margin-right: 50px;
    margin-left: 50px;
    border: solid black;
    background: #44444c;
    color: white;
`
const AssociatedDetail = styled.p`
    font-weight: bold;
    margin-right: 50px;
`

const Header = styled.h1`
    text-decoration: underline;
    font-family: 'Roboto Condensed', sans-serif;
    margin-left: 20px
`

const ButtonDiv = styled.div`
    margin-left: 50px;
    margin-bottom: 20px;
`