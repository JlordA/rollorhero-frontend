import React from 'react'
import { Button, Form, Input, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postReview, renderReviewForm } from '../Redux/actions';
import Calendar from 'react-calendar'
import styled from 'styled-components'

class ReviewForm extends React.Component {


    state = {
        title: "",
        date: "",
        body: "",
        rating: ""
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

        let reviewObj = {
            title: this.state.title,
            date: this.state.date,
            body: this.state.body,
            rating: parseInt(this.state.rating),
            user_id: this.props.user.id,
            deli_id: this.props.deli.id
        }
        this.props.sendForm(reviewObj)
        this.props.fetchForm()
    }

    render() {
        // console.log(this.state)
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

function msp(state) {
    return {
        user: state.user,
        deli: state.deli
    }
}

function mdp(dispatch) {
    return {
        sendForm: (reviewObj) => dispatch(postReview(reviewObj)),
        fetchForm: () => dispatch(renderReviewForm())
    }
}

export default connect(msp, mdp)(ReviewForm)

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 40px
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