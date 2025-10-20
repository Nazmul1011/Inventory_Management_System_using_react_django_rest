// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({
//     // email: "demo@ims.com",     // dummy prefill so fields aren’t empty
//     // password: "123456",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPwd, setShowPwd] = useState(false);

//   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // ------------------------------------------------------------
//       // TODO: Replace with real login API call
//       // Example with axios:
//       // const res = await client.post("/auth/login", form);
//       // Save token/user, redirect to dashboard, etc.
//       // ------------------------------------------------------------
//       await new Promise((r) => setTimeout(r, 600)); // fake delay
//       alert(`Pretend Login ✅\n${JSON.stringify(form, null, 2)}`);
//     } catch (err) {
//       console.error(err);
//       // TODO: show proper toast/message from API error
//       alert("Login failed (demo).");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
//         {/* Banner image */}
//         <div className="mx-auto max-w-2xl">
//           <img
//             className="h-40 w-full rounded-xl object-cover"
//             src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop"
//             alt="Login banner"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="mt-6 text-center text-xl font-semibold text-gray-900 sm:text-2xl">
//           Welcome to Inventory Management System
//         </h1>

//         {/* Form */}
//         <form
//           onSubmit={onSubmit}
//           className="mx-auto mt-6 w-full max-w-md space-y-4"
//         >
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={onChange}
//               placeholder="Username/Email"
//               className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//               required
//             />
//           </div>

//           <div className="relative">
//             <input
//               type={showPwd ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={onChange}
//               placeholder="Password"
//               className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPwd((v) => !v)}
//               className="absolute inset-y-0 right-2 my-auto text-xs text-gray-600 hover:text-gray-900"
//               aria-label="Toggle password visibility"
//             >
//               {showPwd ? "Hide" : "Show"}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//           >
//           <Link to ="/dashboard">
//             {loading ? "Logging in..." : "Login"}</Link>
//           </button>

//           <div className="flex items-center justify-between text-xs">
//             {/* Dummy links (routes below) */}
//             <Link to="/forgetpass" className="text-gray-600 hover:text-gray-900">
//               Forgot Password?
//             </Link>
//             <div className="text-gray-600">
//               Don’t have an account?{" "}
//               <Link to="/logRegister" className="font-medium text-blue-600 hover:underline">
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      alert(`Pretend Login ✅\n${JSON.stringify(form, null, 2)}`);
    } catch (err) {
      alert("Login failed (demo).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* ========== Left: Login Form ========== */}
      <div className="flex flex-col justify-center px-10 md:px-20 bg-white">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2">
          <img src="/logo.png" alt="IMS Logo" className="h-8" />
          <h1 className="text-xl font-bold text-gray-800">InventoryMS</h1>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">
          Log in to manage your inventory, track stock, and access your
          dashboard.
        </p>

        {/* ====== Login Form ====== */}
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-5">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={onChange}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={form.password || ""}
              onChange={onChange}
              placeholder="Password"
              className="w-full pl-10 pr-14 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-4 top-2.5 text-xs text-gray-600 hover:text-gray-900"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
          >
            <Link to="/dashboard">
              {loading ? "Logging in..." : "Continue"}
            </Link>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-4">
            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition">
              <FcGoogle className="text-xl" />
            </button>
            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition">
              <FaApple className="text-xl text-gray-900" />
            </button>
            <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition">
              <FaFacebookF className="text-xl text-blue-600" />
            </button>
          </div>

          {/* Forgot / Register Links */}
          <div className="flex items-center justify-between text-xs mt-4">
            <Link
              to="/forgetpass"
              className="text-gray-600 hover:text-indigo-600"
            >
              Forgot Password?
            </Link>
            <div className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/logRegister"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400 text-center leading-relaxed">
          Join thousands of smart users who trust InventoryMS to simplify stock
          tracking, analytics, and business operations.
        </p>
      </div>

      {/* ========== Right: Illustration ========== */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/locker-safe-3d-icon-download-in-png-blend-fbx-gltf-file-formats--deposit-secure-finance-business-pack-icons-7419123.png"
          alt="Login illustration"
          className="w-[70%] drop-shadow-lg"
        />
      </div>
    </div>
  );
}
