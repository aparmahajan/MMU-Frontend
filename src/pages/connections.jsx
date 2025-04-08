import { useNavigate } from "react-router-dom";

function Connections() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>My connections:</h1>
      <button onClick={() => navigate("/")}>Go to Profile</button>
    </div>
  );
}

export default Connections;

