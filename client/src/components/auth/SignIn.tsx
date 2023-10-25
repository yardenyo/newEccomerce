import authApi from "@/api/auth.api";
import Helpers from "@/helpers/app.helpers";
import { SignInPayload } from "@/types/auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const handleSubmit = async (values: SignInPayload) => {
    try {
      const response = await authApi.signIn(values);
      const { data } = Helpers.handleAxiosSuccess(response);
      const user = data.user;
      const accessToken = data.accessToken;
      setAuth({ user, accessToken });
      console.log(auth);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        Helpers.handleAxiosError(e);
      } else {
        console.log(e);
      }
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
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-red-500">Sign In</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
