"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/promotor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert("success");
        router.push("/promotor/login");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert(`Error: ${errorData.message}`);
        return;
      }
      window.location.assign("/promotor/login");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register Promotor</h2>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div id="1" className="flex gap-[1rem]">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field name="email" type="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field name="name" type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div id="2" className="flex gap-[1rem]">
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field name="password" type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field name="confirmPassword" type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="text-white disabled:bg-slate-700 disabled:cursor-wait bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
