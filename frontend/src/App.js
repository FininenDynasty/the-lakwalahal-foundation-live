import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

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

const Home = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <MyDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/programs">Programs</a>
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
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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

export default App;