import React from 'react'
import { connect } from 'react-redux'
import { getSandwich, sandwichBeenClicked } from '../Redux/actions'
import styled from 'styled-components'

class SandwichListItem extends React.Component {

    clickHandler = () => {
        this.props.getSandwich(this.props.sandwichObj)
        this.props.sandwichBeenClicked()
    }

    render() {
        return (
            <ul className="ul">
                <SandwichLine onClick={this.clickHandler}>  -     {this.props.sandwichObj.name} /   Rating:  {this.props.sandwichObj.rating}⭐️</SandwichLine>
            </ul>
        )
    }
}

function mdp(dispatch) {
    return {
        getSandwich: (sandwichObj) => dispatch(getSandwich(sandwichObj)),
        sandwichBeenClicked: () => dispatch(sandwichBeenClicked())
    }
}

export default connect(null, mdp)(SandwichListItem)

const SandwichLine = styled.li`
    border-bottom: thick;
    margin-right: 35px;
    background-color: #F0EFE8;
`