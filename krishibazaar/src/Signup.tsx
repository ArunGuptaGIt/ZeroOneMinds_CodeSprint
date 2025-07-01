import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const districts = [
  "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur",
  "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusha", "Dolakha",
  "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali",
  "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung",
  "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot", "Okhaldhunga",
  "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rukum West",
  "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu",
  "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur",
];

export default function Signup() {
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
      const response = await axios.post("http://localhost:8000/api/signup/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-[15px] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[36rem] rounded-b-[4rem] shadow-md p-8 mt-[8rem] transition-all duration-500"
        encType="multipart/form-data"
      >
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign Up</h2>

        <div className="flex justify-around gap-3 mt-[2rem]">
          <button
            type="button"
            className={`h-[3rem] w-[10rem] rounded-2xl ${choice === "vendor" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setChoice("vendor")}
          >
            Vendor
          </button>
          <button
            type="button"
            className={`h-[3rem] w-[10rem] rounded-2xl ${choice === "farmer" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setChoice("farmer")}
          >
            Farmer
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-5">
          <div className="relative w-full">
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6 relative">
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-4 relative">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-6 relative">
          <label className="block text-gray-700 font-medium">Location</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required


            className="pl-8 pr-3 py-2 w-full mt-1 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm"


          >
            <option value="" >-- Select District --</option>
            {districts.map((district, index) => (

              <option key={index} value={district}>{district}</option>

            ))}
          </select>
        </div>

<div className="mt-6 relative">
  <label className="block text-gray-700 font-medium">Phone Number</label>
  <input
    type="tel"
    pattern="98[0-9]{8}"
    maxLength="10"
    className="pl-[2rem] w-full p-3 mt-1 border rounded-lg"
    placeholder="e.g., 98XXXXXXXX"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    required
  />
  <p className="text-sm text-gray-500 mt-1">Must be 10 digits and start with "98"</p>
</div>


        <div className="mt-6 relative">
          <label className="block text-gray-700 font-medium">Verification Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="w-full p-3 mt-1 border rounded-lg"
          />
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
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <span>Already Have an Account? </span>
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
