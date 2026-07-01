export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  walletBalance: number;
  referralCode: string;
  role?: 'User' | 'Admin';
};

export type MiningPlan = {
  id: string;
  title: string;
  price: number;
  dailyIncome: number;
  durationDays: number;
  totalReturn: number;
  roiPercentage: number;
  image?: string;
};

export type ActiveContract = {
  id: string;
  planId: string;
  planTitle: string;
  investment: number;
  dailyReward: number;
  startDate: string;
  endDate: string;
  totalEarned: number;
  status: 'Active' | 'Completed';
};

export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Mining Income' | 'Referral Bonus' | 'Purchase';
  amount: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  date: string;
  description: string;
  utr?: string;
  payeeName?: string;
  upiId?: string;
};

export type AppState = {
  user: User | null;
  isAuthenticated: boolean;
  activeContracts: ActiveContract[];
  transactions: Transaction[];
  miningPlans: MiningPlan[];
  upiConfig: {
    upiId: string;
    payeeName: string;
  };
  
  // Actions
  login: (userData: Partial<User>) => void;
  logout: () => void;
  rechargeWallet: (amount: number, method: string, utr?: string, payeeName?: string, upiId?: string) => void;
  withdrawFunds: (amount: number, method: string) => void;
  purchasePlan: (planId: string) => boolean;
  simulateDailyIncome: () => void;
  updateUpiConfig: (upiId: string, payeeName: string) => void;
};
