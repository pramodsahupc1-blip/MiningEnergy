import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Input } from '../../components/UI';
import { useStore } from '../../store/useStore';
import { CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const { upiConfig, updateUpiConfig } = useStore();
  const [upiId, setUpiId] = useState(upiConfig?.upiId || '');
  const [payeeName, setPayeeName] = useState(upiConfig?.payeeName || '');
  const [status, setStatus] = useState<{success: boolean, message: string} | null>(null);

  const handleSave = () => {
    if (!upiId.trim() || !payeeName.trim()) {
      setStatus({ success: false, message: 'Please fill out all fields.' });
      return;
    }
    
    updateUpiConfig(upiId, payeeName);
    setStatus({ success: true, message: 'UPI settings saved successfully!' });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Settings</h2>
          <p className="text-[var(--color-text-secondary)]">Manage platform configurations.</p>
        </div>

        <Card>
          <h3 className="text-xl font-heading font-bold mb-4">Payment Configuration</h3>
          
          <div className="space-y-4">
            <Input 
              label="UPI ID" 
              placeholder="e.g. yourname@upi" 
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            
            <Input 
              label="Payee Name" 
              placeholder="e.g. John Doe" 
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
            />

            {status && (
              <div className={`p-3 rounded-xl flex items-center space-x-2 ${status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.success && <CheckCircle2 className="w-5 h-5" />}
                <span className="text-sm font-medium">{status.message}</span>
              </div>
            )}
            
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
