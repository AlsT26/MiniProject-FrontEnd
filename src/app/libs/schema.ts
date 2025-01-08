import { EVENT_CATEGORIES } from "@/types/form";
import * as Yup from "yup";

export const eventSchema = Yup.object({
  thumbnail: Yup.mixed<File>()
    .required("Thumbnail is required")
    .test("fileSize", "File terlalu besar (Maksimal 2MB)", (value) => !value || (value instanceof File && value.size <= 2 * 1024 * 1024))
    .test("fileType", "Format file tidak mendukung (hanya .jpeg, .png, .jpg, .webp)", (value) => !value || (value instanceof File && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type))),
  title: Yup.string().min(5, "Title must be at least 5 characters long").max(100, "Title must be at most 100 characters long").required("Title is required"),
  // category: Yup.string().oneOf(["Sport", "Entertainment", "Comedy", "Horror", "Kids", "Adults", "Tech", "Food", "Free", "Paid", "Game"]).required("Category is required"),
  event_category: Yup.mixed<(typeof EVENT_CATEGORIES)[number]>().oneOf(EVENT_CATEGORIES, "Invalid category selected").required("Category is required"),
  description: Yup.string().min(20, "Description must be at least 20 characters long").required("Description is required"),
  dateTime: Yup.date().typeError("Invalid date and time format").required("Date and time are required").min(new Date(), "Can't use past date"),
  location: Yup.string().required("Location is required"),
  venue: Yup.string().min(20, "Venue must be at least 20 characters long").max(100, "Venue can't contain more than 100 letters").required("Venue is required"),
});
