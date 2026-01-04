import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Comp/FooterComp/Footer";
import Header from "./Comp/HeaderComp/Header";
import Hero from "./Comp/hero/Hero";
import Newsletter from "./Comp/NewsletterComp/Newsletter";
import Cart from "./Comp/Product/Cart";
import CategorySection from "./Comp/Product/CategorySection";
import Deal from "./Comp/Product/Deal";
import DiscountSection from "./Comp/Product/Discount";
import FeaturedProduct from "./Comp/Product/FeaturedProduct";
import Login from "./Comp/Security/login";
import MyAccount from "./Comp/Security/My-account";
import Signup from "./Comp/Security/Signup";
import Testimonials from "./Comp/TestimonialsComp/Testimonials";
import RefundPolicy from "./Comp/Policy/RefundPolicy";

import TermsOfService from "./Comp/Policy/Terms&Condition";
import FAQs from "./Comp/Policy/FAQs";
import Farmers from "./Comp/Policy/OurFarmer";
import Checkout from "./Comp/Product/CheckOut";
import { Bakery, Dairy, Fruits, Vegetables } from "./Comp/Product/ProdectPageComp";
import TrackOrder from "./Comp/Track/TrackMyOrder";
import ContactUs from "./Comp/Policy/ContactUs";
import AboutUs from "./Comp/Policy/AboutUs";
import SearchResults from "./Comp/HeaderComp/SearchResults";
import ScrollProgress from "./Comp/hero/ScrollProgress";
import AdminAddProduct from "./Comp/Product/adminProductPage";
import PrivacyPolicy from './Comp/Policy/PrivacyPolicy'
import AdminDashboard from "./Comp/Routes/AdminDashboard";
import AdminRoute from "./Comp/Routes/AdminRoute";
import AdminProtectedRoute from "./Comp/Routes/AdminProtectedRoute";
import AdminProductPage from "./Comp/Product/adminProductPage";
import ChatWidget from "./Comp/ChatBot/ChatWidget";

function App() {
  return (
    <Router>
      <ScrollProgress/>
      <Header />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategorySection />
              <DiscountSection />
              <Testimonials />
              <FeaturedProduct />
              <Newsletter />
         
            </>
          }
        />
        <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="AdminAddProduct"
  element={
    <AdminProtectedRoute>
      <AdminProductPage />
    </AdminProtectedRoute>
  }
/>
        {/* <Route path="/AdminAddProduct" element={<AdminAddProduct />} /> */}
        

        <Route path="/Fruits-Page" element={<Fruits />} />
        <Route path="/Vegetables-Page" element={<Vegetables />} />
        <Route path="/Dairy-Page" element={<Dairy />} />
        <Route path="/Bakery-Page" element={<Bakery />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        <Route path="/Our-Farmers" element={<Farmers />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/Terms&Condition" element={<TermsOfService />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} /> 
        <Route path="/Refund-Policy" element={<RefundPolicy />} />
        <Route path="/Track-Order" element={<TrackOrder />} />
        <Route path="/My-Account" element={<MyAccount />} />
        <Route path="/Deal" element={<Deal />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        <Route path="/search-results" element={<SearchResults />} />
        
      </Routes>
      <ChatWidget/>
      <Footer />
    </Router>
  );
}

export default App;
