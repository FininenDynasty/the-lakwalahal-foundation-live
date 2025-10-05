import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import Team from "./components/Team";
import Impact from "./components/Impact";
import Donation from "./components/Donation";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/admin/Admin";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import SEO from "./components/SEO";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MyDrawer from "./components/MyDrawer";

function Home() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <Header />
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Menu
      </button>
      <MyDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <nav className="flex flex-col gap-2">
          <a href="#about" className="text-blue-600">About</a>
          <a href="#programs" className="text-blue-600">Programs</a>
          <a href="#team" className="text-blue-600">Team</a>
          <a href="#impact" className="text-blue-600">Impact</a>
          <a href="#donation" className="text-blue-600">Donate</a>
          <a href="#events" className="text-blue-600">Events</a>
          <a href="#contact" className="text-blue-600">Contact</a>
        </nav>
      </MyDrawer>
      <Hero />
      <About />
      <Programs />
      <Team />
      <Impact />
      <Donation />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}