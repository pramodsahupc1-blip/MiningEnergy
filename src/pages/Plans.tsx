import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { CheckCircle2, AlertCircle, ArrowRight, Wallet, TrendingUp, Calendar, ShieldCheck, HeadphonesIcon, Trophy, Shield, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Plans() {
  const { miningPlans, purchasePlan, user } = useStore();
  const [purchaseStatus, setPurchaseStatus] = useState<{id: string, success: boolean, message: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'daily' | 'welfare'>('daily');

  const handlePurchase = (planId: string, title: string, price: number) => {
    if (user && user.walletBalance < price) {
      setPurchaseStatus({ id: planId, success: false, message: 'Insufficient balance.' });
      setTimeout(() => setPurchaseStatus(null), 3000);
      return;
    }

    const success = purchasePlan(planId);
    if (success) {
      setPurchaseStatus({ id: planId, success: true, message: 'Success!' });
    } else {
      setPurchaseStatus({ id: planId, success: false, message: 'Failed.' });
    }
    setTimeout(() => setPurchaseStatus(null), 3000);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl space-y-6 pb-20">
        
        {/* Custom Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-900/5 p-1 rounded-full flex w-full max-w-sm border border-red-100">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                "flex-1 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300",
                activeTab === 'daily'
                  ? "bg-red-700 text-white shadow-md"
                  : "text-gray-800 hover:bg-red-900/5"
              )}
            >
              Daily Plan
            </button>
            <button
              onClick={() => setActiveTab('welfare')}
              className={cn(
                "flex-1 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300",
                activeTab === 'welfare'
                  ? "bg-red-700 text-white shadow-md"
                  : "text-gray-800 hover:bg-red-900/5"
              )}
            >
              Welfare Plan
            </button>
          </div>
        </div>

        {/* Top 10 Plan Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center space-x-4 z-10">
            <div className="bg-yellow-400 p-2 rounded-full shadow-inner flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-700" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-wider text-yellow-400 drop-shadow-md">
                <span className="text-white">TOP 10</span> PLAN
              </h2>
              <p className="text-xs sm:text-sm font-medium mt-1 text-red-100">
                High Income • Safe & Trusted • 24/7 Support
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center bg-red-700/50 p-3 rounded-xl border border-red-500 z-10">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 rounded-md p-1">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm">100% Secure</span>
            </div>
            <span className="text-[10px] text-red-200 mt-1">Safe & Trusted</span>
          </div>
        </div>

        <div className="space-y-6">
          {miningPlans.map((plan, index) => (
            <div key={plan.id} className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative pb-6">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-red-700 to-red-600 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold",
                    index === 0 ? "bg-yellow-400 text-yellow-900" :
                    index === 1 ? "bg-gray-300 text-gray-800" :
                    "bg-amber-600 text-white"
                  )}>
                    <Crown className="w-3.5 h-3.5" />
                    <span>TOP {index + 1}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-wide">{plan.title}</h3>
                </div>
                <div className="bg-red-800/40 border border-red-500/50 rounded-full px-3 py-1">
                  <span className="text-sm font-bold">₹{plan.price} Plan</span>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Image */}
                  <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-sm">
                    {plan.image ? (
                      <img src={plan.image} alt={plan.title} className="w-full h-[180px] sm:h-full object-cover" />
                    ) : (
                      <div className="w-full h-[180px] bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="w-full sm:w-1/2 flex space-x-3">
                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                        <Wallet className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₹{plan.dailyIncome}</div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">Daily Income</div>
                    </div>
                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₹{plan.totalReturn}</div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">Total Income</div>
                    </div>
                  </div>
                </div>

                {/* Features Row */}
                <div className="flex justify-between items-center px-2 py-4 border-t border-b border-gray-50 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500">Duration</span>
                      <span className="text-xs font-bold text-red-600">{plan.durationDays} Days</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500">Secure</span>
                      <span className="text-xs font-bold text-red-600">100% Safe</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex items-center space-x-2">
                    <HeadphonesIcon className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500">Support</span>
                      <span className="text-xs font-bold text-red-600">24/7</span>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <div>
                  {purchaseStatus?.id === plan.id ? (
                    <div className={cn(
                      "w-full py-4 rounded-full flex items-center justify-center space-x-2 font-bold",
                      purchaseStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    )}>
                      {purchaseStatus.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      <span>{purchaseStatus.message}</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handlePurchase(plan.id, plan.title, plan.price)}
                      className="w-full bg-gradient-to-b from-red-600 to-red-700 text-white py-3.5 px-4 rounded-full font-bold text-lg shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span className="flex-1 text-center pl-8">Buy Now</span>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5 text-red-600" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer features */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center mt-6 overflow-x-auto gap-4">
          <div className="flex items-center space-x-2 min-w-max">
            <ShieldCheck className="w-6 h-6 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">100% Secure</span>
              <span className="text-[10px] text-gray-500">Safe & Trusted</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 hidden sm:block"></div>
          <div className="flex items-center space-x-2 min-w-max">
            <TrendingUp className="w-6 h-6 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">Instant Payout</span>
              <span className="text-[10px] text-gray-500">Quick Withdrawals</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 hidden sm:block"></div>
          <div className="flex items-center space-x-2 min-w-max">
            <CheckCircle2 className="w-6 h-6 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">Best Returns</span>
              <span className="text-[10px] text-gray-500">High Daily Income</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100 hidden sm:block"></div>
          <div className="flex items-center space-x-2 min-w-max">
            <HeadphonesIcon className="w-6 h-6 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">24/7 Support</span>
              <span className="text-[10px] text-gray-500">Always Here</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

