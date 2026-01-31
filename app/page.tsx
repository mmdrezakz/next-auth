"use client"; // این خط باید حتماً باشه

import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">Please Login First</h1>
          <a 
            href="/login" 
            className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white"
          >
            Go to Login Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6 text-black">
            <h1 className="font-bold text-3xl">Welcome!</h1>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
            >
              Sign Out
            </button>
          </div>

          <div className="pt-6 border-t">
            <h2 className="mb-4 font-semibold text-xl">Your GitHub Info:</h2>
            

            
            <p className="mb-2 text-lg">
              <strong>Name:</strong> {session?.user?.name || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {session?.user?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}