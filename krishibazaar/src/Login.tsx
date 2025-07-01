
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="relative w-full max-w-md md:max-w-xl bg-white rounded-b-[4rem] shadow-lg transition-all duration-500 hover:scale-[1.03]">
        <img src="" alt="" />
        <div className="p-8 pt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <form  className="space-y-4">
            <div className="relative">
              <span className="block mb-1 text-sm font-medium">Email Address</span>
              <input
                type="email"
                required
                placeholder="something@gmail.com"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 font-semibold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-envelope fa-regular absolute left-2 top-9 text-gray-400 pointer-events-none">
</i>
            </div>
            <div className="relative">
              <span className="block mb-1 text-sm font-medium">Password</span>
              <input
                type="password"
                required
                placeholder="Must be 8 characters long"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 font-semibold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-lock fa-solid absolute left-2 top-9 text-gray-400 pointer-events-none">
              </i>
            </div>
            {/* <div className="text-right text-sm">
              <a href="home" className="text-black hover:underline hover:text-red-500 font-semibold">
                Forgot password?
              </a>
            </div> */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 py-2 bg-green-300 text-black font-bold rounded-full shadow-md hover:bg-gray-200 hover:text-white transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>
          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-black font-semibold hover:text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


