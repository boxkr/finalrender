import React from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';



export default function Manager() {

    

    return (
        <div className="container">
            <h1 className="welcome"> Welcome Manager! </h1>
            <br></br>
            <Button variant="primary" size="lg">
                {/*Perhaps want a pop-up or something that has a menu of menu management stuff, i.e. changing price */}
                Menu Management
            </Button>
            
            <br></br>
            <Button variant="primary" size="lg"> {/*just need to add style with tailwind or bootstrap */}
                {/*Pop up or something allowing us to add/delete inventory items */}
                Inventory Management
            </Button>
            
        </div>
    )
}
