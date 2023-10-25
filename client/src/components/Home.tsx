import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
    </section>
  );
};

export default Home;
