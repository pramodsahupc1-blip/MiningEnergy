import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = useStore(state => state.login);
  const appName = useStore(state => state.appName);
  const appLogo = useStore(state => state.appLogo);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: name || 'Demo User', email });
    if (email === 'admin@admin.com') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          {appLogo ? (
            <img src={appLogo} alt="Logo" className="w-16 h-16 rounded-2xl object-cover mb-4 shadow-lg shadow-black/10" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
              <Zap className="text-white w-8 h-8" />
            </div>
          )}
          <h1 className="text-3xl font-heading font-bold text-[var(--color-text-primary)]">{appName}</h1>
          <p className="text-[var(--color-text-secondary)] mt-2 text-center">Secure Cloud Mining Platform</p>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                value={name}
                onChange={e => setName(e.target.value)}
                required 
              />
            )}
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
            
            <div className="pt-2">
              <Button fullWidth size="lg" type="submit">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--color-text-secondary)]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-[var(--color-primary)] hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
