import { motion } from "motion/react";
import Doctor from './../../assets/images/doctor.png'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-red-600">Clinic App</h1>

          <ul className="hidden md:flex space-x-8 font-medium">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">About</li>
            <li className="hover:text-red-500 cursor-pointer">Features</li>
          </ul>

          <button 
            onClick={() => navigate('/login')}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Manage Clinic Appointments
              <span className="text-red-500"> Easily</span>
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              A simple and efficient clinic management system for patients,
              doctors, and administrators.
            </p>

            <div className="mt-6 flex space-x-4">
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
                Get Started
              </button>

              <button className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-80 h-80 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 text-xl font-semibold">
              <img
                src={Doctor}
                alt="Doctors"
                className="w-80 h-80 object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-24 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Clinic App?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Online Appointments",
              "Doctor Scheduling",
              "Patient Records",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold mb-2">{feature}</h4>
                <p className="text-slate-600">
                  Streamline clinic operations with fast, secure, and reliable
                  tools.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-6 mt-20">
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Clinic App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
