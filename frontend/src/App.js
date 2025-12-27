import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StickyCTA from './components/layout/StickyCTA';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsWindowsPage from './pages/ProductsWindowsPage';
import ProductsDoorsPage from './pages/ProductsDoorsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DesignStudioPage from './pages/DesignStudioPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQsPage from './pages/FAQsPage';
import ContactPage from './pages/ContactPage';
import ServiceAreaPage from './pages/ServiceAreaPage';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products/windows" element={<ProductsWindowsPage />} />
              <Route path="/products/doors" element={<ProductsDoorsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/design-studio" element={<DesignStudioPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/upvc-windows-in-:city/*" element={<ServiceAreaPage type="windows" />} />
              <Route path="/upvc-doors-in-:city/*" element={<ServiceAreaPage type="doors" />} />
            </Routes>
          </main>
          <Footer />
          <StickyCTA />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
