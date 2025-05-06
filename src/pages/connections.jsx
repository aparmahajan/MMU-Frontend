import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function Connections() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [pending, setPending] = useState([]);
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
	
	setPending(parsed.pending || []);
	setConnected(parsed.connected || []);

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
        headers: { Authorization: `Bearer ${idToken}` }
      });

      setPending(prev => prev.filter(c =>
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

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Pending Requests:</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pending.length === 0 && !loading ? <p>No pending requests.</p> : null}
      {pending.map((conn, idx) => (
        <div key={idx} style={{
          border: "1px solid #ccc",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "8px"
        }}>
          <p><strong>From:</strong> {conn.userID1}</p>
          <button onClick={() => handleAccept(conn)} style={{ marginRight: "10px" }}>
            Accept
          </button>
          {/* Ignore button disabled for now */}
          {/* <button onClick={() => handleIgnore(conn)}>Ignore</button> */}
        </div>
      ))}

      <h2 style={{ marginTop: "30px" }}>My Connections:</h2>
      {connected.length === 0 && !loading ? <p>No connections yet.</p> : null}
      {connected.map((conn, idx) => {
        const otherUser = conn.userID1 === auth.user.profile.sub ? conn.userID2 : conn.userID1;
        return (
          <div key={idx} style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}>
            <p><strong>Connected with:</strong> {otherUser}</p>
          </div>
        );
      })}

      <button onClick={() => navigate("/")} style={{ marginTop: "30px", width: "250px" }}>
        Return to Home
      </button>
    </div>
  );
}

export default Connections;

