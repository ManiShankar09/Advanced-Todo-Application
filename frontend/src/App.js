import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import { Signup } from "./Components/Signup";
import Signin from "./Components/Signin";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <div className=" bg-gray-100">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;