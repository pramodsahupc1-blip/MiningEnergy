import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/UI';
import { useStore } from '../store/useStore';
import { ArrowDownRight, ArrowUpRight, Filter, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { UPIReceipt } from '../components/UPIReceipt';
import { Transaction } from '../types';

export default function Transactions() {
  const { transactions } = useStore();
  const [filter, setFilter] = useState<string>('All');
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  const filters = ['All', 'Deposit', 'Withdrawal', 'Mining Income', 'Purchase'];

  const filteredTransactions = transactions
    .filter(tx => filter === 'All' || tx.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Transactions</h2>
            <p className="text-[var(--color-text-secondary)]">View your complete financial history.</p>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter className="w-4 h-4 text-[var(--color-text-secondary)] mr-1" />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                  filter === f 
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" 
                    : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-gray-50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-[var(--color-border)]">
            {filteredTransactions.length === 0 ? (
              <div className="p-12 text-center text-[var(--color-text-secondary)]">
                No transactions found for the selected filter.
              </div>
            ) : (
              filteredTransactions.map(tx => (
                <div key={tx.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      tx.type === 'Deposit' ? 'bg-green-100 text-green-600' :
                      tx.type === 'Withdrawal' ? 'bg-red-100 text-red-600' :
                      tx.type === 'Purchase' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    )}>
                      {tx.type === 'Deposit' || tx.type === 'Mining Income' ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{tx.description}</p>
                      <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">{format(new Date(tx.date), 'MMM dd, yyyy • HH:mm')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-bold md:text-lg",
                      (tx.type === 'Deposit' || tx.type === 'Mining Income' || tx.type === 'Referral Bonus') ? "text-[var(--color-success)]" : "text-[var(--color-text-primary)]"
                    )}>
                      {(tx.type === 'Deposit' || tx.type === 'Mining Income' || tx.type === 'Referral Bonus') ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </p>
                    <span className={cn(
                      "text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                      tx.status === 'Completed' ? "bg-green-100 text-green-700" :
                      tx.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {tx.status}
                    </span>
                    {tx.utr && (
                      <button
                        onClick={() => setSelectedReceiptTx(tx)}
                        className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-red-700 transition-colors font-semibold mt-2 ml-auto cursor-pointer"
                      >
                        <Receipt className="w-3.5 h-3.5" /> View Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      {selectedReceiptTx && (
        <UPIReceipt 
          transaction={selectedReceiptTx} 
          onClose={() => setSelectedReceiptTx(null)} 
        />
      )}
    </Layout>
  );
}
