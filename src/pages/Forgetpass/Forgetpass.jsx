import { useState } from "react";
import { Link } from "react-router-dom";
// import client from "../../services/client"; // axios instance

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // empty by default
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);

    try {
      // ------------------------------------------------------------
      // TODO: backend endpoint for forgot password
      // Replace "/auth/forgot-password" with the correct route
      const { data } = await client.post("/auth/forgot-password", { email });

      // TODO: check backend response shape
      setMsg(data?.message || "Password reset link sent to your email.");
    } catch (error) {
      console.error(error);
      const apiMsg =
        error?.response?.data?.message || "Failed to send reset link.";
      setErr(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slim top brand */}
     
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Forgot Your Password?
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address below to receive a password reset link.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Inline feedback */}
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

          <div className="text-center text-xs text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline"><Link to ='/logRegister'></Link>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
