import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function connections(){

  const navigate = useNavigate();

  return (
    <div>
      <h1>My connections:</h1>
      <button onClick={() => navigate("/login")}>Go to Profile</button>
    </div>
  );
}

export default connections;
