function Home({ onNavigate }) {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => onNavigate("login")}>Go to Login</button>
    </div>
  );
}

export default Home;

