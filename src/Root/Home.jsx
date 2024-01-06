import React from 'react'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-blue-600 mb-4">Your Favorite Notes App</h1>
        <p className="text-gray-600">Crafted with ...</p>
        <div className="mt-8">
          <a
            href="/login"
            className="inline-block bg-blue-500 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-600"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
