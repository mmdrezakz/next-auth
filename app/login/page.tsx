"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function LoginPage() {
   const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
   const [isLoadingGithub, setIsLoadingGithub] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true)
    console.log("Google button clicked!") // این خط رو اضافه کن
    await signIn("google", { 
      callbackUrl: "/",
    })

    setIsLoadingGoogle(false)

  }

  const handleGitHubLogin = async () => {
    setIsLoadingGithub(true)

    console.log("GitHub button clicked!") // این خط رو اضافه کن
    await signIn("github", { 
      callbackUrl: "/",
    })
    setIsLoadingGithub(false)

  }

  return (
    <main className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg">
        <header className="mb-6 font-bold text-2xl text-center">LOGIN</header>
        <form>
          <button 
            onClick={handleGitHubLogin}
            
            disabled={isLoadingGithub}
            className="bg-black hover:bg-gray-800 disabled:opacity-50 px-6 py-3 rounded-lg w-full text-white"
          >
            {isLoadingGithub ? "Loading...":"Login with GitHub"}
          </button>
                    <button 
                    disabled={isLoading}
            onClick={handleGoogleLogin}
            className="flex justify-center items-center gap-3 bg-white hover:bg-gray-50 py-3 border border-gray-300 rounded-lg w-full font-medium text-gray-700"
          >
            
            {isLoadingGoogle ? "Loading...":"Continue with Google"}
            
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          You will be redirected to GitHub for authentication
        </p>
      </div>
    </main>
  )
}