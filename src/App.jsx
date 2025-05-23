
// App.js
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import axios from "axios";
import React, { useEffect, useState } from "react";


import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile.jsx";
import About from "./pages/about";
import Connections from "./pages/connections";
import Signup from "./pages/Signup";
import ViewProfile from "./pages/ProfileView";
import ViewOtherProfile from "./pages/ViewOtherProfile";

function App() {
 const auth = useAuth();  
console.log("Auth object:", auth);
console.log("isAuthenticated:", auth.isAuthenticated);
console.log("User:", auth.user);  

	const [userData, setUserData] = useState(null);
  	const navigate = useNavigate();
 useEffect(() => {
    if (auth.isAuthenticated) {

	const apiUrl = import.meta.env.VITE_API_URL;
	const idToken = auth.user?.id_token;
	const searchByName = "Test"; // use state
      axios
        .get(`${apiUrl}/search?fullName=${searchByName}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          console.log(response.data)
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
        

	 <Routes>
 	  <Route path="/" element={<Home />} />
          
     <Route path="/viewprofile" element={<ViewProfile />} />  
     <Route path="/view-other-profile/:userID" element={<ViewOtherProfile />} />        
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/signup" element={<Signup />} /> "
         </Routes>
	{/*how to sign out*/}
        
     </div>
    );
  }

return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <button 
      style={{ width: '200px', padding: '10px' }} 
      onClick={() => auth.signinRedirect()}
    >
      Sign in/Sign Up
    </button>
    <button 
      style={{ width: '200px', padding: '10px' }} 
      onClick={() => signOutRedirect()}
    >
      Sign out
    </button>
  </div>
);

}
export default App;

