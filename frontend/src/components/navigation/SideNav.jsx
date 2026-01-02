import { motion } from "motion/react";
import Logo from "./../../assets/images/logo.webp";
import { Link, useLocation } from "react-router-dom";
import useAppStore from "../store/useAppStore";

// Import Heroicons
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const SideNav = ({ navItems }) => {
  const { open, setOpen, user } = useAppStore();
  const location = useLocation();

  // Filter out "Doctors" page if user is a doctor
  const filteredNavItems =
    user.role === "doctor"
      ? navItems.filter((item) => item.name !== "Doctors")
      : navItems;

  // Map nav items with icons
  const navWithIcons = filteredNavItems.map((item) => {
    let icon;
    switch (item.name) {
      case "Dashboard":
        icon = <HomeIcon className="w-5 h-5 mr-3 text-red-500" />;
        break;
      case "Appointments":
        icon = <CalendarIcon className="w-5 h-5 mr-3 text-red-500" />;
        break;
      case "Doctors":
        icon = <UserGroupIcon className="w-5 h-5 mr-3 text-red-500" />;
        break;
      case "Patients":
        icon = <UserIcon className="w-5 h-5 mr-3 text-red-500" />;
        break;
      case "Settings":
        icon = <Cog6ToothIcon className="w-5 h-5 mr-3 text-red-500" />;
        break;
      default:
        icon = null;
    }
    return { ...item, icon };
  });

  return (
    <motion.div
      initial={false}
      animate={{ x: open ? 0 : -200 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50 flex flex-col justify-between"
    >
      {/* Top section */}
      <div>
        {/* Logo */}
        <div className="p-6 flex flex-row items-center border-b border-slate-200">
          <img src={Logo} className="w-20 h-20 object-contain" alt="Logo" />
          <span className="mt-2 font-bold text-red-600 text-lg">
            Doctor's Appointment
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {navWithIcons.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-6 py-3 text-slate-700 hover:bg-red-100 ml-3 mt-2 hover:text-red-600 transition font-medium rounded-l ${
                location.pathname === item.path
                  ? "bg-red-100 ml-3 text-red-600"
                  : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom toggle button */}
      <div className="p-4 border-t border-slate-200 flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl w-10 h-10 flex items-center justify-center bg-red-100 rounded-full hover:bg-red-200 transition"
        >
          {open ? "«" : "»"}
        </button>
      </div>
    </motion.div>
  );
};

export default SideNav;
