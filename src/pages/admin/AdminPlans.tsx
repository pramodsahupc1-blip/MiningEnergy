import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Input } from '../../components/UI';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MiningPlan } from '../../types';

export default function AdminPlans() {
  const { miningPlans, addPlan, updatePlan, deletePlan } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<MiningPlan>>({
    title: '',
    price: 0,
    dailyIncome: 0,
    durationDays: 0,
    image: ''
  });

  const handleOpenForm = (plan?: MiningPlan) => {
    if (plan) {
      setEditingId(plan.id);
      setFormData(plan);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        price: 0,
        dailyIncome: 0,
        durationDays: 0,
        image: ''
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    const totalReturn = (formData.dailyIncome || 0) * (formData.durationDays || 0);
    const roiPercentage = formData.price ? Math.round((totalReturn / formData.price) * 100) : 0;
    
    const newPlanData = {
      title: formData.title || '',
      price: Number(formData.price) || 0,
      dailyIncome: Number(formData.dailyIncome) || 0,
      durationDays: Number(formData.durationDays) || 0,
      image: formData.image || '',
      totalReturn,
      roiPercentage
    };

    if (editingId) {
      updatePlan(editingId, newPlanData);
    } else {
      addPlan(newPlanData);
    }
    handleCloseForm();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-primary)]">Mining Plans</h2>
            <p className="text-[var(--color-text-secondary)]">Manage investment plans.</p>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="w-4 h-4 mr-2" /> Add Plan
          </Button>
        </div>

        {isFormOpen && (
          <Card>
            <h3 className="text-lg font-heading font-bold mb-4">{editingId ? 'Edit Plan' : 'Add New Plan'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Plan Title" 
                placeholder="e.g. VIP Series-D" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
              <Input 
                label="Price (₹)" 
                type="number" 
                placeholder="500" 
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
              />
              <Input 
                label="Daily Income (₹)" 
                type="number" 
                placeholder="10000" 
                value={formData.dailyIncome} 
                onChange={(e) => setFormData({...formData, dailyIncome: Number(e.target.value)})} 
              />
              <Input 
                label="Duration (Days)" 
                type="number" 
                placeholder="3" 
                value={formData.durationDays} 
                onChange={(e) => setFormData({...formData, durationDays: Number(e.target.value)})} 
              />
              <Input 
                label="Image URL" 
                placeholder="https://..." 
                className="md:col-span-2" 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <Button onClick={handleSubmit}>Save Plan</Button>
              <Button variant="outline" onClick={handleCloseForm}>Cancel</Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miningPlans.map((plan) => (
            <Card key={plan.id} className="relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={() => handleOpenForm(plan)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this plan?')) {
                      deletePlan(plan.id);
                    }
                  }}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
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
