import { useNavigate } from "react-router-dom";
function Signup(){
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Sign Up Page</h1>
      <button onClick={() => navigate("/login")}>Go to Log In</button>
    </div>
  );
}

export default Signup;

