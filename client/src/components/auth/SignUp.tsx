import api from "@/api/Api";
import Helpers from "@/helpers/app.helpers";
import { SignUpPayload } from "@/types/auth";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const SignUp: React.FC = () => {
  const handleSubmit = async (values: SignUpPayload) => {
    try {
      const response = await api.post("/auth/signup", values);
      const { data, message } = Helpers.handleAxiosSuccess(response);
      console.log(data, message);
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
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
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
    }),
    onSubmit: (values: SignUpPayload) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.errors.firstName && formik.touched.firstName && (
          <div>{formik.errors.firstName}</div>
        )}
        <br />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.lastName && formik.touched.lastName && (
          <div>{formik.errors.lastName}</div>
        )}
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
        )}
        <br />
        <input
          type="text"
          id="mobile"
          name="mobile"
          placeholder="Mobile"
          onChange={formik.handleChange}
          value={formik.values.mobile}
        />
        {formik.errors.mobile && formik.touched.mobile && (
          <div>{formik.errors.mobile}</div>
        )}
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div>{formik.errors.password}</div>
        )}
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
