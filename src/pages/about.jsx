function About({ onNavigate }) {
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => onNavigate("home")}>Go to Home</button>
    </div>
  );
}

export default About;

