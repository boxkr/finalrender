import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import '../css/Location.css'
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';


// KEY AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY
export default function Location() {
  const defaultProps = {
    // address: '275 Joe Routt Blvd, College Station, TX 77840', 
    center: {
      lat: 30.61242,
      lng: -96.34134
    },
    zoom: 15
  };
    return (
      <div style={{height: '100vh', width: '100%' }}>
        <div className="map-header">
          <header>View our location on a map</header>
          <Link className='button-text'to="/"><Button variant="primary">
            Return to landing page</Button>
          </Link>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY"}}
          defaultCenter={defaultProps.center}
          defaultZoom= {defaultProps.zoom}
        >
        <Link className='button-text'to="/" lat={30.61242} lng={-96.34134}><Button variant="primary">
            Return to landing page</Button>
          </Link>
        </GoogleMapReact>
      </div>
     )
   }

