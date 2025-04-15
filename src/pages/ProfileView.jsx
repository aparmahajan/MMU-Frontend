import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import "../styles/LogSignin.css"; // Optional, reuse your CSS

const ViewProfile = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.isAuthenticated || !auth.user?.id_token) {
                console.warn("User not authenticated");
                return;
            }

            const idToken = auth.user.id_token;
            setToken(idToken);
            const sub = auth.user.profile.sub;

            try {
                const { data } = await axios.get(
                    `/api/users/${sub}`,
                    {
                        headers: { Authorization: `Bearer ${idToken}` },
                    }
                );
                setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated]);

    if (!profileData) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <h1>My Profile</h1>
            <div className="profile-info">
                {/*{profileData.profilePicture && (
                    <img
                        src={profileData.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                        style={{ width: "150px", borderRadius: "10px", marginBottom: "10px" }}
                    />
                )}*/}
                <p><strong>Full Name:</strong> {profileData.fullName}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Industry:</strong> {profileData.industry}</p>
                <p><strong>Job Title:</strong> {profileData.jobTitle}</p>
                <p><strong>Location:</strong> {profileData.location}</p>
                <p><strong>Expertise:</strong> {Array.isArray(profileData.expertise) ? profileData.expertise.join(", ") : profileData.expertise}</p>
                <p><strong>Education:</strong> {profileData.education}</p>
                <p><strong>Seeking:</strong> {profileData.seeking?.join(", ")}</p>

                <button onClick={() => navigate("/edit-profile")}
		  style={{
                    width: "250px",
                  }}
		>Edit Profile</button>
		<button onClick={() => navigate("/")}
		  style={{
                    width: "250px",
                  }}
		>Return to Home</button> 
           </div>
        </div>
    );
};

export default ViewProfile;
