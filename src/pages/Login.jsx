function Login({ onNavigate }) {
    return (
      <div>
        <h1>Login Page</h1>
        <button onClick={() => onNavigate("about")}>Go to About</button>
      </div>
    );
}
  
  export default Login;
  
  