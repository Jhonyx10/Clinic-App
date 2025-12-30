import SideNav from "./SideNav";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react"; // fixed import
import useAppStore from "../store/useAppStore";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Appointments", path: "/appointments" },
  { name: "Doctors", path: "/doctors" },
  { name: "Patients", path: "/patients" },
  { name: "Settings", path: "/settings" },
];

const Layout = () => {
  const { open } = useAppStore();

  return (
    <motion.div
      layout
      className="flex bg-slate-100"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Side Navigation */}
      <SideNav navItems={navItems} />

      {/* Main content area */}
      <motion.div
        layout
        style={{
          marginLeft: open ? "16rem" : "4rem",
          transition: "all 0.3s ease",
        }}
        className="h-screen w-full dark:bg-gray-50 overflow-auto"
      >
        <TopNav navItems={navItems} />
        <motion.div className="z-30 p-6">
          <Outlet />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Layout;
