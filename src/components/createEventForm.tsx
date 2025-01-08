"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createEvent } from "@/app/libs/promotor";
import { EVENT_CATEGORIES, IEventForm } from "@/types/form";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { eventSchema } from "@/app/libs/schema";
import { useState } from "react";
import RichTextEditor from "./tiptapRichText";
import { FieldThumbnail } from "./eventForm/thumbnail";

const initialValues: IEventForm = {
  event_title: "",
  event_category: "Entertainment",
  thumbnail: null,
  event_location: "",
  event_venue: "",
  event_dateTime: "",
  event_description: "", // Store the rich text content as HTML
};

export default function CreateEventForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: IEventForm, { setSubmitting, resetForm }) => {
    console.log("Form submitted with values:", values); // Log submitted values
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in values) {
        const item = values[key as keyof IEventForm];
        if (item) {
          formData.append(key, item as Blob);
        }
      }

      // Call your API
      await createEvent(formData); // Replace "promotorId" dynamically
      toast.success("Event created successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error creating event. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <Formik initialValues={initialValues} validationSchema={eventSchema} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <Form className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded-lg">
              {/* Event Title */}
              <div>
                <label htmlFor="event_title" className="block text-sm font-medium text-gray-700">
                  Event Title *
                </label>
                <Field id="event_title" name="event_title" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <ErrorMessage name="event_title" component="span" className="text-sm text-red-500" />
              </div>

              {/* Event Category */}
              <div>
                <label htmlFor="event_category" className="block text-sm font-medium text-gray-700">
                  Event Category *
                </label>
                <Field name="event_category" as="select" className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select Category</option>
                  {EVENT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="event_category" component="span" className="text-sm text-red-500" />
              </div>

              {/* Thumbnail */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                  Thumbnail *
                </label>
                <FieldThumbnail name="thumbnail" formik={props} />
                <ErrorMessage name="thumbnail" component="span" className="text-sm text-red-500" />
              </div>

              {/* Event Location */}
              <div>
                <label htmlFor="event_location" className="block text-sm font-medium text-gray-700">
                  Event Location *
                </label>
                <Field id="event_location" name="event_location" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <ErrorMessage name="event_location" component="span" className="text-sm text-red-500" />
              </div>

              {/* Event Venue */}
              <div>
                <label htmlFor="event_venue" className="block text-sm font-medium text-gray-700">
                  Event Venue *
                </label>
                <Field id="event_venue" name="event_venue" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <ErrorMessage name="event_venue" component="span" className="text-sm text-red-500" />
              </div>

              {/* Event Date & Time */}
              <div>
                <label htmlFor="event_dateTime" className="block text-sm font-medium text-gray-700">
                  Event Date & Time *
                </label>
                <Field id="event_dateTime" name="event_dateTime" type="datetime-local" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <ErrorMessage name="event_dateTime" component="span" className="text-sm text-red-500" />
              </div>

              {/* Event Description with tiptap */}
              <div>
                <label htmlFor="event_description" className="block text-sm font-medium text-gray-700">
                  Event Description *
                </label>
                <RichTextEditor value={props.values.event_description} onChange={(content: string) => props.setFieldValue("event_description", content)} />
                <ErrorMessage name="event_description" component="span" className="text-sm text-red-500" />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
                  {isLoading ? "Loading..." : "Create Event"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
