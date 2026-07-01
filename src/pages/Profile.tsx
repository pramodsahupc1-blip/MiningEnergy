import React from 'react';
import { Layout } from '../components/Layout';
import { Card, Button, Input } from '../components/UI';
import { useStore } from '../store/useStore';
import { User, Shield, Bell, HelpCircle, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useStore();

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Profile Settings</h2>
          <p className="text-[var(--color-text-secondary)]">Manage your personal information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-white border-l-2 border-[var(--color-primary)] text-[var(--color-primary)] font-medium rounded-r-lg shadow-sm">
              <User className="w-5 h-5" />
              <span>Personal Info</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-[var(--color-text-secondary)] hover:bg-white hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
              <Shield className="w-5 h-5" />
              <span>Security & KYC</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-[var(--color-text-secondary)] hover:bg-white hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-[var(--color-text-secondary)] hover:bg-white hover:text-[var(--color-text-primary)] font-medium rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </button>
            
            <div className="pt-4 mt-4 border-t border-[var(--color-border)] space-y-2">
              {user?.role === 'Admin' && (
                <Link 
                  to="/admin"
                  className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <button 
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-[var(--color-error)] hover:bg-red-50 font-medium rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-[var(--color-primary)] font-bold text-2xl">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">{user?.name}</h3>
                  <p className="text-[var(--color-text-secondary)]">Member since {new Date().getFullYear()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Full Name" defaultValue={user?.name} readOnly />
                <Input label="Email Address" defaultValue={user?.email} readOnly />
                <Input label="Phone Number" defaultValue={user?.phone} readOnly />
                
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-medium text-sm mb-3">KYC Status</h4>
                  <div className="flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-3 rounded-lg border border-amber-200">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">Verification Pending. Please upload documents.</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">Complete KYC</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
