import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, Button } from '../components/UI';
import { useStore } from '../store/useStore';
import { Users, Copy, CheckCircle2, Share2, Award } from 'lucide-react';

export default function Team() {
  const { user } = useStore();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://miningenergy.app/register?ref=${user?.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Referral Program</h2>
          <p className="text-[var(--color-text-secondary)]">Invite friends and earn up to 10% commission on their mining returns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white border-none shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Award className="w-5 h-5 text-white/80" />
              <p className="text-white/80 font-medium">Total Earned</p>
            </div>
            <h3 className="text-3xl font-heading font-bold">₹0.00</h3>
          </Card>
          
          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <p className="text-[var(--color-text-secondary)] font-medium">Active Referrals</p>
            </div>
            <h3 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">0</h3>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <p className="text-[var(--color-text-secondary)] font-medium">Total Team Size</p>
            </div>
            <h3 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">0</h3>
          </Card>
        </div>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-xl font-heading font-bold">Your Referral Link</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">Share this link with your network to start building your team. Commissions are credited automatically.</p>
              
              <div className="flex bg-gray-50 border border-[var(--color-border)] rounded-xl p-2 items-center">
                <input 
                  type="text" 
                  readOnly 
                  value={referralLink} 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--color-text-secondary)] px-2 font-mono"
                />
                <Button variant="secondary" size="sm" onClick={handleCopy} className="ml-2">
                  {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <Button fullWidth className="mt-4 flex items-center justify-center">
                <Share2 className="w-4 h-4 mr-2" /> Share via Social Media
              </Button>
            </div>
            
            <div className="w-48 h-48 bg-white border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center shadow-sm">
              {/* Mock QR Code space */}
              <div className="w-32 h-32 border-4 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                <span className="text-xs">QR Code</span>
              </div>
              <p className="text-xs font-mono mt-2 text-[var(--color-text-primary)] font-bold">{user?.referralCode}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-bold mb-4">Commission Structure</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[var(--color-border)]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-[var(--color-primary)] flex items-center justify-center font-bold">1</div>
                <span className="font-medium">Level 1 (Direct)</span>
              </div>
              <span className="font-bold text-[var(--color-success)]">10%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[var(--color-border)]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">2</div>
                <span className="font-medium">Level 2</span>
              </div>
              <span className="font-bold text-[var(--color-success)]">5%</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">3</div>
                <span className="font-medium">Level 3</span>
              </div>
              <span className="font-bold text-[var(--color-success)]">2%</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
