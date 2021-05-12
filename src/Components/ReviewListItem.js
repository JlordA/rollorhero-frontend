import React from 'react'
import {connect} from 'react-redux'
import { reviewClick, renderReview, getDeliOfReview } from '../Redux/actions'
import styled from 'styled-components'

class ReviewListItem extends React.Component{

    clickHandler = () => {
        this.props.clickedReview()
        this.props.showReview(this.props.reviewObj)
        this.props.getDeli(this.props.reviewObj.deli_id)
    }

    render(){
        return(
            <ul className="ul">
                <ReviewLine onClick={this.clickHandler}>Title: {this.props.reviewObj.title}    /     Rating: {this.props.reviewObj.rating} </ReviewLine>
            </ul>
        )
    }
}


function mdp(dispatch){
    return{
        clickedReview: () => dispatch(reviewClick()),
        showReview: (reviewObj) => dispatch(renderReview(reviewObj)),
        getDeli: (deli_id) => dispatch(getDeliOfReview(deli_id))

    }
}

export default connect(null, mdp)(ReviewListItem)

const ReviewLine = styled.li`
    border-bottom: thick;
    margin-right: 35px;
    background-color: #F0EFE8;
    border-radius: 2px;
    font-size: 13pt;
`