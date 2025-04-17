import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import "../styles/LogSignin.css"; // Optional, reuse your CSS


const ViewOtherProfile = () => {
  const { userID } = useParams();
  const auth = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userID:", userID);
        const idToken = auth.user?.id_token;
        setToken(idToken);
        console.log("ID Token:", idToken);
        const sub = auth.user.profile.sub;
        console.log("UserID:", userID);

        const response = await axios.get(`/api/profile/${userID}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        console.log("Fetched profile:", response.data);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchProfile();
    }
  }, [userID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!profile) return <p>No profile found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {profile.fullName}</p>
      <p><strong>Location:</strong> {profile.user_location}</p>
      <p><strong>Job Title:</strong> {profile.jobTitle}</p>
    </div>
  );
};

export default ViewOtherProfile;
