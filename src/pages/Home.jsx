import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://zimr7w3b2j.execute-api.us-west-1.amazonaws.com/Prod/search?fullName=${searchQuery}`
        );
        setProfiles(data);
        setFilteredProfiles(data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProfiles();
    } else {
      setProfiles([]);
      setFilteredProfiles([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-container">
      <h1>Welcome!</h1>

      <button onClick={() => navigate("/viewprofile")}>View Profile</button>

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

      <div className="profile-list">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <p><strong>{profile.fullName}</strong></p>
              <p>{profile.email}</p>
              <button onClick={() => navigate(`/viewprofile/${profile.id}`)}>View Profile</button>
            </div>
          ))
        ) : (
          !loading && searchQuery && <p>No profiles found matching "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default Home;

