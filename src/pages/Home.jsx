import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Home = () => {
  const auth = useAuth();
  const [token, setToken] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError("");
    const idToken = auth.user.id_token;
    setToken(idToken);

      console.log("ID Token: ", idToken);
      try {
        const { data } = await axios.get(
         `/api/search?fullName=${encodeURIComponent(searchQuery)}`,
        {
            headers: {Authorization: `Bearer ${idToken}` },
        }
        );
        console.log("Profile data: ", data);

	setFilteredProfiles(data.items); 
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProfiles();
    } else {
      setFilteredProfiles([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

return (
    <div className="home-container">
      <h1>Welcome!</h1>

      <button onClick={() => navigate("/viewprofile")}
	style={{
    	width: "250px",
	}}
      >View Profile</button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search profiles by name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
        style={{ display: "block", margin: "20px 0", padding: "8px", width: "100%" }}
      />

      {loading && <p>Loading profiles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

	<div
	  className="profile-list"
	  style={{
    	    display: "flex",
    	    flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
  	  }}
	>
  	{filteredProfiles.length > 0 ? (
    	  filteredProfiles.slice(0,10).map((profile) => (
      	<div
          key={profile.userID}
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
        <p><strong>Name:</strong> {profile.fullName}</p>
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
	>  
	  <strong>Location:</strong>{" "}
          {profile.user_location !== "Not specified"
            ? profile.user_location
            : "Location not provided"}
        </p>
        <p
	  style={{
    	    overflow: "hidden",
    	    textOverflow: "ellipsis",
	  }}
	>
          <strong>Job Title:</strong>{" "}
          {profile.jobTitle !== "Not specified"
            ? profile.jobTitle
            : "Job title not provided"}
        </p>
          <button onClick={() => navigate(`/view-other-profile/${profile.userID}`)
}>
            View Profile
          </button>
        </div>
    	))
  	) : (
    	  !loading && searchQuery && (
      	  <p>No profiles found matching "{searchQuery}".</p>
    	)
  	)}
	</div>

		

    </div>
  );
};


export default Home;

