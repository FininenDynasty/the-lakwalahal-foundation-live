import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { VaulProvider } from "vaul";

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
import MyDrawer from "./components/ui/MyDrawer";

const Home = () => (
  <div className="min-h-screen bg-white">
    <SEO />
    <Header />
    <Hero />
    <About />
    <Programs />
    <Team />
    <Impact />
    <Donation />
    <Events />
    <Contact />
    <Footer />

    {/* Optional Drawer anywhere */}
    <MyDrawer>
      <p>Put extra content here!</p>
    </MyDrawer>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <VaulProvider>
        <BrowserRouter>
          <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </BrowserRouter>
      </VaulProvider>
    </HelmetProvider>
  );
}

export default App;