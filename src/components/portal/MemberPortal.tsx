import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  LogOut,
  User,
  Building2,
  Compass,
  Car,
  Database,
  ArrowRight,
  Shield,
  Radio,
  Menu,
  X,
} from 'lucide-react';
import { DEMO_USERS, PortalUser, UserRole, simulatedSupabase } from '../../services/supabaseClient';
import { PortalLogin } from './PortalLogin';
import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { SecurityDashboard } from './SecurityDashboard';
import { FamilyOfficeDashboard } from './FamilyOfficeDashboard';

export const MemberPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('tglc_sb_auth_session');
      return stored ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [currentUser, setCurrentUser] = useState<PortalUser>(() => simulatedSupabase.auth.getUser());
  const [mobileRoleMenuOpen, setMobileRoleMenuOpen] = useState(false);

  const [activeBroadcast, setActiveBroadcast] = useState(() => simulatedSupabase.broadcast.getActive());

  useEffect(() => {
    const handleStoreChange = () => {
      const u = simulatedSupabase.auth.getUser();
      setCurrentUser(u);
      setActiveBroadcast(simulatedSupabase.broadcast.getActive());
    };
    window.addEventListener('tglc_store_change', handleStoreChange);
    return () => window.removeEventListener('tglc_store_change', handleStoreChange);
  }, []);

  const handleLoginSuccess = (user: PortalUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('tglc_sb_auth_session', JSON.stringify(true));
    } catch {
      // ignore storage restrictions
    }
  };

  const handleSignOut = async () => {
    await simulatedSupabase.auth.signOut();
    setIsAuthenticated(false);
    try {
      localStorage.setItem('tglc_sb_auth_session', JSON.stringify(false));
    } catch {
      // ignore storage restrictions
    }
  };

  const handleRoleHotSwap = (role: UserRole) => {
    const swappedUser = simulatedSupabase.auth.switchRole(role);
    setCurrentUser(swappedUser);
    setMobileRoleMenuOpen(false);
  };

  const rolesList: { role: UserRole; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { role: 'client', label: 'Principal (James)', shortLabel: 'Principal', icon: <User className="w-3.5 h-3.5" /> },
    { role: 'family_office', label: 'Family Office (Elena)', shortLabel: 'Family Office', icon: <Building2 className="w-3.5 h-3.5" /> },
    { role: 'admin', label: 'Director (Camilla)', shortLabel: 'Director', icon: <Compass className="w-3.5 h-3.5" /> },
    { role: 'security', label: 'Security (Julian)', shortLabel: 'Security', icon: <Car className="w-3.5 h-3.5" /> },
  ];

  if (!isAuthenticated) {
    return <PortalLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-[#FAF7F0] selection:bg-[#E2BA6B]/30 selection:text-[#FAF7F0]">
      {/* Top Role Switcher & Clearance Bar */}
      <div className="sticky top-0 z-40 bg-[#0A0D13]/95 border-b border-[#202633] backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Sovereign Clearance Info */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <Shield className="w-3.5 h-3.5 text-[#E2BA6B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E2BA6B]">
              Albemarle Street Private Desk
            </span>
            <span className="text-[10px] font-mono text-[#8B95A8] hidden md:inline tabular-nums">
              · {currentUser.role === 'admin' ? 'Command Authority' : currentUser.role === 'security' ? 'Tactical Wing' : 'Encrypted Session'}
            </span>
          </div>

          {/* Center / Right: Desktop Switcher */}
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#8E96AA] mr-1 whitespace-nowrap shrink-0">
              Persona:
            </span>
            {rolesList.map((item) => {
              const isActive = currentUser.role === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleHotSwap(item.role)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono transition-all border whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#1C2330] text-[#E2BA6B] border-[#E2BA6B]/60 font-medium shadow-sm'
                      : 'bg-[#11141C] text-[#B5BCCB] border-transparent hover:border-[#272D3B] hover:text-[#FAF7F0]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Role Switcher Trigger + Sign Out */}
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <button
              type="button"
              onClick={() => setMobileRoleMenuOpen(!mobileRoleMenuOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#141822] text-[#E2BA6B] border border-[#273040] min-h-[40px] whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>{rolesList.find((r) => r.role === currentUser.role)?.shortLabel}</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-mono text-[#F39DA2] hover:text-white bg-[#221315] hover:bg-[#34181B] border border-[#482024] transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
              title="End session and return to credential gate"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Persona Dropdown Drawer */}
        <AnimatePresence>
          {mobileRoleMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 pt-2 border-t border-[#1C222E] grid grid-cols-2 gap-2 pb-2 overflow-hidden"
            >
              {rolesList.map((item) => {
                const isActive = currentUser.role === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleHotSwap(item.role)}
                    className={`flex items-center gap-2 p-2.5 text-xs font-mono text-left border whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1C2330] text-[#E2BA6B] border-[#E2BA6B]/50 font-medium'
                        : 'bg-[#11141C] text-[#D4D8E2] border-[#222836]'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate font-medium">{item.shortLabel}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Synced House Duty Notice */}
      {activeBroadcast && activeBroadcast.message && (
        <div className="bg-[#0C0F16] border-b border-[#1D222E] px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-[#D4D8E2]">
              <Radio className="w-3.5 h-3.5 text-[#E2BA6B] shrink-0" />
              <span className="text-[#E2BA6B] uppercase tracking-wider shrink-0">
                [{activeBroadcast.priority}]
              </span>
              <span className="font-light">{activeBroadcast.message}</span>
            </div>
            <span className="text-[#788296] shrink-0 text-[10px]">
              {activeBroadcast.author} · {activeBroadcast.timestamp}
            </span>
          </div>
        </div>
      )}

      {/* Main Role Content with Smooth Animation */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentUser.role === 'client' && <ClientDashboard user={currentUser} />}
            {currentUser.role === 'admin' && <AdminDashboard user={currentUser} />}
            {currentUser.role === 'security' && <SecurityDashboard user={currentUser} />}
            {currentUser.role === 'family_office' && <FamilyOfficeDashboard user={currentUser} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
