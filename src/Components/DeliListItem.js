import React from 'react'
import {connect} from 'react-redux'
import { currentDeli, deliClick } from '../Redux/actions'
import styled from "styled-components"
 
class DeliListItem extends React.Component{
    
    clickHandler = () => {
        this.props.deliClicked()
        this.props.currentDeli(this.props.deliObj)
    }

    render(){
        return(
            <ul className="ul">
                <DeliLine onClick={this.clickHandler}>{this.props.deliObj.name} - {this.props.deliObj.address}</DeliLine>
            </ul>
        )
    }
}

function mdp(dispatch){
    return{
        deliClicked: () => dispatch(deliClick()),
        currentDeli: (deliObj) => dispatch(currentDeli(deliObj))
    }
}
export default connect(null, mdp)(DeliListItem)

const DeliLine = styled.li`
    border-bottom: thick;
    margin-right: 35px;
    background-color: #F0EFE8;
    border-radius: 2px;
    font-size: 13pt;
`