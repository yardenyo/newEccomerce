import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/Global/InputField";
import useToast from "@/hooks/useToast";
import signPages from "@/assets/images/signPages.jpg";
import { ErrorResponse } from "@/types";
import Helpers from "@/helpers/app.helpers";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await forgotPassword(email).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
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
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values.email);
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <img
          src={signPages}
          alt="Forgot Password"
          className="w-screen md:w-full h-auto md:h-screen"
        />
      </div>
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="form p-4 w-full max-w-md">
          <div className="title flex flex-col gap-4 py-4">
            <h1>Forgot Password</h1>
            <p className="text-gray-500">
              Remember your password?{" "}
              <Link to="/auth/sign-in" className="text-green-400">
                Sign In
              </Link>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              errors={formik.errors.email}
              touched={formik.touched.email}
            />
            <div className="input-field mt-4">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full btn btn-primary"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
