import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, Button, Input } from '../components/UI';
import { useStore } from '../store/useStore';
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, CheckCircle2, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { UPIReceipt } from '../components/UPIReceipt';
import { Transaction } from '../types';

export default function Wallet() {
  const { user, rechargeWallet, withdrawFunds, upiConfig } = useStore();
  const [activeTab, setActiveTab] = useState<'recharge' | 'withdraw'>('recharge');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [status, setStatus] = useState<{success: boolean, message: string} | null>(null);
  
  // UPI Flow state
  const [showUpiQR, setShowUpiQR] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [showReceiptTx, setShowReceiptTx] = useState<Transaction | null>(null);

  const quickAmounts = [50, 100, 500, 1000];

  const handleAction = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setStatus({ success: false, message: 'Please enter a valid amount.' });
      return;
    }

    if (activeTab === 'recharge') {
      if (method === 'UPI' && !showUpiQR) {
        // Step 1 for UPI: Show QR
        setShowUpiQR(true);
        return;
      }
      
      // Step 2 for UPI or Step 1 for others
      if (method === 'UPI' && !utrNumber.trim()) {
        setStatus({ success: false, message: 'Please enter the UTR / Transaction ID.' });
        return;
      }

      if (method === 'UPI') {
        rechargeWallet(numAmount, method, utrNumber, upiConfig.payeeName, upiConfig.upiId);
        
        // Construct the transaction receipt object to display
        const newTx: Transaction = {
          id: 'TXN' + Date.now(),
          type: 'Deposit',
          amount: numAmount,
          status: 'Completed',
          date: new Date().toISOString(),
          description: `Recharge via UPI (UTR: ${utrNumber})`,
          utr: utrNumber,
          payeeName: upiConfig.payeeName,
          upiId: upiConfig.upiId,
        };
        setShowReceiptTx(newTx);
      } else {
        rechargeWallet(numAmount, method);
      }
      
      setStatus({ success: true, message: 'Recharge successful! Wallet updated.' });
      setShowUpiQR(false);
      setUtrNumber('');
    } else {
      if (user && numAmount > user.walletBalance) {
        setStatus({ success: false, message: 'Insufficient balance for withdrawal.' });
        return;
      }
      withdrawFunds(numAmount, method);
      setStatus({ success: true, message: 'Withdrawal request submitted successfully.' });
    }

    setAmount('');
    setTimeout(() => setStatus(null), 4000);
  };

  const handleTabChange = (tab: 'recharge' | 'withdraw') => {
    setActiveTab(tab);
    setStatus(null);
    setAmount('');
    setShowUpiQR(false);
    setUtrNumber('');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">My Wallet</h2>
          <p className="text-[var(--color-text-secondary)]">Manage your funds, recharge, or request withdrawals.</p>
        </div>

        <Card className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white border-none shadow-lg py-8">
          <div className="text-center">
            <p className="text-white/80 font-medium mb-2">Available Balance</p>
            <h1 className="text-5xl font-heading font-bold">₹{user?.walletBalance.toFixed(2)}</h1>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="flex border-b border-[var(--color-border)]">
            <button
              onClick={() => handleTabChange('recharge')}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 font-medium transition-colors ${
                activeTab === 'recharge' 
                  ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-red-50/50' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-50'
              }`}
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span>Recharge</span>
            </button>
            <button
              onClick={() => handleTabChange('withdraw')}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 font-medium transition-colors ${
                activeTab === 'withdraw' 
                  ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-red-50/50' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-50'
              }`}
            >
              <ArrowUpFromLine className="w-5 h-5" />
              <span>Withdraw</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {status && (
              <div className={`p-4 rounded-xl flex items-center space-x-3 ${status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">{status.message}</span>
              </div>
            )}

            {!showUpiQR ? (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--color-text-primary)]">Amount (INR)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg font-medium"
                  />
                  
                  {activeTab === 'recharge' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {quickAmounts.map(amt => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt.toString())}
                          className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-[var(--color-primary)] hover:border-red-200 transition-colors"
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-[var(--color-text-primary)]">Payment Method</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['UPI'].map(m => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`py-3 px-2 text-center rounded-xl border font-medium text-sm transition-colors ${
                          method === m 
                            ? 'border-[var(--color-primary)] bg-red-50 text-[var(--color-primary)]' 
                            : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-gray-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#E91E63] text-white flex items-center justify-center font-bold text-lg">
                    {upiConfig.payeeName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-2xl font-bold text-gray-800 tracking-tight">{upiConfig.payeeName}</span>
                </div>
                
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <QRCodeCanvas 
                    value={`upi://pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.payeeName)}&am=${amount}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                  <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm font-medium">UPI ID: {upiConfig.upiId}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 font-medium">Scan to pay with any UPI app</p>
                <div className="w-full mt-4 space-y-3">
                  <label className="text-sm font-medium text-gray-700">Enter UTR / Transaction ID (12 Digits)</label>
                  <Input 
                    placeholder="e.g. 312345678901" 
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                  />
                </div>
                
                <button 
                  onClick={() => setShowUpiQR(false)} 
                  className="text-sm text-gray-500 hover:text-gray-800 underline mt-2"
                >
                  Go Back
                </button>
              </div>
            )}

            <div className="pt-4">
              <Button fullWidth size="lg" onClick={handleAction}>
                {activeTab === 'recharge' 
                  ? (method === 'UPI' && showUpiQR ? 'Submit Transaction' : 'Proceed to Pay') 
                  : 'Submit Withdrawal'}
              </Button>
            </div>
            
            {activeTab === 'withdraw' && (
              <p className="text-xs text-center text-[var(--color-text-secondary)]">
                Withdrawals are processed within 24 hours. A 2% standard processing fee applies.
              </p>
            )}
          </div>
        </Card>
      </div>
      {showReceiptTx && (
        <UPIReceipt 
          transaction={showReceiptTx} 
          onClose={() => setShowReceiptTx(null)} 
        />
      )}
    </Layout>
  );
}
