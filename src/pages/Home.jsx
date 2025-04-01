function Home({ onNavigate }) {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => onNavigate("about")}>Go to About</button>
    </div>
  );
}

export default Home;

