"use client";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useSession } from "@/context/useSession";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

const RegisterSchema = Yup.object().shape({
  data: Yup.string().required("Field is required"),
  password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

interface FormValues {
  data: string;
  password: string;
}

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
  
      const res = await axios.post(`${base_url}/auth/login`, user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = res.data; // Axios automatically parses JSON
      localStorage.setItem("token", result.token);
      setIsAuth(true);
      setUser(result.user);
      window.location.assign("/");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex w-screen justify-center items-center h-[100vh] flex-col">
      <h1 className="text-2xl font-bold mb-4">Login Form</h1>

      <div className="bg-green-200 w-[20rem] rounded-xl shadow-xl p-[1rem]">
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
                  <label htmlFor="data" className="block mb-1 text-sm font-medium text-gray-900">
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
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white disabled:bg-slate-700 disabled:cursor-wait bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
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
