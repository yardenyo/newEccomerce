import { Link } from "react-router-dom";
import { useSignoutMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import useToast from "@/hooks/useToast";
import { ErrorResponse } from "@/types";

const Home = () => {
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  const toast = useToast();

  const signOut = async () => {
    try {
      await signout({}).unwrap();
      dispatch(logout());
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };
  return (
    <section>
      <h1>Home</h1>
      <div className="flex flex-col">
        <Link to="/auth/sign-in">Sign In</Link>
        <Link to="/admin-dashboard">Admin Dashboard</Link>
        <div onClick={signOut}>Sign Out</div>
      </div>
    </section>
  );
};

export default Home;
