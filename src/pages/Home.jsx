import { useNavigate } from "react-router-dom";

function Home(){
  
  const navigate = useNavigate();
  
  return (
	<div>
	  <h1>Welcome!</h1>
      	  <button onClick={() => navigate("/viewprofile")}>View Profile</button>
	  
	</div>
); 
}

export default Home;

