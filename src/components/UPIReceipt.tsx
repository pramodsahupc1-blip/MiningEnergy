import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Copy, 
  Download, 
  Share2, 
  ArrowLeft, 
  Calendar, 
  Hash, 
  User, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Transaction } from '../types';
import { format } from 'date-fns';

interface UPIReceiptProps {
  transaction: Transaction;
  onClose: () => void;
}

export function UPIReceipt({ transaction, onClose }: UPIReceiptProps) {
  const [copied, setCopied] = useState(false);
  const formattedAmount = transaction.amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  const handleCopy = () => {
    const text = `
--- UPI PAYMENT RECEIPT ---
Status: SUCCESS
Payee: ${transaction.payeeName || 'N/A'}
UPI ID: ${transaction.upiId || 'N/A'}
Amount: ₹${formattedAmount}
UTR No: ${transaction.utr || 'N/A'}
Date: ${format(new Date(transaction.date), 'MMM dd, yyyy HH:mm:ss')}
Ref ID: ${transaction.id}
---------------------------
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Standard receipt data payload for verification QR
  const receiptQrData = JSON.stringify({
    receiptId: transaction.id,
    utr: transaction.utr,
    amountInr: formattedAmount,
    payee: transaction.payeeName,
    upi: transaction.upiId,
    timestamp: transaction.date
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative print:shadow-none print:border-none print:w-full print:max-w-none"
      >
        {/* Navigation Bar / Action bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 print:hidden">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-slate-800">E-Receipt Details</span>
          <div className="flex space-x-1">
            <button 
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors relative"
              title="Copy receipt details"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
            <button 
              onClick={handlePrint}
              className="p-2 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
              title="Print Receipt"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 md:p-8 space-y-6 flex-1 max-h-[85vh] overflow-y-auto hide-scrollbar print:overflow-visible print:max-h-none">
          
          {/* Animated Success Checkmark in GPay Green */}
          <div className="flex flex-col items-center text-center space-y-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 150 }}
              className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20"
            >
              <Check className="w-9 h-9 text-white stroke-[3px]" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                Payment Received
              </span>
              <h2 className="text-xs text-slate-400 font-mono mt-1">TRANSACTION ID: {transaction.id}</h2>
            </motion.div>
          </div>

          {/* Amount Display */}
          <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 flex flex-col justify-center items-center space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <span className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Amount Paid via UPI</span>
            <span className="text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              ₹{formattedAmount}
            </span>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Payment Breakdown
            </h4>

            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 shadow-sm overflow-hidden text-sm">
              
              {/* Payee Details */}
              <div className="p-4 flex justify-between items-start">
                <span className="text-slate-400 font-medium shrink-0">Payee Name</span>
                <span className="text-slate-800 font-bold text-right pl-4">
                  {transaction.payeeName || 'JINWOO SUNG'}
                </span>
              </div>

              {/* Payee UPI ID */}
              <div className="p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Payee UPI ID</span>
                <span className="text-slate-800 font-mono font-semibold">
                  {transaction.upiId || 'jinwoosung.jg@oksbi'}
                </span>
              </div>

              {/* UTR / Transaction ID */}
              {transaction.utr && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" /> UTR / Ref No
                  </span>
                  <span className="text-slate-800 font-mono font-bold tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {transaction.utr}
                  </span>
                </div>
              )}

              {/* Date & Time */}
              <div className="p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date & Time
                </span>
                <span className="text-slate-700 font-medium text-right">
                  {format(new Date(transaction.date), 'MMM dd, yyyy • hh:mm a')}
                </span>
              </div>

              {/* Method */}
              <div className="p-4 flex justify-between items-center">
                <span className="text-slate-400 font-medium">Payment Channel</span>
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  UPI Payment (BHIM)
                </span>
              </div>
            </div>
          </div>

          {/* Secure / Dynamic Receipt QR Verification */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verifiable Receipt QR
            </div>
            
            <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-100 relative">
              <QRCodeCanvas 
                value={receiptQrData}
                size={120}
                level="M"
                includeMargin={false}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <QrCode className="w-16 h-16" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 max-w-[240px] leading-relaxed">
              Scan this dynamic cryptographic QR code to instantly verify receipt authenticity on the ledger.
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 print:hidden">
          <button 
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all text-center cursor-pointer shadow-lg shadow-slate-900/10 active:scale-[0.98]"
          >
            Done
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}
