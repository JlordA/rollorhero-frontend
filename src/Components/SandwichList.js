import React from 'react'
import { connect } from 'react-redux'
import { getSandwiches } from '../Redux/actions'
import SandwichListItem from './SandwichListItem'
import styled from 'styled-components'

class SandwichList extends React.Component {

    componentDidMount() {
        this.props.sandwichList()
    }

    renderSandwichList = () => {
        return this.props.sandwiches.map(sandEl => {
            return <SandwichListItem key={sandEl.id} sandwichObj={sandEl} />
        })
    }

    render() {
        return (
            <div className="tab-div">
                <h2>Sandwiches</h2>
                <ListWrapper>
                    {this.renderSandwichList()}
                </ListWrapper>
            </div>
        )
    }
}

function msp(state) {
    return {
        sandwiches: state.sandwiches
    }
}

function mdp(dispatch) {
    return {
        sandwichList: () => dispatch(getSandwiches())
    }
}
export default connect(msp, mdp)(SandwichList)

const ListWrapper = styled.div`
    border: solid;
    background-color: #94BFA7;
    border-radius: 4px; 
    height: 425px;
    overflow: auto;
`