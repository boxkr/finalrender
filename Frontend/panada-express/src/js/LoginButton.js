import {GoogleLogin} from 'react-google-login';

const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

function LoginButton(props){

    const onSuccess = (res) =>{
        console.log("Login Success! Current User: ", res.profileObj);
        let temp = props.totalOrder;
        temp.userID = res.profileObj.name;
        props.setTotalOrder(temp);
    }

    const onFailure = (res) => {
        console.log("Login Failed! Res: ", res);
    }

    return(
        <div>
            <title>Login button</title>
        <div id = "singInButton">
            <GoogleLogin
                clientId = {clientID}
                buttonText = "Log in with Google!"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn = {true}
            />
        </div>
        </div>
    )
}

export default LoginButton;