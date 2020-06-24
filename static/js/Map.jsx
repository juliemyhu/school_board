// import React, {Component, createRef} from "react"

class GoogleMap extends React.Component {
    googleMapRef = React.createRef()
    _isMounted = false;
    
    constructor(props) {
      super(props);
      this.state = {
        user_id: this.props.user_id,
        programs: []
      }
    }

    componentDidMount() {
      // const googleMapScript = document.createElement('script')
      // googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ0lKLQYES7sfIlMlIaH_pCWUrP0PoPO8&libraries=places`
      // window.document.body.appendChild(googleMapScript)
      this._isMounted = true;
      fetch("/api/get_user_programs", {
        method:"POST",
        body: JSON.stringify(this.state.user_id),
        headers: {"Content-type": "application/json"}
      })
      .then(r => r.json())
      .then(response => {
        console.log("map fetch response: ", response);
        const map = new window.google.maps.Map(document.getElementById('google-map'), {
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          });
          this.initMap(map);
          
          response.programs.map(program => {
            console.log("program!!!!", program);
            this.createMarker(program.college_lat, program.college_lon, map);
          })
      });
      
      // googleMapScript.addEventListener('load',() => {
      //   this.googleMap = this.createGoogleMap()
      //   this.marker = this.createMarker()
      // })
      // this.googleMap = this.createGoogleMap();
      // this.marker = this.createMarker();
      
      // const map = new window.google.maps.Map(document.getElementById('google-map'), {
      //   center: { lat: 41.0082, lng: 28.9784 },
      //   zoom: 8
      // });
      

    }

    componentWillUnmount() {
      this._isMounted = false;
    }
    

    createMarker(lat, lon, currentMap) {
      console.log("createMarker called", lat, lon, currentMap);
      new window.google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: currentMap,
        icon: {  
          url: '/static/img/university.png',
          scaledSize: {
            width: 30,
            height: 30
          }
        }
      });
    }

    initMap(map) {
      console.log("initMap called");
      const infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Here you are.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    // createGoogleMap = () =>
    //   new window.google.maps.Map(this.googleMapRef.current, {
    //     zoom: 16,
    //     center: {
    //       lat: 43.642567,
    //       lng: -79.387054,
    //     },
    //     disableDefaultUI: true,
    //   })
  
    // createMarker = () =>
    //   new window.google.maps.Marker({
    //     position: { lat: 43.642567, lng: -79.187054 },
    //     map: this.googleMap,
    //   })
  
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