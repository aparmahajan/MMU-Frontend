{/*

import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/about";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <BrowserRouter>
      <Routes>
        {/* special protected route (protected when logged in) */}
        {/*}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
}


// App.js
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
 const auth = useAuth();  
console.log("Auth object:", auth);
console.log("isAuthenticated:", auth.isAuthenticated);
console.log("User:", auth.user);  

const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
 useEffect(() => {
    if (auth.isAuthenticated) {

	const accessToken = auth.user?.access_token;
      axios
        .get("https://zimr7w3b2j.execute-api.us-west-1.amazonaws.com/Prod/users", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

    }
  }, [auth.isAuthenticated, auth.user]);

  const signOutRedirect = () => {
    const clientId = "1ckqdl8f23jn6ms1d622nna6r9";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://us-west-1z5hk8uryu.auth.us-west-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

	<div>
  	  <h3>Fetched User Data:</h3>
  	  <p>Name: {userData ? userData.fullName : "N/A"}</p>
  	  <p>Email: {userData ? userData.email : "N/A"}</p>
	</div>
 
  	<button onClick={() => navigate("/connections")}>Go to Connections</button>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;

