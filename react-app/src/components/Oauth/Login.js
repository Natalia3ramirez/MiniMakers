import { GoogleLogin} from "react-google-login"

const clientId = "403972623970-5ao82h5t1b6al5fmsemovol1194s0dut.apps.googleusercontent.com"




function Login() {
  return (
    <div id='signinButton'>
      <GoogleLogin
      clientId={clientId}
      buttonText='Login with Google'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      />
    </div>
  )
}


export default Login
