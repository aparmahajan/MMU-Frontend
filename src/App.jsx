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
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

