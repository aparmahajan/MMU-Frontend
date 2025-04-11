import { useNavigate } from "react-router-dom";

function About(){
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => navigate("/")}>Go to Home</button>
      <button onClick={() => navigate("/view-profile")}>View Profile</button>
    </div>
  );
}

export default About;

