import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Input } from '../../components/UI';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function AdminPlans() {
  const { miningPlans } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Mining Plans</h2>
            <p className="text-[var(--color-text-secondary)]">Manage investment plans.</p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="w-4 h-4 mr-2" /> Add Plan
          </Button>
        </div>

        {isAdding && (
          <Card>
            <h3 className="text-lg font-heading font-bold mb-4">Add New Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Plan Title" placeholder="e.g. VIP Series-D" />
              <Input label="Price (₹)" type="number" placeholder="500" />
              <Input label="Daily Income (₹)" type="number" placeholder="10000" />
              <Input label="Duration (Days)" type="number" placeholder="3" />
              <Input label="Image URL" placeholder="https://..." className="md:col-span-2" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Button>Save Plan</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miningPlans.map((plan) => (
            <Card key={plan.id} className="relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-lg">{plan.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Price:</span> <span className="font-bold text-gray-900">₹{plan.price}</span></div>
                <div className="flex justify-between"><span>Daily Income:</span> <span className="font-bold text-green-600">₹{plan.dailyIncome}</span></div>
                <div className="flex justify-between"><span>Duration:</span> <span className="font-bold text-gray-900">{plan.durationDays} Days</span></div>
                <div className="flex justify-between"><span>Total Return:</span> <span className="font-bold text-gray-900">₹{plan.totalReturn}</span></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
