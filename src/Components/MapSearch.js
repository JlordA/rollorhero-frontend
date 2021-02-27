import React from 'react'
import { GoogleComponent } from 'react-google-location' 

const API_KEY = process.env.REACT_APP_API_KEY
 
class MapSearch extends Component {
  
    state = {
      place: null
    }
 
  render() {
    return (
      <div >
         <GoogleComponent
         
          apiKey={API_KEY}
          language={'en'}
          country={'country:in|country:us'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} />
      </div>
 
    )
  } 
}
 
 
export default MapSearch;