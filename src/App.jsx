import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      {currentPage === "home" && <Home onNavigate={setCurrentPage} />}
      {currentPage === "about" && <About onNavigate={setCurrentPage} />}
      {currentPage === "login" && <Login onNavigate={setCurrentPage} />}  
    </div>
  );
}

export default App;

