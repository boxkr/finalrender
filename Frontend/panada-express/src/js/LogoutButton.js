import {GoogleLogin} from 'react-google-login';

// const fs = require('fs');
// const client = fs.readFileSync('../client_secret.txt', 'utf8').split(/\r?\n/);
const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

function LogoutButton(){

    const onSuccess = () =>{
        console.log("Logged out successfully!");
    }

    return(
        <div id='singOutButton'>
            <GoogleLogin
                clientId={clientID}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default LogoutButton;