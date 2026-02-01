"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { 
        callbackUrl: "/"  // بعد از لاگین به کجا بره
      })
      await signIn("google",{
        callbackUrl: "/"  // بعد از لاگین به کجا بره
      })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  return (
    <main className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg">
        <header className="mb-6 font-bold text-2xl text-center">LOGIN</header>
        <form>
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className="bg-black hover:bg-gray-800 disabled:opacity-50 px-6 py-3 rounded-lg w-full text-white"
          >
            {isLoading ? "Redirecting to GitHub..." : "Login with GitHub"}
          </button>
                    <button 
            onClick={() => signIn("google")}
            className="flex justify-center items-center gap-3 bg-white hover:bg-gray-50 py-3 border border-gray-300 rounded-lg w-full font-medium text-gray-700"
          >
            
            Continue with Google
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          You will be redirected to GitHub for authentication
        </p>
      </div>
    </main>
  )
}