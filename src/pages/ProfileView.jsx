import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import "../styles/LogSignin.css";

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
                const { data } = await axios.get(`/api/users/${sub}`, {
                    headers: { Authorization: `Bearer ${idToken}` },
                });
                setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated]);

    if (!profileData) return <p>Loading profile...</p>;

    return (
        <div>
            <div className="sign-out-button">
            <button onClick={() => auth.signoutRedirect()}
            >Sign out</button> 
            </div>
        
        <div style={{
            display: "flex",
            justifyContent: "center",
            
            alignSelf: "center",
        }}>
            <div style={{
                background: "rgba(215, 200, 178, 0.9)", // slightly transparent background
                padding: "30px",
                border: "4px solid rgba(75, 52, 15, 0.6)", // semi-transparent border
             
                maxWidth: "800px",
                width: "100%",
                color: "#4B340F",
            }}>

                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>My Profile</h1>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "30px",
                    gap: "30px",
                    
                }}>
                    {profileData.profilePicture ? (
                        <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                    ) : (
                        <div style={{
                            width: "150px",
                            height: "150px",
                            background: "#eee",
                            borderRadius: "10px",
                            
                        }} />
                    )}
                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                        <p><strong>Full Name:</strong> {profileData.fullName}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                    </div>
                </div>

                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <p><strong>Industry:</strong> {profileData.industry}</p>
                    <p><strong>Job Title:</strong> {profileData.jobTitle}</p>
                    <p><strong>Location:</strong> {profileData.user_location}</p>
                    <p><strong>Expertise:</strong> {Array.isArray(profileData.expertise) ? profileData.expertise.join(", ") : profileData.expertise}</p>
                    <p><strong>Education:</strong> {profileData.education}</p>
                    <p><strong>Seeking:</strong> {profileData.seeking?.join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p style={{
                        padding: "10px",
                    }}></p>
                </div>

                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    <button
                        onClick={() => navigate("/edit-profile")}
                        style={{ width: "200px" }}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        style={{ width: "200px" }}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ViewProfile;
