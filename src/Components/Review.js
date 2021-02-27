import React from 'react'
import { connect } from 'react-redux'
import { reviewEditClicked, reviewClick, getSandwiches, getReview } from '../Redux/actions'
import SandwichListItem from './SandwichListItem'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

class Review extends React.Component {

    componentDidMount() {
        this.props.allSandwiches()
        this.props.fetchReview(this.props.review)
    }

    editClickHandler = () => {
        this.props.editReview()
    }

    reviewsClickHander = () => {
        this.props.clickedReview()
    }

    renderButton = () => {
        if (this.props.user.id === this.props.review.user_id) {
            return <Button color='grey' onClick={this.editClickHandler}>Edit</Button>
        }
    }

    dateHandler = (date) => {
        let newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

    renderSandwich = () => {
        console.log("clicked:")
    }

    sandwichOfDeliReview = () => {
        return this.props.deli.sandwiches.map(deliSandwich => {
            return this.props.sandwiches.map(sandwich => {
                if (deliSandwich.name === sandwich.name) {
                    return <SandwichListItem key={sandwich.id} sandwichObj={sandwich} />
                } else {
                    return false
                }
                // False Might not work
            })
        })
    }


    render() {
        const deli = this.props.deli
        return (
            <ReviewWrapper>
                <ReviewDetails>
                    <Header>{this.props.review.title}</Header>
                    <DetailTitle>Date</DetailTitle>
                    <Detail>{this.dateHandler(this.props.review.date)}</Detail>
                    <DetailTitle>Deli Name</DetailTitle>
                    <Detail>{this.props.deli.name}</Detail>
                    <DetailTitle>Rating</DetailTitle>
                    <Detail>{this.props.review.rating}⭐️</Detail>
                    <DetailTitle>Review</DetailTitle>
                    <Detail>{this.props.review.body}</Detail>
                    <ButtonDiv>
                        <Button color='grey' onClick={this.reviewsClickHander}>All Reviews</Button>
                        {this.renderButton()}
                    </ButtonDiv>
                </ReviewDetails>
                <Associated>
                    <Header>Sandwiches Reviewed:</Header>
                    <h5>{deli.length === 0 ? <p>fetching sandwiches</p> : this.sandwichOfDeliReview()}</h5>
                </Associated>
            </ReviewWrapper>
        )
    }
}

function msp(state) {
    return {
        review: state.review,
        user: state.user,
        deli: state.deli,
        sandwiches: state.sandwiches
    }
}

function mdp(dispatch) {
    return {
        clickedReview: () => dispatch(reviewClick()),
        editReview: () => dispatch(reviewEditClicked()),
        allSandwiches: () => dispatch(getSandwiches()),
        fetchReview: (reviewObj) => dispatch(getReview(reviewObj)) 
    }
}
export default connect(msp, mdp)(Review)

const ReviewWrapper = styled.div`
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
const ReviewDetails = styled.div`
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