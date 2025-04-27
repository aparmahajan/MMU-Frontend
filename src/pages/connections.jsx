import { useNavigate } from "react-router-dom";

function Connections() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <h2>Pending Requests: </h2>

      <h2>My connections:</h2>

      <button onClick={() => navigate("/")} 
	style={{
	  width: "250px",
	}}
      >Return to Home</button>
    </div>
  );
}

export default Connections;

