import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card } from '../../components/UI';
import { Users, CreditCard, ArrowRightLeft, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Overview</h2>
          <p className="text-[var(--color-text-secondary)]">Welcome to the admin dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Total Users</p>
                <h3 className="text-2xl font-heading font-bold mt-1">1,245</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600 w-5 h-5" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Total Deposits</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-green-600">₹45,230</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ArrowRightLeft className="text-green-600 w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Pending Withdrawals</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-red-600">₹12,400</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <CreditCard className="text-red-600 w-5 h-5" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Total Revenue</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-orange-600">₹89,500</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="text-orange-600 w-5 h-5" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4">Recent Activity</h3>
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-[var(--color-border)]">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="text-gray-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">New user registered</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">2 minutes ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
