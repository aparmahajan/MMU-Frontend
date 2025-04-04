import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/LogSignin.css';

function Signup(){
  
 
    return (
    <div className="log-sign-in-container">
        <div className="log-sign-in-box">
            <h1>Create Your Account</h1>
            <SignInForm/>
        </div>
    </div>
    );
}
  
export default Signup;
  

const SignInForm = () => {
    const navigate = useNavigate();
    
    return (
        <div className="form-container">
            <div>

            <div style={{
                height: "1px", /* Thin bar */
                backgroundColor: "#000000", 
                margin: "20px auto" /* Centers the bar */
                }}>
            </div>

                <div>
                    <input type="email" placeholder="Email" className="input-field"/>
                </div>
                <div>
                    <input type="text" placeholder="Username" className="input-field" /> 
                    

                </div>
                <div>
                    <input type="password" placeholder="Password" className="input-field"/>
                </div>
                
                
                    <p>

                    </p>
              
                <div>
                    <button type="submit" onClick={() => navigate("/login")}>Sign Up</button>
                </div>
                <p> </p>
                <div>
                    <span style={{ color: "#FFFFFF" }}>
                        Already have an account? <Link to="/login" > Sign In! </Link>
                    </span>
                </div>

            </div>
        </div>
    );
}


