import React from "react";

interface EventDescriptionProps {
  title: string;
  description: string;
  category: string;
}

export default function EventDescription({ title, description, category }: EventDescriptionProps) {
  return (
    <div className="bg-white p-6 shadow rounded-lg mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded inline-block mt-2">{category}</span>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
}
