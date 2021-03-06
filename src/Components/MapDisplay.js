import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from "react-redux"
import { getDelis, renderDeliForm, renderReviewForm } from '../Redux/actions'
import InfoWindowEx from './InfoWindoEx'
import { currentDeli } from '../Redux/actions'
import { Button } from 'semantic-ui-react'


class MapDisplay extends React.Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        place: null,
        name: "",
        address: "",
        hours: ""
    }

    componentDidMount() {
        this.props.fetchDelis()
    }

    /// CONDITIONAL FILTER MARKER RENDERS ///
    allMarkers = () => {
        const filteredDeliArray = this.props.currentDelis.filter(deliEl => deliEl.style === this.props.deliFilter)
        const filteredSandwichArray = this.props.currentDelis.filter(deliEl => {
            if (deliEl.sandwiches.length) {
                return deliEl.sandwiches[0].style === this.props.sandwichFilter
            }
            else {
                return null
            }
        })

        const filteredBoroughArray = this.props.currentDelis.filter(deliEl => deliEl.borough === this.props.boroughFilter)
        if (filteredDeliArray.length > 0) {
            return filteredDeliArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        }
        else if (filteredSandwichArray.length > 0) {
            return filteredSandwichArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        }
        else if (filteredBoroughArray.length > 0) {
            return filteredBoroughArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        }
        else {
            return this.props.currentDelis.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        }
    }

    /// CONDITIONAL SEARCH RENDER (USING GOOGLE PLACES) ///
    searchMarker = () => {
        const titleArray = this.props.deliLocation.place.split(",")
        const searchResultName = titleArray[0]
        if (this.state.name === "") {
            this.setState({ name: searchResultName })
        }
        return <Marker name={this.state.name} address={this.props.deliLocation.address}  onClick={this.onMarkerClick} position={{ lat: this.props.deliLocation.latLng.lat, lng: this.props.deliLocation.latLng.lng }} />

    }


    /// MAP ACTIONS ///
    onMarkerClick = (props, marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
    }

    renderReviewFormHandler = () => {
        this.props.fetchForm()
        this.props.currentDelis.map(deliEl => {
            if (deliEl.name === this.state.selectedPlace.name) {
                return this.props.setDeli(deliEl)
            } else {
                return false
            }
        })
    }

    renderAddDeliFormHandler = () => {
        this.props.showDeliForm()
    }

    
    render() {
        return (
            <>
                <Map
                    id='searchmap'
                    containerStyle={{ width: "100%", height: "100%", position: "absolute" }}
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{
                        lat: 40.683436,
                        lng: -73.941249
                    }}
                    center={{
                        lat: 40.70294624697779,
                        lng: -73.96980084624495
                    }}
                    onDragend={this.centerMoved}
                    onClick={this.mapClicked}>
                    {this.props.currentDelis.length > 0
                        ?
                        this.props.deliLocation
                            ?
                            this.searchMarker()
                            :
                            this.allMarkers()
                        :
                        <h1>Loading</h1>
                    }
                    <div className="search-bar">
                    </div>
                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.windowHasClosed}>
                        <div >
                            <h3>{this.state.selectedPlace.name}</h3>
                            <p>Address: {this.state.selectedPlace.address}</p>
                            {this.state.selectedPlace.name === this.state.name ? <Button type="button" onClick={this.renderAddDeliFormHandler}>Add Me</Button> : null}
                            <Button type="button" onClick={this.renderReviewFormHandler}>Review Me</Button>
                        </div>
                    </InfoWindowEx>
                </Map>
            </>
        )
    }
}

function msp(state) {
    return {
        currentDelis: state.delis,
        reviewForm: state.reviewFormClicked,
        sandwichFilter: state.sandwichFilter,
        deliFilter: state.deliFilter,
        boroughFilter: state.boroughFilter,
        deliLocation: state.deliLocation
    }
}

function mdp(dispatch) {
    return {
        fetchDelis: () => dispatch(getDelis()),
        fetchForm: () => dispatch(renderReviewForm()),
        setDeli: (deliObj) => dispatch(currentDeli(deliObj)),
        showDeliForm: () => dispatch(renderDeliForm())
    }
}

export default connect(msp, mdp)(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
})(MapDisplay))





