import React from 'react'
import {connect} from "react-redux"
import { patchReview, reviewEditClicked } from '../Redux/actions'
import { Form, Input, Button, TextArea } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

class EditReviewForm extends React.Component {
    
    
    state = {
        id: this.props.review.id,
        title: this.props.review.title,
        date: this.props.review.date,
        body: this.props.review.body,
        rating: this.props.review.rating
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    ratingHandler = (e, { value }) => {
        this.setState({ rating: value })
    }

    dateHandler = (e) => {
        this.setState({ date: new Date(e) })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.reviewUpdate(this.state)
        this.props.editReview()
    }

    render() {
        console.log(this.props.review.id)
        return (
            <FormWrapper>
                <Form widths='equal' onSubmit={this.submitHandler}>
                <Header>Add A Review</Header>
                    <FormFields>
                        <Form.Group >
                            <Form.Field
                                control={Input}
                                label='Title:'
                                name='title'
                                placeholder='Title'
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </FormFields>
                    <FormFields>
                    <label>Date:</label>
                        <Form.Group>
                            <Form.Field>
                                <Calendar
                                    onChange={this.dateHandler}
                                    defaultValue={new Date()}
                                />
                            </Form.Field>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Form.Group>
                    
                    </FormFields>
                    <FormFields>
                    <Form.Group inline>
                        <label>Rating:</label>
                        <Form.Radio
                            label='One⭐️'
                            value='1'
                            name='rating'
                            checked={this.state.rating === '1'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Two⭐️'
                            value='2'
                            name='rating'
                            checked={this.state.rating === '2'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Three⭐️'
                            value='3'
                            name='rating'
                            checked={this.state.rating === '3'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Four⭐️'
                            value='4'
                            name='rating'
                            checked={this.state.rating === '4'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Five⭐️'
                            value='5'
                            name='rating'
                            checked={this.state.rating === '5'}
                            onChange={this.ratingHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Field
                        control={TextArea}
                        label='Details:'
                        placeholder='Tell us about your experience...'
                        value={this.state.body}
                        name='body'
                        onChange={this.handleChange}
                    />
                    <Form.Field control={Button}>Submit</Form.Field>
                    </FormFields>
                </Form>
            </FormWrapper>
        )
    }
}

function msp(state){
    return{
        review: state.review
    }
}

function mdp(dispatch){
    return{
        reviewUpdate: (reviewObj) => dispatch(patchReview(reviewObj)),
        editReview: () => dispatch(reviewEditClicked())
    }
}

export default connect(msp, mdp)(EditReviewForm)

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px
`

const FormFields = styled.div`
    margin-left: 200px;  
    margin-right: 200px;
    margin-top: 20px
`

const Header = styled.h1`
    text-decoration: underline;
    font-family: 'Roboto Condensed', sans-serif;
    margin-left: 200px
`

 

            
