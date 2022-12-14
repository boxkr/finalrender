import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import '../css/Location.css'
import GoogleMapReact from 'google-map-react';
// import { Marker } from '@react-google-maps/api';
import { BsFillPinMapFill } from 'react-icons/bs';
import googleMapReact from 'google-map-react';


const request = {
  placeID: "ChIJXXBI75iDRoYRsfgNW3cJV7c",
  fields: ["name", "formatted_address", "place_id", "geometry"],
};



//Place ID ChIJXXBI75iDRoYRsfgNW3cJV7c
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
      <div>
            <title>Location component</title>
      <div style={{height: '100vh', width: '100%' }}>
        <div className="map-header">
          <header>View our location on a map</header>
          <Link className='button-text'to="/"><Button variant="primary">
            Return to landing page</Button>
          </Link>
        </div>
        <div className='map'>
        <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY"}}
          defaultCenter={defaultProps.center}
          defaultZoom= {defaultProps.zoom}
        >
        <BsFillPinMapFill className='pin'
        lat={30.61242}
        lng={-96.34134}
        text="MSC Panda Express"
        />
        
        </GoogleMapReact>
        </div>
        <div className='store-info'>
          <h1>Location info</h1>
          <br></br>
          <h2>275 Joe Routt Blvd, College Station, TX 77840</h2>
          <h2>
            <a href="tel:+19792687570">(979) 268 - 7570</a>
          </h2>
          <h3>Hours:</h3>
          <ul>
            <li>Sunday: 11AM - 10PM</li>
            <li>Monday: 11AM - 10PM</li>
            <li>Tuesday: 11AM - 10PM</li>
            <li>Wednesday: 11AM - 10PM</li>
            <li>Thursday: 11AM - 10PM</li>
            <li>Friday: 11AM - 10PM</li>
            <li>Saturday: 11AM - 10PM</li>
          </ul>
        </div>
      </div>
      </div>
     )
   }

