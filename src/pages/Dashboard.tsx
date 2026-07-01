import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card, Button } from '../components/UI';
import { useStore } from '../store/useStore';
import { Wallet, TrendingUp, Zap, ArrowRight, ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { user, activeContracts, transactions, simulateDailyIncome } = useStore();

  // Simulate daily income tick every 10 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      simulateDailyIncome();
    }, 10000);
    return () => clearInterval(interval);
  }, [simulateDailyIncome]);

  const totalEarnings = activeContracts.reduce((sum, c) => sum + c.totalEarned, 0);
  const todaysIncome = activeContracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.dailyReward, 0);
  const activePlansCount = activeContracts.filter(c => c.status === 'Active').length;
  
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white border-none shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium">Wallet Balance</p>
                <h3 className="text-3xl font-heading font-bold mt-1">₹{user?.walletBalance.toFixed(2)}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Wallet className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex space-x-3">
              <Link to="/wallet" className="flex-1 bg-white text-[var(--color-primary)] text-center py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
                Recharge
              </Link>
              <Link to="/wallet" className="flex-1 bg-white/20 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                Withdraw
              </Link>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Total Earnings</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-[var(--color-text-primary)]">₹{totalEarnings.toFixed(2)}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="text-[var(--color-success)] w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-[var(--color-success)] mt-4 font-medium flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Profitable
            </p>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Today's Income</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-[var(--color-text-primary)]">+₹{todaysIncome.toFixed(2)}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="text-[var(--color-accent)] w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4">Will be credited at 00:00 UTC</p>
          </Card>

          <Card>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">Active Plans</p>
                <h3 className="text-2xl font-heading font-bold mt-1 text-[var(--color-text-primary)]">{activePlansCount}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Zap className="text-[var(--color-primary)] w-5 h-5" />
              </div>
            </div>
            <Link to="/plans" className="text-sm text-[var(--color-primary)] mt-4 font-medium flex items-center hover:underline">
              Buy more plans <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>
        </div>

        {/* Active Mining Progress */}
        {activeContracts.length > 0 && (
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Active Mining Contracts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeContracts.filter(c => c.status === 'Active').map(contract => {
                const totalDays = Math.round((new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) / (1000 * 3600 * 24));
                const daysPassed = Math.round((new Date().getTime() - new Date(contract.startDate).getTime()) / (1000 * 3600 * 24));
                const progress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

                return (
                  <Card key={contract.id} className="relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                          <Zap className="text-[var(--color-primary)] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--color-text-primary)]">{contract.planTitle}</h4>
                          <p className="text-xs text-[var(--color-text-secondary)]">Invested: ₹{contract.investment}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[var(--color-success)]">+₹{contract.dailyReward}/day</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Earned: ₹{contract.totalEarned.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                      <span>{daysPassed} days</span>
                      <span>{totalDays} days</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-heading font-semibold">Recent Transactions</h3>
            <Link to="/transactions" className="text-sm font-medium text-[var(--color-primary)] hover:underline">View All</Link>
          </div>
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-[var(--color-border)]">
              {recentTransactions.length === 0 ? (
                <div className="p-6 text-center text-[var(--color-text-secondary)]">No transactions yet.</div>
              ) : (
                recentTransactions.map(tx => (
                  <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        tx.type === 'Deposit' ? 'bg-green-100 text-green-600' :
                        tx.type === 'Withdrawal' ? 'bg-red-100 text-red-600' :
                        tx.type === 'Purchase' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      )}>
                        {tx.type === 'Deposit' || tx.type === 'Mining Income' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{tx.description}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{format(new Date(tx.date), 'MMM dd, yyyy HH:mm')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-semibold",
                        (tx.type === 'Deposit' || tx.type === 'Mining Income' || tx.type === 'Referral Bonus') ? "text-[var(--color-success)]" : "text-[var(--color-text-primary)]"
                      )}>
                        {(tx.type === 'Deposit' || tx.type === 'Mining Income' || tx.type === 'Referral Bonus') ? '+' : '-'}₹{tx.amount.toFixed(2)}
                      </p>
                      <span className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                        tx.status === 'Completed' ? "bg-green-100 text-green-700" :
                        tx.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
