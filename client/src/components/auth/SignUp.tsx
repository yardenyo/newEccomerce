import { useSignupMutation } from "@/features/auth/authApiSlice";
import { SignUpPayload } from "@/types/auth";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import signPages from "@/assets/images/signPages.jpg";
import InputField from "@/components/InputField";
import CheckBox from "@/components/CheckBox";
import useToast from "@/hooks/useToast";
import { ErrorResponse } from "@/types";
import Helpers from "@/helpers/app.helpers";

const SignUp: React.FC = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (values: SignUpPayload) => {
    try {
      const response = await signup(values).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
      navigate("/auth/sign-in", { replace: true });
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      termsAgree: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      mobile: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8)
        .max(32)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      termsAgree: Yup.boolean().oneOf(
        [true],
        "Must Accept Terms and Conditions"
      ),
    }),
    onSubmit: (values: SignUpPayload) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <img
          src={signPages}
          alt="Sign Up"
          className="w-screen md:w-full h-auto md:h-screen"
        />
      </div>
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="form p-4 w-full max-w-md">
          <div className="title flex flex-col gap-4 py-4">
            <h1>Sign Up</h1>
            <p className="text-gray-500">
              Already have an account?{" "}
              <a href="/auth/sign-in" className="text-green-400">
                Sign In
              </a>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              label="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              errors={formik.errors.firstName}
              touched={formik.touched.firstName}
            />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              label="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              errors={formik.errors.lastName}
              touched={formik.touched.lastName}
            />
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
            <InputField
              id="mobile"
              name="mobile"
              type="text"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              errors={formik.errors.mobile}
              touched={formik.touched.mobile}
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
            <div className="text-sm">
              <CheckBox
                id="termsAgree"
                name="termsAgree"
                type="checkbox"
                label="I agree with Privacy Policy and Terms of Use"
                onChange={formik.handleChange}
                errors={formik.errors.termsAgree}
                touched={formik.touched.termsAgree}
              />
            </div>
            <div className="input-field mt-4">
              <button type="submit" className="w-full btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
