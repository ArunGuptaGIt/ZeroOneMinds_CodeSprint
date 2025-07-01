import { useState } from "react";
import { Link } from "react-router-dom";


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
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [choice, setChoice] = useState("vendor");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-[15px] px-4 py-10">
      
      <img src="" alt="" />

      <div className="bg-white w-[36rem] rounded-b-[4rem] shadow-[0.1rem_0.1rem_0.1rem_0.25rem_#DEDEDE] p-8 mt-[8rem] transition-all duration-500">
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign Up</h2>

         <div className="flex justify-around gap-3 mt-[2rem] animate__animated animate__fadeInRight">
          <button
            className={`h-[3rem] w-[10rem] rounded-2xl flex justify-center items-center cursor-pointer ${
              choice === "vendor" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setChoice("vendor")}
          >
            Vendor
          </button>

          <button
            className={`h-[3rem] w-[10rem] rounded-2xl flex justify-center items-center cursor-pointer ${
              choice === "farmer" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setChoice("farmer")}
          >
            Farmer
          </button>
        </div>

         
        <div className="flex justify-between animate__animated animate__fadeInLeft">
         <div className="mt-6 flex flex-col sm:flex-row gap-5 animate__animated animate__fadeInLeft">
  {/* First Name */}
  <div className="relative w-full">
    <label className="block text-gray-700 font-medium">First Name</label>
    <input
      type="text"
      className="pl-[2rem] w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      placeholder="Enter your First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
    <i className="fa-regular fa-user absolute top-[58%] left-[2%] text-gray-500" />
  </div>

  {/* Last Name */}
  <div className="relative w-full">
    <label className="block text-gray-700 font-medium">Last Name</label>
    <input
      type="text"
      className="pl-[2rem] w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      placeholder="Enter your Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
    />
    <i className="fa-regular fa-user absolute top-[58%] left-[2%] text-gray-500" />
  </div>
</div>
        </div>

         <div className="mt-6 relative animate__animated animate__fadeInLeft">
          <label className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            className="pl-[2rem] w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="fa-regular fa-envelope absolute top-[58%] left-[2%]"></i>
        </div>


           <div className="mt-4 relative animate__animated animate__fadeInLeft">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="pl-[2rem] w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2  focus:ring-gray-500 transition"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="fa-solid fa-key absolute top-[58%] left-[2%]"></i>
        </div>

 <div className="mt-6 relative animate__animated animate__fadeInLeft">
          <label className="block text-gray-700 font-medium">Location</label>
          <select
            id="district"
            name="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required
            className="pl-8 pr-3 py-2 w-full mt-1 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm"
          >
            <option value="" >-- Select District --</option>
            {districts.map((district, index) => (
              <option key={index} value={district} >
                {district}
              </option>
            ))}
          </select>
          <i className="fa-solid fa-location-dot absolute top-[58%] left-[2%] text-gray-500"></i>
        </div>

         <div className="mt-6 relative animate__animated animate__fadeInLeft">
          <label className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="number"
            className="pl-[2rem] w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <i className="fa-solid fa-phone absolute top-[58%] left-[2%]"></i>
        </div>

          <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-md">
            Register
          </button>

          <div className="text-center mt-4">
            <span>Already Have an Account? </span>
            <Link to="/login" className="text-red-600 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
   
  );
}