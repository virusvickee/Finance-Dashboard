import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setActiveView, setRole } from '../../store/slices/uiSlice';
import type { ActiveView } from '../../types';
import { LayoutDashboard, ReceiptText, LineChart, Shield, User } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeView, role } = useAppSelector((state) => state.ui);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const handleRoleToggleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsRoleMenuOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsRoleMenuOpen(false);
    }
  };

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'transactions', label: 'Transactions', icon: <ReceiptText className="w-5 h-5" /> },
    { id: 'insights', label: 'Insights', icon: <LineChart className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed bottom-0 left-0 w-full md:w-64 md:top-0 md:h-screen bg-card border-t md:border-t-0 md:border-r border-border flex flex-col z-50">
      <div className="hidden md:flex h-16 items-center px-6 border-b border-border">
        <div className="w-8 h-8 rounded bg-accent flex items-center justify-center mr-3">
          <span className="font-display font-bold text-white leading-none">F</span>
        </div>
        <span className="font-display font-bold text-xl tracking-wide">FinPulse</span>
      </div>

      <nav className="flex-1 flex md:flex-col p-2 md:p-4 gap-1 md:gap-2 justify-between md:justify-start overflow-x-auto md:overflow-visible">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => dispatch(setActiveView(item.id))}
            className={`flex-1 md:flex-none flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 px-2 md:px-4 py-3 rounded-lg md:rounded-xl transition-all ${
              activeView === item.id
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-muted hover:bg-surface hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-xs md:text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="hidden md:flex p-4 border-t border-border">
        <div className="w-full relative">
          <button 
            className="w-full flex items-center justify-between px-4 py-3 bg-surface rounded-xl border border-border hover:border-accent/50 transition-colors"
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            onKeyDown={handleRoleToggleKey}
            aria-expanded={isRoleMenuOpen}
            aria-controls="role-menu"
          >
            <div className="flex items-center gap-3">
              {role === 'admin' ? (
                <Shield className="w-5 h-5 text-emerald" />
              ) : (
                <User className="w-5 h-5 text-amber" />
              )}
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted leading-none mb-1">Role</span>
                <span className="text-sm font-medium capitalize leading-none">{role}</span>
              </div>
            </div>
          </button>
          
          {isRoleMenuOpen && (
            <div id="role-menu" className="absolute bottom-full left-0 w-full mb-2 bg-card border border-border rounded-xl shadow-xl transition-all flex flex-col overflow-hidden z-50">
              <button 
                onClick={() => { dispatch(setRole('admin')); setIsRoleMenuOpen(false); }}
                className="px-4 py-3 text-sm text-left hover:bg-surface flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-emerald" /> Admin Access
              </button>
              <button 
                onClick={() => { dispatch(setRole('viewer')); setIsRoleMenuOpen(false); }}
                className="px-4 py-3 text-sm text-left hover:bg-surface border-t border-border flex items-center gap-2"
              >
                <User className="w-4 h-4 text-amber" /> Viewer Access
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
