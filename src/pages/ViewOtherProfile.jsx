import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import "../styles/LogSignIn.css";

const ViewOtherProfile = () => {
  const auth = useAuth();
  const { userID } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.isAuthenticated || !auth.user || !userID) {
        setError("Not authorized or missing user ID.");
        setLoading(false);
        return;
      }

      try {
        const access_token = auth.user.access_token;
        console.log("Access Token:", access_token);
        console.log("Fetching profile for userID:", userID);

        const { data } = await axios.get(`/api/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 403) {
          setError("You are not authorized to view this profile.");
        } else {
          setError("Could not load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userID, auth.isAuthenticated, auth.user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {profile.fullName}</p>
      <p><strong>Location:</strong> {profile.user_location}</p>
      <p>
        <strong>Job Title:</strong>{" "}
        {profile.jobTitle && profile.jobTitle !== "Not specified"
          ? profile.jobTitle
          : "Job title not provided"}
      </p>
    </div>
  );
};

export default ViewOtherProfile;
