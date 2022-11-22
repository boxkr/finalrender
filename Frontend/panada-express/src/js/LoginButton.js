import {GoogleLogin} from 'react-google-login';

// const fs = require('fs');
// const client = fs.readFileSync('../client_secret.txt', 'utf8').split(/\r?\n/);st 
const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

function LoginButton(){

    const onSuccess = (res) =>{
        console.log("Login Success! Current User: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login Failed! Res: ", res);
    }

    return(
        <div id = "singInButton">
            <GoogleLogin
                clientId = {clientID}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn = {true}
            />
        </div>
    )
}

export default LoginButton;