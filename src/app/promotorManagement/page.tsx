"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/libs/promotor";
import { EVENT_CATEGORIES } from "@/types/form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RichTextEditor from "@/components/tiptapRichText";

const validationSchema = Yup.object({
  event_title: Yup.string().required("Event title is required"),
  event_category: Yup.string().required("Event category is required"),
  event_location: Yup.string().required("Event location is required"),
  event_venue: Yup.string().required("Event venue is required"),
  event_dateTime: Yup.string().required("Event date and time are required"),
  event_description: Yup.string().required("Event description is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Append form values to FormData
      for (const key in values) {
        const item = values[key];
        if (item) {
          formData.append(key, item instanceof Blob ? item : item.toString());
        }
      }

      // Log the FormData as an object (for debugging)
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log("FormData Object:", formDataObject);

      // Call the createEvent function
      const response = await createEvent(formData);
      console.log("Event created successfully:", response);

      toast.success("Event created successfully!");
      resetForm();
      // Navigate to events page or perform other actions
      router.push("/promotorManagement");
    } catch (error) {
      toast.error(`Error creating event: ${error.message}`);
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CreateEventForm />
    </div>
  );
};
