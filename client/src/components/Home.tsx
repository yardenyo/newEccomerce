import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import Helpers from "@/helpers/app.helpers";
import { useSignoutMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  const signOut = async () => {
    try {
      await signout({}).unwrap();
      dispatch(logout());
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
