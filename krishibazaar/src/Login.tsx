import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState("");
  const [animateInputs, setAnimateInputs] = useState("");

  // Trigger fade-in animations on mount
  useEffect(() => {
    setAnimate("animate__animated animate__fadeInUp");
    setAnimateInputs("animate__animated animate__fadeInLeft");
  }, []);

  const handleSignUpClick = () => {
    setAnimate("animate__animated animate__fadeOutUp");

    // Optional: hide after animation
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in (based on sessionStorage)
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      const userType = sessionStorage.getItem("userType");
      if (userType === "0") {
        navigate("/vendor");
      } else {
        navigate("/farmer");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        alert("Login successful!");

        // Assuming your backend returns userType as a string or number in response.data.userType
        const userType = response.data.type;

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userType", userType);

        if (userType === "0" || userType === 0  || userType ==  false) {
          navigate("/vendor");
        } else {
          navigate("/farmer");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      {isVisible && (
        <div
          className={`relative w-full max-w-md md:max-w-xl bg-white rounded-b-[4rem] rounded-t-[2rem] shadow-lg transition-all duration-500 hover:scale-[1.03] overflow-hidden animate__animated animate__fadeInUp`}
        >
          <img
            src="banner.png"
            alt="Banner"
            className="w-full rounded-t-[2rem] object-cover"
          />
          <div className="p-8 pt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`relative ${animateInputs}`}>
                <span className="block mb-1 text-sm font-medium">
                  Email Address
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="fa-envelope fa-regular absolute left-2 top-9 text-gray-400 pointer-events-none"></i>
              </div>
              <div className={`relative ${animateInputs}`}>
                <span className="block mb-1 text-sm font-medium">Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Must be 8 characters long"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 font-semibold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-600"
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash w-5 h-5" />
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </button>
                <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none"></div>
                <i className="fa-lock fa-solid absolute left-2 top-9 text-gray-400 pointer-events-none"></i>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-green-300 text-black font-bold rounded-full shadow-md hover:bg-[#212121] hover:text-white transition duration-200 animate__animated animate__zoomIn animate__delay-0.85s"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="text-center mt-6 text-sm animate__animated animate__fadeInUp">
              Don’t have an account?{" "}
              <Link to="/signup">
                <button
                  onClick={handleSignUpClick}
                  className="text-black font-semibold hover:text-red-500 hover:underline"
                >
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
