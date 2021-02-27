import React from 'react'
import { connect } from 'react-redux'
import { getReviews } from '../Redux/actions'
import ReviewListItem from './ReviewListItem'
import styled from 'styled-components'

class Reviews extends React.Component {


    componentDidMount() {
        this.props.reviewList()
    }

    renderReviewList = () => {
        return this.props.reviews.map(reviewEl => {
            return <ReviewListItem key={reviewEl.id} reviewObj={reviewEl} />
        })
    }

    renderReviewItem = () => { }

    render() {
        return (
            <div className="tab-div" >
                <h2>Reviews</h2>
                <ListWrapper>
                    {this.renderReviewList()}
                </ListWrapper>
            </div>
        )
    }
}

function msp(state) {
    return {
        reviews: state.reviews
    }
}

function mdp(dispatch) {
    return {
        reviewList: () => dispatch(getReviews())
    }
}

export default connect(msp, mdp)(Reviews)

const ListWrapper = styled.div`
    border: solid;
    background-color: #94BFA7; 
`