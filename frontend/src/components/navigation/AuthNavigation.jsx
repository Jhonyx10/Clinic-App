import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // fixed import
import useAppStore from "../store/useAppStore";
import Layout from "./Layout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/authPages/Dashboard";
import Appointments from "../pages/authPages/Appointments";
import Doctors from "../pages/authPages/Doctors";
import Patients from "../pages/authPages/Patients";

// Protects authenticated routes
const ProtectedRoute = ({ children }) => {
  const { login } = useAppStore((state) => state);
  return login ? children : <Navigate to="/" replace />;
};

// Prevent logged-in users from accessing public pages
const PublicRoute = ({ children }) => {
  const { login } = useAppStore((state) => state);
  return login ? <Navigate to="/dashboard" replace /> : children;
};

// Animated Routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main Auth Navigation
const AuthNavigation = ({ children }) => {
  return (
    <Router>
      <AnimatedRoutes />
      {children}
    </Router>
  );
};

export default AuthNavigation;
