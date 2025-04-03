import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Login.css';

function Login(){
    const navigate = useNavigate();
    return (
      <div className="login-container">
        <div className="login-box">
            <h1>Melanin Meetups</h1>
            <button onClick={() => navigate("/about")}>Go to About</button>
            <LoginForm/>
        </div>
      </div>
    );
}
  
  export default Login;
  

const LoginForm = () => {
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
                    <input type="text" placeholder="Username" className="input-field" /> 
                    

                </div>
                <div>
                    <input type="password" placeholder="Password" className="input-field"/>
                </div>
                <div>
                    <p>
                        
                    </p>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <span style={{ color: "#FFFFFF" }}>
                        Don't have an account? <Link to="/signup" > Create an Account! </Link>
                    </span>
                </div>

                <div>
                    <Link to="/signup" style={{ color: "#000000" }}> Forgot Password? </Link>
                </div>
            </div>
        </div>
    );
}