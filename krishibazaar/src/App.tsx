import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserLogin from "./Login";
import Signup from "./Signup";
import About from "./components/About";
import VendorDashboard from "./VendorDashboard";
import FarmerDashboard from "./FarmerDashboard";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<UserLogin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/vendor' element={<VendorDashboard/>}/>
            <Route path='/farmer' element={<FarmerDashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}
