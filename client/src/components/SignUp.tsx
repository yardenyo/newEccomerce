import Axios from "@/api/Axios";
import { useFormik } from "formik";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import * as Yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [error] = useState<string>("");

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await Axios.post("/auth/signup", values);
      console.log(response);
      // history.push("/login");
    } catch (e) {
      // setError(e.response.data.message);
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
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values: FormValues) => {
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
      {error && <p>{error}</p>}
      <p>{/* Already have an account? <Link to="/login">Login</Link> */}</p>
    </div>
  );
};

export default SignUp;
