// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// --- public site
import Navbar from "./components/Navbar";
import { FooterHome } from "./pages/home/footerHome";
import Home from "./pages/home/home.jsx";
import Help from "./pages/help/Help.jsx";
import About from "./pages/Aboutus/About.jsx";
import ContactUs from "./pages/Contact.jsx";

// --- auth 
import Login from "./pages/login/Login.jsx";
import ForgetPass from "./pages/Forgetpass/Forgetpass.jsx";
import Register from "./pages/Register/Register_layout.jsx";

// --- dashboard (header/footer)

import Dashboard from "./pages/Dash_board/Dashboard.jsx"; // create this file
import Dash_board_layout from "./pages/Dash_board/Dash_board_layout.jsx";
import ProductAdd from "./pages/Dash_board/Product/Product_add.jsx";
import ProductList from "./pages/Dash_board/Product/Product_list.jsx";
import CustomerList from "./pages/Dash_board/Customer/Customer_list.jsx";
import CustomerAdd from "./pages/Dash_board/Customer/Customer_add.jsx";
import PointOfSale from "./pages/Pos/Pos_system.jsx";
import InvoicePage from "./pages/Pos/invoice.jsx";
import StockReport from "./pages/Dash_board/Report/stockReport.jsx";
import SalesReport from "./pages/Dash_board/Report/salesReport.jsx";
import AddSupplier from "./pages/Dash_board/Supplier/addSupplier.jsx";
import SupplierList from "./pages/Dash_board/Supplier/supplierList.jsx";
import UserManagement from "./pages/Dash_board/userManagement/userManagement.jsx";


// ---------------- Layouts ----------------
function DefaultLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterHome />
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

// ---------------- App Router ----------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site (Navbar + Footer) */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feature" element={<div>Feature</div>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/help" element={<Help />} />
        </Route>

        {/* Auth screens (no header/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/loguser" element={<Login />} />
          <Route path="/logRegister" element={<Register />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path="/dashboard/invoice" element={<InvoicePage/>} />
        </Route>

        {/* Dashboard app (own header/footer) */}
        <Route element={<Dash_board_layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* add more dashboard pages here */}
          <Route path="/dashboard/management" element={<div>Management(stub)</div>} />
          <Route path="/dashboard/report" element={<div>Report (stub)</div>} />
          <Route path="/dashboard/product" element={<div><ProductAdd></ProductAdd></div>} />
          <Route path="/dashboard/productlist" element={<ProductList/>} />
          <Route path="/dashboard/customerlist" element={<CustomerList/>} />
          <Route path="/dashboard/customeradd" element={<CustomerAdd/>} />
          <Route path="/dashboard/pos" element={<PointOfSale/>} />
          <Route path="/dashboard/salesreport" element={<SalesReport/>} />
          <Route path="/dashboard/stockreport" element={<StockReport/>} />
          <Route path="/dashboard/supplier" element={<AddSupplier/>} />
          <Route path="/dashboard/supplierlist" element={<SupplierList/>} />
          <Route path="/dashboard/usermanagement" element={<UserManagement/>} />
          <Route path="/dashboard/usermanagement" element={<InvoicePage/>} />
          
          
          
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6 text-center text-slate-600">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
