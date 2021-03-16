import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  setSandwichFilter,
  setSearchLocation,
  setDeliFilter,
  renderDelisClick,
  userLoggedIn,
  logOutUser,
  setBoroughFilter,
} from "../Redux/actions";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { GoogleApiWrapper } from "google-maps-react";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      sandwichStyle: "",
      deliStyle: "",
      boroughStyle: "",
      place: null,
    };
  }


  sandwichStyles = [
    { key: "", text: "", value: "" },
    { key: "Burger", text: "Burger", value: "Burger" },
    { key: "Cheese_Steak", text: "Cheese Steak", value: "Cheese Steak" },
    { key: "Melt", text: "Melt", value: "Melt" },
    { key: "Breakfast", text: "Breakfast", value: "Breakfast" },
    { key: "Sub", text: "Sub", value: "Sub" },
    { key: "Club", text: "Club", value: "Club" },
    { key: "Cutlet", text: "Cutlet", value: "Cutlet" },
  ];

  sandwichDropdown = () => (
    <Dropdown
      button
      className="icon"
      onChange={this.sandwichClickHandler}
      name="sandwichStyle"
      floating
      labeled
      icon="search"
      options={this.sandwichStyles}
      search
      placeholder="Filter by Sandwich Style"
    />
  );

  sandwichClickHandler = (e, data) => {
    this.setState({ sandwichStyle: data.value });
    this.props.filterSandwiches(data.value);
  };

  deliStyles = [
    { key: "", text: "", value: "" },
    { key: "Bodega", text: "Bodega", value: "Bodega" },
    { key: "Diner", text: "Diner", value: "Diner" },
    { key: "Jewish_Deli", text: "Jewish Deli", value: "Jewish Deli" },
    { key: "Restaurant", text: "Restaurant", value: "Restaurant" },
    { key: "Italian_Deli", text: "Italian Deli", value: "Italian Deli" },
    {
      key: "Vietnamese_Deli",
      text: "Vietnamese Deli",
      value: "Vietnamese Deli",
    },
  ];

  deliDropdown = () => (
    <Dropdown
      button
      onChange={this.deliClickHandler}
      name="deliStyle"
      className="icon"
      floating
      labeled
      icon="search"
      options={this.deliStyles}
      search
      placeholder="Filter by Deli Style"
    />
  );

  deliClickHandler = (e, data) => {
    this.setState({ deliStyle: data.value });
    this.props.filterDelis(data.value);
  };

  boroughStyles = [
    { key: "", text: "", value: "" },
    { key: "Manhattan", text: "Manhattan", value: "Manhattan" },
    { key: "Brooklyn", text: "Brooklyn", value: "Brooklyn" },
    { key: "Queens", text: "Queens", value: "Queens" },
    { key: "Bronx", text: "Bronx", value: "Bronx" },
    { key: "Staten Island", text: "Staten Island", value: "Staten Island" },
  ];

  boroughDropdown = () => (
    <Dropdown
      button
      onChange={this.boroughClickHandler}
      name="boroughStyle"
      className="icon"
      floating
      labeled
      icon="search"
      options={this.boroughStyles}
      search
      placeholder="Filter by Borough"
    />
  );

  boroughClickHandler = (e, data) => {
    this.setState({ boroughStyle: data.value });
    this.props.filterBoroughs(data.value);
  };

  delisClickHandler = () => {
    this.props.renderDelis();
  };

  searchHandler = (e) => {
    this.setState({ place: e });
  };

  sendSearch = (e) => {
    e.preventDefault();
    // this.props.findDeli(this.state.place);
    let searchResult = {
        name: this.state.address,
        latLng: this.state.place
    }
    // console.log(searchResult)
    this.props.findDeli(searchResult);
  };

  logoutClickHandler = () => {
    this.props.logOutUser();
    this.props.userLoggedIn();
  };

  handleChange = (address) => {
    this.setState({ address: address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
          console.log("Success", latLng);
          this.setState({ address });
          this.setState({ place: latLng});
        })
      .catch((error) => console.error("Error", error));
  };

  render() {
      console.log(this.state.address)
      console.log(this.state.place)
    return (
      <div className="filters">
        <Title>Search The City</Title>

        <Header>Filters</Header>
        <ButtonDiv>
          {this.sandwichDropdown()}
          <br></br>
          <br></br>
          {this.deliDropdown()}
          <br></br>
          <br></br>
          {this.boroughDropdown()}
          <br></br>
          <br></br>
        </ButtonDiv>
        <Header>Find A Deli</Header>
        <ButtonDiv>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </ButtonDiv>
        <SearchDiv>
          <Button color="grey" width="50" onClick={this.sendSearch}>
            Search
          </Button>
        </SearchDiv>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ButtonDiv>
          <Button color="grey" onClick={this.logoutClickHandler}>
            Log Out
          </Button>
        </ButtonDiv>
      </div>
    );
  }
}

function msp(state) {
  return {
    currentDelis: state.delis,
  };
}

function mdp(dispatch) {
  return {
    filterSandwiches: (sandStyle) => dispatch(setSandwichFilter(sandStyle)),
    filterDelis: (deliStyle) => dispatch(setDeliFilter(deliStyle)),
    filterBoroughs: (boroughStyle) => dispatch(setBoroughFilter(boroughStyle)),
    findDeli: (deliLocation) => dispatch(setSearchLocation(deliLocation)),
    renderDelis: () => dispatch(renderDelisClick()),
    userLoggedIn: () => dispatch(userLoggedIn()),
    logOutUser: () => dispatch(logOutUser()),
  };
}
// export default connect(msp, mdp)(FilterBar);

export default connect(msp,mdp)(GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY,
  })(FilterBar));

const Title = styled.h1`
  border: solid 2px;
  margin-right: 17px;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
  background-color: #f0a868;
`;

const Header = styled.h2`
  border-bottom: solid;
  margin-right: 17px;
  font-family: "Roboto Condensed", sans-serif;
`;
const ButtonDiv = styled.div`
  margin-right: 17px;
  margin-bottom: 20px;
`;

const SearchDiv = styled.div`
  margin-right: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
`;
