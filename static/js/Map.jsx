// import React, {Component, createRef} from "react"

class GoogleMap extends React.Component {
    googleMapRef = React.createRef()
  
    componentDidMount() {
      console.log("hello from googlemap");
      const googleMapScript = document.createElement('script')
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ0lKLQYES7sfIlMlIaH_pCWUrP0PoPO8&libraries=places`
      window.document.body.appendChild(googleMapScript)
  
      googleMapScript.addEventListener('load',() => {
        this.googleMap = this.createGoogleMap()
        this.marker = this.createMarker()
      })
    }
  
    createGoogleMap = () =>
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: 43.642567,
          lng: -79.387054,
        },
        disableDefaultUI: true,
      })
  
    createMarker = () =>
      new window.google.maps.Marker({
        position: { lat: 43.642567, lng: -79.387054 },
        map: this.googleMap,
      })
  
    render() {
      return (
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '400px', height: '300px' }}
        />
      )
    }
  }