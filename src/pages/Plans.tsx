import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { CheckCircle2, AlertCircle } from 'lucide-react';
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
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl space-y-6">
        
        {/* Custom Tabs to match image */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-900/10 p-1.5 rounded-full inline-flex w-full sm:w-auto shadow-inner border border-red-900/5">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                "flex-1 sm:px-12 py-3 rounded-full font-bold text-sm transition-all duration-300",
                activeTab === 'daily'
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                  : "text-red-800 hover:bg-red-900/5"
              )}
            >
              Daily Plan
            </button>
            <button
              onClick={() => setActiveTab('welfare')}
              className={cn(
                "flex-1 sm:px-12 py-3 rounded-full font-bold text-sm transition-all duration-300",
                activeTab === 'welfare'
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                  : "text-red-800 hover:bg-red-900/5"
              )}
            >
              Welfare Plan
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {miningPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-red-100 relative pb-6 pt-12 px-4 sm:px-6">
              
              {/* Top Red Headers */}
              <div className="absolute top-0 left-0 bg-red-600 text-white px-5 py-2 rounded-br-2xl font-bold text-sm sm:text-base">
                {plan.title}
              </div>
              <div className="absolute top-0 right-0 bg-red-600 text-white px-5 py-2 rounded-bl-2xl font-bold text-sm sm:text-base">
                Days: {plan.durationDays}
              </div>

              {/* Product Info */}
              <div className="flex items-center mb-6">
                <div className="w-1/3">
                  {plan.image ? (
                    <img src={plan.image} alt={plan.title} className="w-full h-auto object-cover rounded-xl shadow-sm" />
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="w-2/3 pl-4 sm:pl-6 flex justify-between items-center text-center">
                  <div className="flex-1">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600 tracking-tight">₹{plan.dailyIncome}</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">Daily Income</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-600 tracking-tight">₹{plan.totalReturn}</div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">Total Income</div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center my-6">
                <div className="text-2xl sm:text-3xl font-bold text-gray-800">Price: ₹{plan.price}</div>
              </div>

              {/* Buy Button */}
              <div className="px-2">
                {purchaseStatus?.id === plan.id ? (
                  <div className={cn(
                    "w-full py-4 rounded-full flex items-center justify-center space-x-2 font-bold",
                    purchaseStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}>
                    {purchaseStatus.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span>{purchaseStatus.message}</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handlePurchase(plan.id, plan.title, plan.price)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-full font-bold text-lg shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
