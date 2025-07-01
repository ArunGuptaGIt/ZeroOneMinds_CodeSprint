import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const districts = [
  "Achham",
  "Arghakhanchi",
  "Baglung",
  "Baitadi",
  "Bajhang",
  "Bajura",
  "Banke",
  "Bara",
  "Bardiya",
  "Bhaktapur",
  "Bhojpur",
  "Chitwan",
  "Dadeldhura",
  "Dailekh",
  "Dang",
  "Darchula",
  "Dhading",
  "Dhankuta",
  "Dhanusha",
  "Dolakha",
  "Dolpa",
  "Doti",
  "Eastern Rukum",
  "Gorkha",
  "Gulmi",
  "Humla",
  "Ilam",
  "Jajarkot",
  "Jhapa",
  "Jumla",
  "Kailali",
  "Kalikot",
  "Kanchanpur",
  "Kapilvastu",
  "Kaski",
  "Kathmandu",
  "Kavrepalanchok",
  "Khotang",
  "Lalitpur",
  "Lamjung",
  "Mahottari",
  "Makwanpur",
  "Manang",
  "Morang",
  "Mugu",
  "Mustang",
  "Myagdi",
  "Nawalpur",
  "Nuwakot",
  "Okhaldhunga",
  "Palpa",
  "Panchthar",
  "Parbat",
  "Parsa",
  "Pyuthan",
  "Ramechhap",
  "Rasuwa",
  "Rautahat",
  "Rolpa",
  "Rukum West",
  "Rupandehi",
  "Salyan",
  "Sankhuwasabha",
  "Saptari",
  "Sarlahi",
  "Sindhuli",
  "Sindhupalchok",
  "Siraha",
  "Solukhumbu",
  "Sunsari",
  "Surkhet",
  "Syangja",
  "Tanahun",
  "Taplejung",
  "Terhathum",
  "Udayapur",
];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [animate, setAnimate] = useState("");
  const [animateInputs, setAnimateInputs] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [choice, setChoice] = useState("vendor");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^98\d{8}$/.test(phoneNumber)) {
      alert("Phone number must be 10 digits and start with '98'.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image for verification.");
      return;
    }

    if (choice === "farmer" && (!price || isNaN(price) || Number(price) < 0)) {
      alert("Please enter a valid price.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", selectedDistrict);
    formData.append("type", choice === "farmer" ? 1 : 0);
    formData.append("image_for_verification", imageFile);

    if (choice === "farmer") {
      formData.append("price", price);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-[15px] px-4 py-10 ">
      {isVisible && (
        <div className="w-[36rem] rounded-b-[4rem] rounded-t-[2rem] shadow-md bg-white overflow-hidden transition-all duration-500 animate__animated animate__fadeInUp">
          <img
            src="banner.png"
            alt="Banner"
            className="w-full rounded-t-[2rem] object-cover"
          />

          <form
            onSubmit={handleSubmit}
            className={`bg-white w-[36rem] rounded-b-[4rem] shadow-md p-8  transition-all duration-500 overflow-hidden animate__animated animate__fadeInUp ${animate}`}
            encType="multipart/form-data"
          >
            <div className="flex justify-around gap-3">
              <button
                type="button"
                className={`h-[3rem] w-[10rem] rounded-2xl ${
                  choice === "vendor"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                } animate__animated animate__fadeInLeft`}
                onClick={() => setChoice("vendor")}
              >
                Vendor
              </button>
              <button
                type="button"
                className={`h-[3rem] w-[10rem] rounded-2xl ${
                  choice === "farmer"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                } animate__animated animate__fadeInRight`}
                onClick={() => setChoice("farmer")}
              >
                Farmer
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-5 animate__animated animate__fadeInLeft">
              <div className="relative w-full">
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <i className="fa-solid fa-user absolute left-3 top-10 text-gray-400 pointer-events-none"></i>
              </div>

              <div className="relative w-full">
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-6 relative animate__animated animate__fadeInLeft">
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="fa-envelope fa-regular absolute left-3 top-11 text-gray-400 pointer-events-none"></i>
            </div>

            <div className={`mt-4 relative animate__animated animate__fadeInLeft ${animateInputs}`}>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              <i className="fa-lock fa-solid absolute left-3 top-10 text-gray-400 pointer-events-none"></i>
            </div>

            <div className="mt-6 relative animate__animated animate__fadeInLeft">
              <label className="block text-gray-700 font-medium">
                Location
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
              >
                <option value="">-- Select District --</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-location-dot absolute left-3 top-10 text-gray-400 pointer-events-none"></i>
            </div>

            <div className="mt-6 relative animate__animated animate__fadeInLeft">
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                pattern="98[0-9]{8}"
                maxLength="10"
                className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                placeholder="e.g 98XXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <i className="fa-solid fa-phone absolute left-3 top-10 text-gray-400 pointer-events-none"></i>
            </div>

            <div className="mt-6 relative animate__animated animate__fadeInLeft">
              <label className="block text-gray-700 font-medium">
                Verification Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
                className="w-full p-3 mt-1 border rounded-lg"
              />
              <i className="fa-solid fa-file absolute inset-y-0 right-0 top-10 flex items-center px-3 text-gray-600"></i>
            </div>

            {choice === "farmer" && (
              <div className="mt-6 relative">
                <label className="block text-gray-700 font-medium">Price</label>
                <input
                  type="number"
                  min="0"
                  className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
                  placeholder="Enter your Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required={choice === "farmer"}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 animate__animated animate__zoomIn animate__delay-0.85s"
            >
              Register
            </button>

            <div className="text-center mt-4 animate__animated animate__fadeInUp">
              <span>Already Have an Account? </span>
              <Link
                to="/login"
                className="text-red-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
