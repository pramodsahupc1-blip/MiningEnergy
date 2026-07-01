import React from 'react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Wallet, Users, User, Menu, Bell, LogOut, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Zap, label: 'Mining Plans', href: '/plans' },
  { icon: Wallet, label: 'Wallet', href: '/wallet' },
  { icon: ArrowRightLeft, label: 'Transactions', href: '/transactions' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Sidebar() {
  const location = useLocation();
  const logout = useStore(state => state.logout);

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] fixed top-0 left-0">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-heading font-bold text-[var(--color-text-primary)]">MiningEnergy</span>
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
                  ? "bg-red-50 text-[var(--color-primary)] font-medium" 
                  : "text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-text-primary)]"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--color-primary)]" : "")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-border)]">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const location = useLocation();
  const mobileItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Zap, label: 'Plans', href: '/plans' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {mobileItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center space-y-1 transition-colors",
              isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
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

export function Topbar() {
  const user = useStore(state => state.user);

  return (
    <header className="h-16 md:h-20 bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
      <div className="md:hidden flex items-center space-x-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
          <Zap className="text-white w-4 h-4" />
        </div>
        <span className="font-heading font-bold text-lg">MiningEnergy</span>
      </div>

      <div className="hidden md:block">
        <h2 className="text-xl font-heading font-semibold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-[var(--color-primary)] font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="md:pl-64 pb-20 md:pb-0">
        <Topbar />
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
