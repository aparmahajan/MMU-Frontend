{/*}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

*/}

// main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-1.amazonaws.com/us-west-1_z5hk8UrYU",
  client_id: "1ckqdl8f23jn6ms1d622nna6r9",
  //redirect_url: "https://localhost:5173",
  redirect_uri: "https://main.dm59k9g597v7p.amplifyapp.com",
  response_type: "code",
  scope: "email openid phone",
};

ReactDOM.createRoot(document.getElementById("root")).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
	<App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);


// store access token and refresh token in cookie
// search up
// id token wherever lol
