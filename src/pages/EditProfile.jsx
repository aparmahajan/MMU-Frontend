import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "react-oidc-context";
import '../styles/LogSignin.css';
import Select from 'react-select';



const EditProfile = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const expertiseOptions = [
        {value: "Software Development", label: "Software Development"},
        {value: "Marketing and Branding", label: "Marketing and Branding"},
        {value: "Business Strategy", label: "Business Strategy"},
        {value: "Data Analysis & AI", label: "Data Analysis & AI"},
        {value: "Public Speaking", label: "Public Speaking"},
        {value: "Project Management", label: "Project Management"},
        {value: "Graphic Design", label: "Graphic Design"},
        {value: "Finance & Accounting", label: "Finance & Accounting"},
        {value: "Diversity & Inclusion", label: "Diversity & Inclusion"},
        {value: "Content Creation", label: "Content Creation"},
        {value: "Sales & Business Development", label: "Sales & Business Development"},
        {value: "Education & Training", label: "Education & Training"},
        {value: "Healthcare & Wellness", label: "Healthcare & Wellness"},
        {value: "Legal Consulting", label: "Legal Consulting"},
        {value: "Entrepreneurship & Startups", label: "Entrepreneurship & Startups"},
    ];
    const seekingOptions = [
        {value: "Mentorship", label: "Mentorship"},
        {value: "Collaboration", label: "Collaboration"},
        {value: "Networking", label: "Networking"},
        {value: "Job Opportunities", label: "Job Opportunities"},        
    ];


    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [industry, setIndustry] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [user_location, setLocation] = useState("");
    const [expertise, setExpertise] = useState([]);
    const [education, setEducation] = useState("");
    const [seeking, setSeeking] = useState([]);
    
    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.isAuthenticated || !auth.user?.id_token) {
                return <p>Loading...</p>;
                console.warn("User not authenticated, skipping profile fetch");
                return;
            }

            const idToken = auth.user.id_token;
            setToken(idToken);

            console.log("ID Token:", idToken);
            console.log("Sub:", auth.user.profile.sub);
            const sub = auth.user.profile.sub;

            try {
                const { data } = await axios.get(
                    `/api/users/${sub}`, // Adjust the endpoint as needed
                    {
                        headers: { Authorization: `Bearer ${idToken}` },
                    }
                );
                console.log("Profile data:", data);
                console.log("data.expertise", data.expertise, typeof data.expertise);
                setFullName(data.fullName || "");
                setEmail(data.email || "");
                setProfilePicture(data.profilePicture || "");
                setIndustry(data.industry || "");
                setJobTitle(data.jobTitle || "");
                setLocation(data.user_location || "");
                setExpertise(data.expertise ||[]);
                setEducation(data.education || "");
                setSeeking(data.seeking || []);
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated, auth.user]);


    const handleChange = async (e) => {
        e.preventDefault();
        const profileData = {
            fullName,
            email,
            profilePicture,
            industry,
            jobTitle,
            user_location,
            expertise,
            education,
            seeking,
        };
        console.log("Profile data to be sent:", profileData);
        try {
            const response = await axios.patch(
                `/api/users/${auth.user.profile.sub}`, // Adjust the endpoint as needed
                profileData,
                {
                    headers: { Authorization: `Bearer ${token}` },  
                }
            );
            
            navigate("/view-profile"); // Redirect to the profile page after successful update
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return(
        <div className="profile-container">
            <h1>  Edit Profile </h1>
            <div>
                <form onSubmit={handleChange}>
                    <input 
                        type="text" 
                        name="fullName" 
                        placeholder="Full Name" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        name="profilePicture" 
                        placeholder="Profile Picture URL" 
                        value={profilePicture} 
                        onChange={(e) => setProfilePicture(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        name="industry" 
                        placeholder="Industry" 
                        value={industry} 
                        onChange={(e) => setIndustry(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        name="jobTitle" 
                        placeholder="Job Title" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        name="user_location" 
                        placeholder="Location" 
                        value={user_location} 
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                    <Select
                        name="expertise"
                        options={expertiseOptions}
                        isMulti={true}
                        placeholder="Expertise"
                        value={expertise.map((value) => ({
                            value,
                            label: value,
                        }))}
                        onChange={(selectedOptions) => {
                            const values = selectedOptions.map(option => option.value);
                            setExpertise(values);
                        }}
                    />

                
                
                    <input 
                        type="text" 
                        name="education" 
                        placeholder="Education" 
                        value={education} 
                        onChange={(e) => setEducation(e.target.value)} 
                    />
                    <Select
                        name="seeking"
                        options={seekingOptions}
                        isMulti={true}
                        placeholder="Seeking"
                        value={seeking.map((value) => ({
                            value,
                            label: value,
                        }))}
                        onChange={(selectedOptions) => {
                            const values = selectedOptions.map(option => option.value);
                            setSeeking(values);
                        }}
                    />
                    <button type="submit"
			style={{
                          width: "250px",
                        }}
		    >Save Profile</button>
		    <button onClick={() => navigate(`/viewprofile/${profile.id}`)}
			style={{
        		  width: "250px",
        		}}
		    >Discard Changes</button>	
               </form>
            </div>        
        
        </div>


    )

};
export default EditProfile;
