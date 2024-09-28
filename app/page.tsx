// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { handleFormSubmission } from "@/actions/submitForm";
import { Status } from "./api/status/route";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formResponse, setFormResponse] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<Status | null>(null);

  // Fetch the /api/status endpoint when the component mounts
  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await fetch("/api/status");
        if (response.ok) {
          const data = await response.json();
          setApiStatus(data);
        } else {
          setApiStatus({
            status: "Failed",
            message: "Failed to fetch API status.",
            uptime: "0",
            memory: {
              rss: "0",
              heapTotal: "0",
              heapUsed: "0",
            },
          });
        }
      } catch (error) {
        console.log(error);
        setApiStatus({
          status: "Failed",
          message: "Failed to fetch API status.",
          uptime: "0",
          memory: {
            rss: "0",
            heapTotal: "0",
            heapUsed: "0",
          },
        });
      }
    };

    fetchApiStatus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      const response = await handleFormSubmission(form);
      setFormResponse(response.message);
    } catch (error) {
      console.log(error);
      setFormResponse("Failed to submit the form.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-200 mb-4">
          Next.js Boilerplate
        </h1>
        <p className="text-lg text-gray-300">
          A simple and elegant Next.js boilerplate with best practices and
          minimalistic design.
        </p>
      </header>

      {/* Main Content Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Server Action Form Section */}
        <div className="bg-slate-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Server Action
          </h2>
          <h4 className="text-sm text-gray-600 mb-6 text-center">
            This is a simple form that uses server actions to submit data to the
            server.
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="mt-1 bg-slate-100 text-black block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="mt-1 block bg-slate-100 text-black w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>

          {/* Form Submission Response */}
          {formResponse && (
            <p className="mt-4 text-center text-sm text-green-600 font-medium">
              {formResponse}
            </p>
          )}
        </div>

        {/* API Status Section */}
        <div className="bg-slate-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            API Route
          </h2>
          <h4 className="text-sm text-gray-600 mb-6 text-center">
            This is a NextJS API route that returns the status of the server.
          </h4>
          <h5 className="text-normal text-gray-600 mb-6 text-center italic">
            /api/status
          </h5>
          <div className="space-y-4">
            {/* Display the API status */}
            {apiStatus ? (
              <>
                <p className="text-center text-sm text-green-600">
                  Status: {apiStatus.status}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Message: {apiStatus.message}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Uptime: {apiStatus.uptime}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Memory: {apiStatus.memory.rss}
                </p>
              </>
            ) : (
              <p className="text-center text-sm text-red-600">
                Loading API status...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
