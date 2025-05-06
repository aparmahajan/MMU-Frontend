import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import Select from "react-select";
import "../styles/LogSignin.css";

const EditProfile = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState({
        fullName: "",
        email: "",
        profilePicture: "",
        industry: "",
        jobTitle: "",
        user_location: "",
        expertise: [],
        education: "",
        seeking: [],
    });

    const expertiseOptions = [
        { value: "Software Development", label: "Software Development" },
        { value: "Marketing and Branding", label: "Marketing and Branding" },
        { value: "Business Strategy", label: "Business Strategy" },
        { value: "Data Analysis & AI", label: "Data Analysis & AI" },
        { value: "Public Speaking", label: "Public Speaking" },
        { value: "Project Management", label: "Project Management" },
        { value: "Graphic Design", label: "Graphic Design" },
        { value: "Finance & Accounting", label: "Finance & Accounting" },
        { value: "Diversity & Inclusion", label: "Diversity & Inclusion" },
        { value: "Content Creation", label: "Content Creation" },
        { value: "Sales & Business Development", label: "Sales & Business Development" },
        { value: "Education & Training", label: "Education & Training" },
        { value: "Healthcare & Wellness", label: "Healthcare & Wellness" },
        { value: "Legal Consulting", label: "Legal Consulting" },
        { value: "Entrepreneurship & Startups", label: "Entrepreneurship & Startups" },
    ];

    const seekingOptions = [
        { value: "Mentorship", label: "Mentorship" },
        { value: "Collaboration", label: "Collaboration" },
        { value: "Networking", label: "Networking" },
        { value: "Job Opportunities", label: "Job Opportunities" },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.isAuthenticated || !auth.user?.id_token) return;

            const idToken = auth.user.id_token;
            setToken(idToken);
            const sub = auth.user.profile.sub;

            try {
                const { data } = await axios.get(`/api/users/${sub}`, {
                    headers: { Authorization: `Bearer ${idToken}` },
                });
                setProfileData({
                    fullName: data.fullName || "",
                    email: data.email || "",
                    profilePicture: data.profilePicture || "",
                    industry: data.industry || "",
                    jobTitle: data.jobTitle || "",
                    user_location: data.user_location || "",
                    expertise: data.expertise || [],
                    education: data.education || "",
                    seeking: data.seeking || [],
                });
            } catch (err) {
                setError("Failed to load profile.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/users/${auth.user.profile.sub}`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/viewprofile");
        } catch (err) {
            setError("Failed to update profile.");
            console.error(err);
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                maxWidth: "800px",
                width: "100%",
                color: "#000",
                
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Edit Profile</h1>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Profile Picture URL"
                        value={profileData.profilePicture}
                        onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Industry"
                        value={profileData.industry}
                        onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={profileData.jobTitle}
                        onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={profileData.user_location}
                        onChange={(e) => setProfileData({ ...profileData, user_location: e.target.value })}
                    />
                    <Select
                        options={expertiseOptions}
                        isMulti
                        placeholder="Expertise"
                        value={profileData.expertise.map((value) => ({ value, label: value }))}
                        onChange={(selected) =>
                            setProfileData({
                                ...profileData,
                                expertise: selected.map((opt) => opt.value),
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Education"
                        value={profileData.education}
                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                    />
                    <Select
                        options={seekingOptions}
                        isMulti
                        placeholder="Seeking"
                        value={profileData.seeking.map((value) => ({ value, label: value }))}
                        onChange={(selected) =>
                            setProfileData({
                                ...profileData,
                                seeking: selected.map((opt) => opt.value),
                            })
                        }
                    />
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                        <button type="submit" style={{ width: "200px" }}>Save Profile</button>
                        <button type="button" onClick={() => window.location.reload()} style={{ width: "200px" }}>
                            Discard Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
