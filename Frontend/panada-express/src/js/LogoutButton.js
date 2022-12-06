import {GoogleLogout} from 'react-google-login';

const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

function LogoutButton(props){

    const onSuccess = () =>{
        console.log("Logged out successfully!");
        let temp = props.totalOrder;
        temp.userID = "Guest";
        props.setTotalOrder(temp);
    }

    return(
        <div>
            <title>Logout button</title>
        <div id='singOutButton'>
            <GoogleLogout
                // clientId={clientID}
                buttonText={"Logout with Google"}
                onLogoutSuccess={onSuccess}
            />
        </div>
        </div>
    )
}

export default LogoutButton;