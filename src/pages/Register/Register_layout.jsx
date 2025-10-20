import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { RiShieldUserLine } from "react-icons/ri";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [roles, setRoles] = useState(["Admin", "Staff", "Manager"]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        // future API call
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };
    loadRoles();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Simulate registration
      await new Promise((r) => setTimeout(r, 800));
      setMsg("Registration successful ✅");
    } catch (error) {
      setErr("Registration failed (demo).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* ====== Left: Registration Form ====== */}
      <div className="flex flex-col justify-center px-8 md:px-20 bg-white">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2">
          <img src="/logo.png" alt="IMS Logo" className="h-8" />
          <h1 className="text-xl font-bold text-gray-800">InventoryMS</h1>
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create an Account
        </h2>
        <p className="text-gray-500 mb-8">
          Join us to manage your inventory smarter, faster, and efficiently.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5 w-full max-w-md">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <RiShieldUserLine className="absolute left-3 top-3 text-gray-400 text-lg" />
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

          {/* Feedback */}
          {msg && (
            <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
              {msg}
            </div>
          )}
          {err && (
            <div className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {err}
            </div>
          )}

          {/* Link */}
          <p className="text-center text-xs text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              to="/loguser"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* ====== Right: Illustration ====== */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/sign-up-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--register-form-personal-information-pack-illustrations-6439835.png"
          alt="Register Illustration"
          className="w-[70%] drop-shadow-lg"
        />
      </div>
    </div>
  );
}
