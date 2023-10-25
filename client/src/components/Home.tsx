import { Link } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import Helpers from "@/helpers/app.helpers";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { setAuth } = useAuth();
  const api = useAxiosPrivate();

  const signOut = async () => {
    try {
      await api.get("/auth/signout");
      setAuth({ user: null, accessToken: null });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        Helpers.handleAxiosError(e);
      } else {
        console.log(e);
      }
    }
  };
  return (
    <section>
      <h1>Home</h1>
      <div className="flex flex-col">
        <Link to="/admin-dashboard">Admin Dashboard</Link>
        <div onClick={signOut}>Sign Out</div>
      </div>
    </section>
  );
};

export default Home;
