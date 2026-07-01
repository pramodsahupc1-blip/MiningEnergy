import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button } from '../../components/UI';
import { Check, X } from 'lucide-react';

export default function AdminWithdrawals() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Withdrawals</h2>
          <p className="text-[var(--color-text-secondary)]">Manage and approve withdrawal requests.</p>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">User</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Method</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Jane Smith</td>
                    <td className="px-6 py-4 font-bold text-red-600">₹200.00</td>
                    <td className="px-6 py-4 text-gray-500">Bank Transfer</td>
                    <td className="px-6 py-4 text-gray-500">2026-07-01</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700"><Check className="w-4 h-4 mr-1" /> Approve</Button>
                      <Button size="sm" variant="danger"><X className="w-4 h-4 mr-1" /> Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
