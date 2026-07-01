import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, MiningPlan, Transaction, ActiveContract } from '../types';

const defaultPlans: MiningPlan[] = [
  {
    id: 'p1',
    title: 'VIP Series-A',
    price: 45,
    dailyIncome: 936,
    durationDays: 7,
    totalReturn: 6552,
    roiPercentage: 14560,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=300&auto=format&fit=crop' // Placeholder for biscuit
  },
  {
    id: 'p2',
    title: 'VIP Series-B',
    price: 150,
    dailyIncome: 3000,
    durationDays: 2,
    totalReturn: 6000,
    roiPercentage: 4000,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=300&auto=format&fit=crop' // Placeholder for biscuit
  },
  {
    id: 'p3',
    title: 'VIP Series-C',
    price: 350,
    dailyIncome: 7500,
    durationDays: 5,
    totalReturn: 37500,
    roiPercentage: 10714,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=300&auto=format&fit=crop'
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      activeContracts: [],
      transactions: [],
      miningPlans: defaultPlans,
      upiConfig: {
        upiId: 'jinwoosung.jg@oksbi',
        payeeName: 'JINWOO SUNG'
      },

      login: (userData) => {
        set({
          user: {
            id: 'u' + Math.random().toString(36).substr(2, 9),
            name: userData.name || 'John Doe',
            email: userData.email || 'john@example.com',
            phone: userData.phone || '+1234567890',
            walletBalance: 100, // starting bonus
            referralCode: 'MINE' + Math.floor(Math.random() * 10000),
            role: userData.email === 'admin@admin.com' ? 'Admin' : 'User',
          },
          isAuthenticated: true,
          transactions: [
            {
              id: 't' + Date.now(),
              type: 'Deposit',
              amount: 100,
              status: 'Completed',
              date: new Date().toISOString(),
              description: 'Welcome Bonus',
            }
          ]
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, activeContracts: [], transactions: [] });
      },

      rechargeWallet: (amount, method, utr, payeeName, upiId) => {
        set((state) => {
          if (!state.user) return state;
          
          const newTx: Transaction = {
            id: 't' + Date.now(),
            type: 'Deposit',
            amount,
            status: 'Completed', // Auto complete for demo
            date: new Date().toISOString(),
            description: method === 'UPI' && utr ? `Recharge via UPI (UTR: ${utr})` : `Recharge via ${method}`,
            utr,
            payeeName,
            upiId,
          };

          return {
            user: { ...state.user, walletBalance: state.user.walletBalance + amount },
            transactions: [newTx, ...state.transactions],
          };
        });
      },

      withdrawFunds: (amount, method) => {
        set((state) => {
          if (!state.user || state.user.walletBalance < amount) return state;
          
          const newTx: Transaction = {
            id: 't' + Date.now(),
            type: 'Withdrawal',
            amount,
            status: 'Pending',
            date: new Date().toISOString(),
            description: `Withdraw to ${method}`,
          };

          return {
            user: { ...state.user, walletBalance: state.user.walletBalance - amount },
            transactions: [newTx, ...state.transactions],
          };
        });
      },

      purchasePlan: (planId) => {
        const state = get();
        if (!state.user) return false;

        const plan = state.miningPlans.find(p => p.id === planId);
        if (!plan) return false;

        if (state.user.walletBalance < plan.price) return false;

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.durationDays);

        const newContract: ActiveContract = {
          id: 'c' + Date.now(),
          planId: plan.id,
          planTitle: plan.title,
          investment: plan.price,
          dailyReward: plan.dailyIncome,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalEarned: 0,
          status: 'Active',
        };

        const newTx: Transaction = {
          id: 't' + Date.now(),
          type: 'Purchase',
          amount: plan.price,
          status: 'Completed',
          date: new Date().toISOString(),
          description: `Purchased ${plan.title}`,
        };

        set({
          user: { ...state.user, walletBalance: state.user.walletBalance - plan.price },
          activeContracts: [...state.activeContracts, newContract],
          transactions: [newTx, ...state.transactions],
        });

        return true;
      },

      simulateDailyIncome: () => {
        set((state) => {
          if (!state.user || state.activeContracts.length === 0) return state;

          let totalReward = 0;
          const updatedContracts = state.activeContracts.map(contract => {
            if (contract.status === 'Active') {
              totalReward += contract.dailyReward;
              return { ...contract, totalEarned: contract.totalEarned + contract.dailyReward };
            }
            return contract;
          });

          if (totalReward === 0) return state;

          const newTx: Transaction = {
            id: 't' + Date.now(),
            type: 'Mining Income',
            amount: totalReward,
            status: 'Completed',
            date: new Date().toISOString(),
            description: 'Daily Mining Reward',
          };

          return {
            user: { ...state.user, walletBalance: state.user.walletBalance + totalReward },
            activeContracts: updatedContracts,
            transactions: [newTx, ...state.transactions],
          };
        });
      },
      
      updateUpiConfig: (upiId: string, payeeName: string) => {
        set({ upiConfig: { upiId, payeeName } });
      }
    }),
    {
      name: 'mining-energy-storage',
    }
  )
);
