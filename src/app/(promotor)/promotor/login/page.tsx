"use client";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useSession } from "@/context/useSession";

// Validation schema for the form
const RegisterSchema = Yup.object().shape({
  data: Yup.string().required("Field is required"),
  password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});
const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

// Interface for form values
interface FormValues {
  data: string;
  password: string;
}

// Register component
export default function Login() {
  const { setIsAuth, setUser } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: FormValues = {
    data: "",
    password: "",
  };

  const handleLogin = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/auth/promotor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      localStorage.setItem("token", result.token);
      setIsAuth(true);
      setUser(result.user);
      window.location.assign("/promotor/dashboard");
      // alert(result.message);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen justify-center items-center h-[100vh] flex-col">
      <h1 className="text-2xl font-bold mb-4">Promotor Login Form</h1>

      <div className="bg-slate-700 w-[20rem] rounded-xl shadow-xl p-[1rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            handleLogin(values);
            actions.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="data" className="block mb-1 text-sm font-medium text-slate-200">
                    Username or Email
                  </label>
                  <Field
                    type="text"
                    name="data"
                    onChange={handleChange}
                    value={values.data}
                    placeholder="Enter your Email or Username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {touched.data && errors.data && <div className="text-red-500 text-xs">{errors.data}</div>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  {touched.password && errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white disabled:bg-slate-700 disabled:cursor-wait bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
