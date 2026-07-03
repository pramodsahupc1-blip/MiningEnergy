import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/UI';
import { Zap, Shield, TrendingUp, Globe, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Landing() {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const appName = useStore(state => state.appName);

  const appLogo = useStore(state => state.appLogo);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--color-border)] py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="flex items-center space-x-2">
          {appLogo ? (
            <img src={appLogo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
          )}
          <span className="text-xl font-heading font-bold text-[var(--color-text-primary)]">{appName}</span>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/auth" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            Log In
          </Link>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-red-50 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>Next-Gen Cloud Mining is Here</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-6">
          Maximize Your Crypto <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]">Mining Returns.</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
          Secure, transparent, and highly profitable cloud mining investment platform. Start earning daily rewards with enterprise-grade mining hardware today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/auth">
            <Button size="lg" className="px-8 flex items-center">
              Start Mining Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="px-8">
              View Plans
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[var(--color-border)] text-center">
          <div>
            <h4 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">150K+</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">Active Miners</p>
          </div>
          <div>
            <h4 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">₹24M+</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">Paid Out</p>
          </div>
          <div>
            <h4 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">99.9%</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">Uptime</p>
          </div>
          <div>
            <h4 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">24/7</h4>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">Expert Support</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--color-bg)] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)]">Why Choose {appName}?</h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">We eliminate the complexity of hardware setup, maintenance, and power costs, providing a seamless investment experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-border)]">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-[var(--color-primary)] w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Daily Automated Payouts</h3>
              <p className="text-[var(--color-text-secondary)]">Your mining rewards are calculated and distributed directly to your wallet every 24 hours.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-border)]">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-[var(--color-accent)] w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Bank-Grade Security</h3>
              <p className="text-[var(--color-text-secondary)]">Your funds and data are protected by industry-leading encryption and robust security protocols.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-border)]">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="text-[var(--color-success)] w-7 h-7" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Global Accessibility</h3>
              <p className="text-[var(--color-text-secondary)]">Invest from anywhere in the world. Support for multiple payment methods including Crypto and UPI.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
