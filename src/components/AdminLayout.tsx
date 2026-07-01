import React from 'react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, ArrowRightLeft, Settings, LogOut, Package } from 'lucide-react';
import { useStore } from '../store/useStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: ArrowRightLeft, label: 'Deposits', href: '/admin/deposits' },
  { icon: CreditCard, label: 'Withdrawals', href: '/admin/withdrawals' },
  { icon: Package, label: 'Mining Plans', href: '/admin/plans' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const location = useLocation();
  const logout = useStore(state => state.logout);

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white border-r border-gray-800 fixed top-0 left-0">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
          <Settings className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-heading font-bold">Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors",
                isActive 
                  ? "bg-red-600 text-white font-medium" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const location = useLocation();
  const mobileItems = [
    { icon: LayoutDashboard, label: 'Home', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Package, label: 'Plans', href: '/admin/plans' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {mobileItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center space-y-1 transition-colors",
              isActive ? "text-red-500" : "text-gray-400"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminTopbar() {
  const user = useStore(state => state.user);

  return (
    <header className="h-16 md:h-20 bg-white border-b border-[var(--color-border)] sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
      <div className="md:hidden flex items-center space-x-2">
        <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
          <Settings className="text-white w-4 h-4" />
        </div>
        <span className="font-heading font-bold text-lg">Admin</span>
      </div>

      <div className="hidden md:block">
        <h2 className="text-xl font-heading font-semibold">Admin Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 font-bold">
          A
        </div>
      </div>
    </header>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <AdminSidebar />
      <div className="md:pl-64 pb-20 md:pb-0">
        <AdminTopbar />
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
