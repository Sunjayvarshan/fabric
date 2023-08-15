import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Admin from "./components/Admin";
import Product from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="admin" element={<Admin />} /> */}
          <Route path="products" element={<Product />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
