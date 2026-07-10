import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center border-b border-gray-200 pb-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Student Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage enrollments, courses, and student details.
        </p>
      </div>
    </header>
  );
}
