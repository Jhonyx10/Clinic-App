import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../util/auth";

const TopNav = ({ navItems }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { open, user, token, setUser, setLogin, setToken } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentNav = navItems.find((item) => item.path === location.pathname);
  const pageTitle = currentNav ? currentNav.name : "";

  const Logout = useMutation({
    mutationFn: (token) => logout(token),
    onSuccess: () => {
      setUser(null);
      setToken(null);
      setLogin(false);
      navigate("/");
    },
  });

  return (
    <motion.div
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-40`}
      style={{
        left: open ? "16rem" : "3rem",
        width: open ? "calc(100% - 16rem)" : "calc(100% - 3rem)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Left - Page Title */}
      <div className="text-xl font-bold text-red-600">{pageTitle}</div>

      {/* Right - User Profile */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200 transition"
        >
          <span>Admin</span>
          <div className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center font-semibold">
            {user?.role === "admin" ? "A" : "D"}
          </div>
        </button>

        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2"
          >
            <Link
              to="/profile"
              className="block px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Profile
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                Logout.mutate(token);
              }}
              className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TopNav;
