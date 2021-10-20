import React from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";

function LoginPage({ getUserData, userData }) {
  const responseGoogle = (response) => {
    getUserData(response.profileObj);
  };

  return (
    <>
      {userData && <Redirect push to="/Chat/null" />}
      {!userData && (
        <div className="app">
          {" "}
          <div className="app_body2">
            <img
              className="logoimage"
              src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"
              alt="applogo"
            />
            <h2 className="mycolor">whatsapp_clone</h2>
            <br />
            <GoogleLogin
              clientId="1043279253086-book5qsi8qpq7pg61iegifordtnjkiee.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="mybutton"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    style={{ width: "20px", marginRight: "10px" }}
                    src="https://cdn.iconscout.com/icon/free/png-256/google-2981831-2476479.png"
                    alt="logo"
                  />
                  Sign In with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
