// "use client";
// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useRouter } from "next/navigation";

// const Register = () => {
//   const router = useRouter();
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     username: Yup.string()
//       .min(3, "Username must be at least 3 characters")
//       .required("Username is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//       referal: Yup.string(),
//   });

//   const handleSubmit = async (
//     values: any,
//     { setSubmitting, setErrors }: any
//   ) => {
//     try {
//       // Exclude confirmPassword before sending the data
//       // const { confirmPassword, ...postData } = values;

//       const response = await fetch("http://localhost:8000/api/auth/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (response.ok) {
//         // Redirect to home page upon successful registration
//         alert("success")
//         router.push("/");

//       } else {
//         const errorData = await response.json();
//         console.error("Error:", errorData.message);
//         alert(`Error: ${errorData.message}`);
//         return;
//       }
//       window.location.assign("/");

//     } catch (error) {
//       setErrors({ serverError: "Network error. Please try again later." });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen  mt-[1rem]">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Register
//         </h2>
//         <Formik
//           initialValues={{
//             email: "",
//             username: "",
//             password: "",
//             confirmPassword: "",
//             referal:""
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {() => (
//             <Form>
//               <div id="1"className="flex gap-[1rem]">
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <Field
//                   name="email"
//                   type="email"
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <Field
//                   name="username"
//                   type="text"
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="username"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>
//               </div>
              
//               <div id="2"className="flex gap-[1rem]">
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <Field
//                   name="password"
//                   type="password"
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <Field
//                   name="confirmPassword"
//                   type="password"
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>
//               </div>
              
//               <div id="2"className="flex gap-[1rem]">
//               <div className="mb-6">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Referal Code
//                 </label>
//                 <Field
//                   name="referal"
//                   type="text"
//                   className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <ErrorMessage
//                   name="referal"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Register
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="bg-slate-400 flex flex-col border border-black p-[1rem] shadow-xl rounded-lg">
//         <div className="text-[2rem]">Register New User</div>
//         <div className="flex flex-row gap-[1rem]">
//           <div>
//             <input type="text" name="" id="" placeholder="Input Username" />
//           </div>
//           <div>
//             <input type="text" name="" id="" placeholder="Input Email" />
//           </div>
//           <div>
//             <input type="text" name="" id="" placeholder="Input Referal code" />
//           </div>
//           <div>
//             <input type="text" name="" id="" placeholder="Input Password" />
//           </div>
//           <div>
//             <input type="text" name="" id="" placeholder="Confirm password" />
//           </div>
//         </div>
//         <div>
//           <button
//             type="submit"
//             className=" py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
