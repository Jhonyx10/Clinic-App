import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../util/auth";

const LoginPage = () => {
  const { setLogin, setUser, setToken} = useAppStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = useMutation({
    mutationFn: (formData) => login(formData),
    onSuccess: (data) => {
      setToken(data.token);
      setLogin(true);
      setUser(data.user);
      setFormData({
        name: "",
        password: ""
      });
      if (data.user.role !== "admin") {
        alert("Access denied. Only admins can log in.");
        return;
      }
    navigate("/dashboard");
    },
    onError: (err) => {
      const errors = err.response?.data?.errors;
      if (errors) {
        alert(Object.values(errors).flat().join("\n"));
      } else {
        alert(err.message || "Login failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Clinic App</h1>
          <p className="text-slate-500 mt-2">Login to your account</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin.mutate(formData);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter user name"
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="••••••••"
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-red-500" />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-red-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition font-medium"
          >
           {handleLogin.isPending? "Loading.." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
