import { useResetPasswordMutation } from "@/features/auth/authApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import useToast from "@/hooks/useToast";
import { ErrorResponse } from "@/types";
import Helpers from "@/helpers/app.helpers";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordPayload } from "@/types/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import signPages from "@/assets/images/signPages.jpg";

const ResetPassword: React.FC = () => {
  const [resetPassword] = useResetPasswordMutation();
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ResetPasswordPayload) => {
    try {
      setIsLoading(true);
      const response = await resetPassword({ token, ...values }).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
      navigate("/auth/sign-in", { replace: true });
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(8)
        .max(32)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <img
          src={signPages}
          alt="Reset Password"
          className="w-screen md:w-full h-auto md:h-screen"
        />
      </div>
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="form p-4 w-full max-w-md">
          <div className="title flex flex-col gap-4 py-4">
            <h1>Reset Password</h1>
            <p className="text-gray-500">
              Remember your password?{" "}
              <Link to="/auth/sign-in" className="text-green-400">
                Sign In
              </Link>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              id="password"
              name="password"
              type="password"
              label="New Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errors={formik.errors.password}
              touched={formik.touched.password}
            />
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              errors={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
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

export default ResetPassword;
