import InputField from "@/components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";

const Subscribe = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 bg-container">
      <div className="left-image items-center justify-center hidden lg:flex">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1699268982/categories/islligcpxjjmv4cd0wjo.png"
          alt="left-image"
          className="object-fit h-96 w-3/4"
        />
      </div>
      <div className="middle-section flex items-center justify-center py-8">
        <div className="flex flex-col items-center justify-center w-full px-4 mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold">Subscribe to our newsletter</h2>
          <p className="text-gray-600">
            Sign up for deals, discounts, new arrivals, and more!
          </p>
          <div className="flex justify-center items-center w-full">
            <form
              className="flex flex-col items-center w-full max-w-sm px-4 py-6 space-y-4"
              onSubmit={formik.handleSubmit}
            >
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
              <button type="submit" className="btn btn-primary w-full max-w-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="right-image items-center justify-center hidden lg:flex">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1699288540/vkzbxpg5d5nsjjow9mjd.png"
          alt="right-image"
          className="object-fit h-96 w-3/4"
        />
      </div>
    </section>
  );
};

export default Subscribe;
