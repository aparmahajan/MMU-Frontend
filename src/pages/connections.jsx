import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function Connections() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [incoming, setIncoming] = useState([]);
  const [connected, setConnected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      const idToken = auth.user.id_token;
      setToken(idToken);

	console.log("ID Token Length:", idToken?.length);
	console.log("Sending id token:", idToken); 
     
      try {
		
	const userID = auth.user.profile.sub;

        const response = await axios.get(`/api/connections/${userID}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        const parsed = typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

	console.log("Parsed response from Lambda:", parsed);

	setIncoming(parsed.incoming_connections || []);
        setConnected(parsed.mutual_connections || []);

      } catch (err) {
        console.error("Error fetching connections", err);
        setError("Failed to load connections.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleAccept = async (conn) => {
    try {
      await axios.post("/api/connections", {
        userId1: auth.user.profile.sub,
        userId2: conn.userID1  
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIncoming(prev => prev.filter(c =>
        !(c.userID1 === conn.userID1 && c.userID2 === conn.userID2)
      ));

      setConnected(prev => [...prev, {
        userID1: auth.user.profile.sub,
        userID2: conn.userID1,
        connectionSince: new Date().toLocaleDateString()  // for display
      }]);
    } catch (err) {
      console.error("Failed to accept request", err);
    }
  };


console.log("Incoming length:", incoming.length);
        console.log("Incoming contents:", incoming);

  return (
    <div style={{
 	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "40px 16px",
	color: "black"
	
    }}>
      <h2>Pending Requests:</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {incoming.length === 0 && !loading ? <p>No incoming requests.</p> : null}
 

	<div
 	 className="profile-list"
  	 style={{
    	    display: "flex",
    	    flexWrap: "wrap",
    	    gap: "16px",
      	    justifyContent: "center", // <-- center the cards
    	    marginBottom: "40px"
  	  }}
	>
	
       {incoming.map((conn, idx) => {
          const fromUser = conn.userID || conn.userID1;
          return (
            <div
              key={idx}
              className="profile-card"
              style={{
                flex: "0 1 250px",
                width: "250px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                color: "#000",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <p><strong>User ID:</strong> {fromUser}</p>
              {/* You can add future fields like full name, etc. here */}
              <button onClick={() => handleAccept(conn)}>
                Accept
              </button>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: "30px" }}>My Connections:</h2>
      {connected.length === 0 && !loading ? <p>No connections yet.</p> : null}

	<div
 	 className="profile-list"
  	  style={{
    	  display: "flex",
    	  flexWrap: "wrap",
    	  gap: "16px",
    	  justifyContent: "center", // <-- center the cards
   	  marginBottom: "40px"
 	 }}
	>        

	{connected.map((conn, idx) => {
          const otherUser = conn.userID1 === auth.user.profile.sub
            ? conn.userID2
            : conn.userID1;
          return (
            <div
              key={fromUser}
              className="profile-card"
              style={{
                flex: "0 1 250px",
                width: "250px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                color: "#000",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <p><strong>Connected with:</strong> {otherUser}</p>
              <p><strong>Since:</strong> {conn.connectionSince}</p>
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate("/")} style={{ marginTop: "30px", width: "250px" }}>
        Return to Home
      </button>
    </div>
  );
}

export default Connections;
