import React from 'react'
import { connect } from 'react-redux'
import DeliListItem from './DeliListItem'
import styled from 'styled-components'


class DeliList extends React.Component {

    renderDelis = () => {
        return this.props.currentDelis.map(deliEl => {
            return <DeliListItem key={deliEl.id} deliObj={deliEl} />
        })
    }

    render() {
        return (
            <div className="tab-div">
                <h2>Delis</h2>
                <ListWrapper >
                    {this.renderDelis()}
                </ListWrapper>
            </div>
        )
    }
}

function msp(state) {
    return {
        currentDelis: state.delis,
    }
}
export default connect(msp)(DeliList)

const ListWrapper = styled.div`
    border: solid;
    background-color: #94BFA7;
    font-family: 'Roboto Condensed', sans-serif;
`