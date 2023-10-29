import { useSigninMutation } from "@/features/auth/authApiSlice";
import { setAccessToken } from "@/features/auth/authSlice";
import Helpers from "@/helpers/app.helpers";
import { SignInPayload } from "@/types/auth";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import signPages from "@/assets/images/signPages.jpg";
import { ErrorResponse } from "@/types";
import useToast from "@/hooks/useToast";
import { useState } from "react";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [login] = useSigninMutation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: SignInPayload) => {
    try {
      setIsLoading(true);
      const response = await login(values).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setAccessToken(data));
      toast.toastSuccess(message);
      navigate(from, { replace: true });
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8)
        .max(32)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values: SignInPayload) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <img
          src={signPages}
          alt="Sign In"
          className="w-screen md:w-full h-auto md:h-screen"
        />
      </div>
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="form p-4 w-full max-w-md">
          <div className="title flex flex-col gap-4 py-4">
            <h1>Sign In</h1>
            <p className="text-gray-500">
              Don't have an account yet?{" "}
              <a href="/auth/sign-up" className="text-green-400">
                Sign Up
              </a>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              id="email"
              name="email"
              type="text"
              label="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              errors={formik.errors.email}
              touched={formik.touched.email}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errors={formik.errors.password}
              touched={formik.touched.password}
            />
            <div className="flex">
              <div className="text-sm">
                <a href="/auth/forgot-password" className="font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="input-field mt-4">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full btn btn-primary"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
