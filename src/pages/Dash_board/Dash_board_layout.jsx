// import { Outlet, NavLink, Link } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";

// export default function Dash_board_layout() {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   // close dropdown when clicking outside
//   useEffect(() => {
//     function onDocClick(e) {
//       if (!menuRef.current) return;
//       if (!menuRef.current.contains(e.target)) setOpen(false);
//     }
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

//   const baseLink =
//     "px-2 py-1 rounded hover:text-blue-600";
//   const activeLink =
//     "px-2 py-1 rounded text-blue-700 font-semibold";

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Dashboard Header */}
//       <header className="bg-white border-b shadow-sm">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
//           <h1 className="text-lg font-semibold text-gray-900">IMS Dashboard</h1>

//           {/* Nav */}
//           <nav className="relative flex items-center gap-2 text-sm">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//               end
//             >
//               Overview
//             </NavLink>

//             <NavLink
//               to="/dashboard/productlist"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//             >
//               Product
//             </NavLink>

//             <NavLink
//               to="/dashboard/usermanagement"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//             >
//               Management
//             </NavLink>
//             <NavLink
//               to="/dashboard/customerlist"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//               end
//             >
//               Customer
//             </NavLink>
            
//              <NavLink
//               to="/dashboard/pos"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//               end
//             >
//               POS
//             </NavLink>
//             <NavLink
//               to="/dashboard/supplier"
//               className={({ isActive }) => (isActive ? activeLink : baseLink)}
//               end
//             >
//               Supplier
//             </NavLink>

//             {/* Report dropdown */}
//             <div className="relative" ref={menuRef}>
//               <button
//                 type="button"
//                 onClick={() => setOpen((v) => !v)}
//                 className="px-2 py-1 rounded hover:text-blue-600 inline-flex items-center gap-1"
//                 aria-haspopup="menu"
//                 aria-expanded={open}
//               >
//                 Report
//                 <svg
//                   className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
//                 </svg>
//               </button>

//               {open && (
//                 <div
//                   role="menu"
//                   className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border bg-white shadow-lg z-20"
//                 >
//                   <Link
//                     to="/dashboard/stockreport"
//                     onClick={() => setOpen(false)}
//                     className="block px-3 py-2 text-sm hover:bg-gray-50"
//                     role="menuitem"
//                   >
//                     Stock Report
//                   </Link>
//                   <Link
//                     to="/dashboard/salesreport"
//                     onClick={() => setOpen(false)}
//                     className="block px-3 py-2 text-sm hover:bg-gray-50"
//                     role="menuitem"
//                   >
//                     Sales Report
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
//         <Outlet /> {/* dashboard child pages render here */}
//       </main>

//       {/* Dashboard Footer */}
//       <footer className="bg-white border-t py-3 text-center text-xs text-gray-500">
//         © {new Date().getFullYear()} IMS • Internal Dashboard
//       </footer>
//     </div>
//   );
// }


import { useState } from "react";

import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* ===== Sticky Sidebar ===== */}
      <div className="sticky top-0 h-screen">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}




