import React from 'react'
import { connect } from 'react-redux'
import { postDeli, renderDeliForm, resetDeli, resetDeliLocation } from '../Redux/actions'
import { Form, Input, Button, Select } from 'semantic-ui-react'
import styled from 'styled-components'

class AddDeliForm extends React.Component {

    state = {
        name: "",
        address: "",
        style: "",
        hours_open: "",
        neighborhood: "",
        borough: ""
    }

    deliStyleOptions = [
        { key: '', text: '', value: '' },
        { key: 'Bodega', text: 'Bodega', value: 'Bodega' },
        { key: 'Diner', text: 'Diner', value: 'Diner' },
        { key: 'Jewish Deli', text: 'Jewish Deli', value: 'Jewish Deli' },
        { key: 'Restaurant', text: 'Restaurant', value: 'Restaurant' },
        { key: 'Italian Deli', text: 'Italian Deli', value: 'Italian Deli' },
        { key: 'Vietnamese Deli', text: 'Vietnamese Deli', value: 'Vietnamese Deli' },
    ]

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    styleHandler = (e, data) => {
        this.setState({ style: data.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        let deliObj = {
            name: this.state.name,
            address: this.state.address,
            style: this.state.style,
            hours_open: this.state.hours_open,
            neighborhood: this.state.neighborhood,
            borough: this.state.borough,
            lat: this.props.deliLocation.coordinates["lat"],
            lng: this.props.deliLocation.coordinates["lng"]
        }
        this.props.createDeli(deliObj)
        this.props.showDeliForm()
        this.props.clearDeliCache()
        this.props.clearDeli()
    }

    render() {
        return (
            <FormWrapper>
                <Form widths='equal' onSubmit={this.submitHandler}>
                <Header>Add A Deli</Header>
                <FormFields>
                    <Form.Group >
                        <Form.Field
                        control={Input}
                        label='Name'
                        name='name'
                        value={this.state.name}
                        placeholder='Name'
                        onChange={this.changeHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Group >
                        <Form.Field
                        control={Input}
                        label='Address'
                        name='address'
                        value={this.state.address}
                        placeholder='Address'
                        onChange={this.changeHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Group >
                        <Form.Field
                        control={Select}
                        label={{ children: 'Style', htmlFor: 'form-select-control-gender' }}
                        name='style'
                        options={this.deliStyleOptions}
                        placeholder='Style'
                        search
                        searchInput={{ id: 'form-select-control-gender' }}
                        onChange={this.styleHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Group >
                        <Form.Field
                            control={Input}
                            label='Hours'
                            name='hours_open'
                            value={this.state.hours_open}
                            placeholder='Hours Open'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Group >
                        <Form.Field
                            control={Input}
                            label='Neighborhood'
                            name='neighborhood'
                            value={this.state.neighborhood}
                            placeholder='Neighborhood'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>
                    <Form.Group >
                        <Form.Field
                            control={Input}
                            label='Borough'
                            name='borough'
                            value={this.state.borough}
                            placeholder='Borough'
                            onChange={this.changeHandler}
                            style={{width: "450px"}}
                        />
                    </Form.Group>
                    </FormFields>
                    <FormFields>

                    <Form.Field control={Button}>Add Deli</Form.Field>
                    </FormFields>
                </Form>
            </FormWrapper>
        )
    }
}

function msp(state) {
    return {
        deliLocation: state.deliLocation
    }
}
function mdp(dispatch) {
    return {
        createDeli: (newDeli) => dispatch(postDeli(newDeli)),
        showDeliForm: () => dispatch(renderDeliForm()),
        clearDeliCache: () => dispatch(resetDeliLocation()),
        clearDeli: () => dispatch(resetDeli())
    }
}

export default connect(msp, mdp)(AddDeliForm)

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 40px;
`

const Header = styled.h1`
    text-decoration: underline;
    font-family: 'Roboto Condensed', sans-serif;
    margin-left: 200px
`

const FormFields = styled.div`
    margin-left: 200px;  
    margin-right: 200px;
    margin-top: 20px
`

