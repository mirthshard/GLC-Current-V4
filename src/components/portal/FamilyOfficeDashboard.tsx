import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  PieChart,
  Home,
  CheckCircle2,
  Plus,
  FileSpreadsheet,
  Download,
  DollarSign,
  ShieldCheck,
  Thermometer,
  Users,
} from 'lucide-react';
import { PortalUser, simulatedSupabase } from '../../services/supabaseClient';

interface FamilyOfficeDashboardProps {
  user: PortalUser;
}

export const FamilyOfficeDashboard: React.FC<FamilyOfficeDashboardProps> = ({ user }) => {
  const [residences] = useState([
    {
      name: 'Chester Square Townhouse',
      location: 'Belgravia, London SW1W',
      image: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      status: 'Ready for Occupancy',
      staffCount: 6,
      hvacTemp: '20.5°C',
      securityStatus: 'Perimeter Armed • CCTV Live',
      lastInspection: 'Yesterday, 16:00',
    },
    {
      name: 'Daylesford Manor Estate',
      location: 'Cotswolds, Gloucestershire',
      image: '/assets/aistudio/cotswolds_manor_estate.jpg',
      status: 'Autumn Recalibration In Progress',
      staffCount: 12,
      hvacTemp: '21.0°C (Ground Source)',
      securityStatus: 'Gated Perimeter • Gatehouse Staffed',
      lastInspection: 'Today, 09:30',
    },
    {
      name: 'Les Esserts Alpine Chalet',
      location: 'Verbier, Switzerland',
      image: '/assets/aistudio/swiss_alpine_chalet.jpg',
      status: 'Winter Season Prep',
      staffCount: 4,
      hvacTemp: '18.0°C (Standby)',
      securityStatus: 'Alps Remote Security Link Active',
      lastInspection: '08 Nov 2026',
    },
    {
      name: 'Cap d’Antibes Waterfront Villa',
      location: 'Côte d’Azur, France',
      image: '/assets/aistudio/mediterranean_superyacht_deck.jpg',
      status: 'Winterized & Secured',
      staffCount: 3,
      hvacTemp: '19.0°C',
      securityStatus: 'Mooring & Villa Monitored',
      lastInspection: '02 Nov 2026',
    },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskEstate, setTaskEstate] = useState('Daylesford Manor Estate');
  const [taskNotes, setTaskNotes] = useState('');
  const [taskToast, setTaskToast] = useState(false);
  const [exportToast, setExportToast] = useState(false);

  const handleCreateEstateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    await simulatedSupabase.from('concierge_requests').insert({
      userId: user.id,
      title: `[${taskEstate}] ${taskTitle.trim()}`,
      category: 'Private Residences',
      priority: 'Standard',
      status: 'Received',
      submittedDate: 'Just now',
      assignedTo: 'Camilla Vance-Moreau',
      notes: taskNotes.trim() || 'Logged via Family Office executive terminal.',
      estimatedCost: 'Retained Estate Core',
    });

    setIsTaskModalOpen(false);
    setTaskTitle('');
    setTaskNotes('');
    setTaskToast(true);
    setTimeout(() => setTaskToast(false), 3500);
  };

  const handleExportAudit = () => {
    const csvHeader = 'Estate Name,Location,Operational Status,Staff Count,HVAC Climate,Security Link,Last Audit\n';
    const csvRows = residences
      .map(
        (r) =>
          `"${r.name}","${r.location}","${r.status}",${r.staffCount},"${r.hvacTemp}","${r.securityStatus}","${r.lastInspection}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tglc-family-office-q4-audit-2026.csv';
    link.click();
    URL.revokeObjectURL(url);
    setExportToast(true);
    setTimeout(() => setExportToast(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Family Office Header */}
      <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E222D]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3B8CC] px-2.5 py-0.5 bg-[#141B24] border border-[#233344]">
                Multi-Family Office Charter
              </span>
              <span className="text-[11px] font-mono text-[#7D879C]">London Mayfair & Geneva Desk</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-light tracking-wide">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#8B95A8] font-light flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#A3B8CC]" /> Sovereign Estate Oversight, Retained Governance & Capital Disbursements
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="px-5 py-3.5 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" /> Log Estate Task
            </button>
            <button
              onClick={handleExportAudit}
              className="px-4 py-3.5 bg-[#171F2C] hover:bg-[#202C3E] text-[#A3B8CC] border border-[#2D3E54] text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Export Q4 Audit Dossier
            </button>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {taskToast && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-4 p-3.5 bg-[#15241C] border border-[#2B6049] text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Estate directive saved to Supabase and dispatched to Private Office managers.</span>
            </motion.div>
          )}
          {exportToast && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-4 p-3.5 bg-[#141B26] border border-[#2A3C52] text-sky-300 text-xs font-mono flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-sky-400" />
              <span>Generating encrypted PDF/CSV ledger for Elena Rostova & Family Office Trustees.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Retained Hours Allocation Breakdown */}
      <div className="bg-[#0E1117] border border-[#202530] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E222D]">
          <div>
            <h2 className="font-serif text-xl text-[#F4F1EA] font-light">
              Annual Retained Core Allocation & Burn Analytics
            </h2>
            <p className="text-xs text-[#8A94A7] font-light mt-0.5">
              120.0 hours allocated under Charter 2026. Billed at true pass-through without secret markups.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C879C] block">Consumed</span>
              <span className="text-xl font-serif text-[#CFA85E]">48.0 hrs (40%)</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C879C] block">Remaining</span>
              <span className="text-xl font-serif text-emerald-400">72.0 hrs (60%)</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-[#151A24] overflow-hidden flex">
            <div style={{ width: '15%' }} className="bg-[#CFA85E] h-full" title="Estate Governance (18h)" />
            <div style={{ width: '12%' }} className="bg-[#8BA888] h-full" title="Aviation & Mobility (14h)" />
            <div style={{ width: '8%' }} className="bg-[#A3B8CC] h-full" title="Art & Cultural (10h)" />
            <div style={{ width: '5%' }} className="bg-[#8C76A5] h-full" title="Legal & Tax Structuring (6h)" />
            <div style={{ width: '60%' }} className="bg-[#232B39] h-full" title="Remaining Available (72h)" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#8C96A8] pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#CFA85E]" /> Estate Staff & Operations (18.0h)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#8BA888]" /> Private Aviation & Charters (14.0h)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#A3B8CC]" /> Art & Asset Logistics (10.0h)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#8C76A5]" /> Cross-Border Protocol (6.0h)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 bg-[#232B39]" /> Uncommitted Hours (72.0h)
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Residence Asset Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E222D]">
          <div>
            <h2 className="font-serif text-xl text-[#F4F1EA] font-light">Global Residence & Property Portfolio</h2>
            <p className="text-xs text-[#8B95A8] font-light mt-0.5">
              Environmental telemetry, staff status, and security link verified every 60 minutes.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-[#A3B8CC]">4 Estates Under Management</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {residences.map((res, idx) => (
            <div
              key={idx}
              className="bg-[#0E1117] border border-[#202530] hover:border-[#E2BA6B]/50 transition-all overflow-hidden group"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-black relative">
                <img
                  src={res.image}
                  alt={res.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-transparent" />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-emerald-400 bg-[#0A0E12]/90 border border-emerald-800/60 px-2 py-0.5">
                  {res.status}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#A3B8CC] block">
                    {res.location}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF7F0] font-medium mt-0.5">{res.name}</h3>
                </div>

                <div className="space-y-1.5 text-xs bg-[#12161F] p-3.5 border border-[#1A202C]">
                  <p className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#8E98AB] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#E2BA6B]" /> Domestic Staff Complement:
                    </span>
                    <span className="text-[#FAF7F0] font-mono text-[11px] tabular-nums">{res.staffCount} Staff Present</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#8E98AB] flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-sky-400" /> Climate Control:
                    </span>
                    <span className="text-[#D8DEE9] font-mono text-[11px] tabular-nums">{res.hvacTemp}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#8E98AB] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security Telemetry:
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px]">{res.securityStatus}</span>
                  </p>
                  <div className="pt-1 border-t border-[#1C222E]">
                    <span className="text-[10px] font-mono text-[#B5BCCB]">Physical Audit: {res.lastInspection}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Household Signatory & EA Delegation Authority Matrix */}
        <div className="bg-[#0E1117] border border-[#202530] mt-6 overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#12161F] border-b border-[#202530] flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg text-[#FAF7F0] font-light">
                Household Signatory & EA Delegation Authority Matrix
              </h3>
              <p className="text-xs text-[#B5BCCB] font-light">
                Authorised expenditure limits and communication verification channels for 2026.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#E2BA6B]">Geneva Trust Verified</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0A0D13] border-b border-[#1C212B] font-mono text-[10px] uppercase tracking-[0.14em] text-[#8E98AB]">
                  <th className="py-3 px-4">Authorised Officer</th>
                  <th className="py-3 px-4">Role / Capacity</th>
                  <th className="py-3 px-4">Scope of Mandate</th>
                  <th className="py-3 px-4">Sign-Off Limit</th>
                  <th className="py-3 px-4">Primary Auth Channel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171C26]">
                {[
                  {
                    person: 'Elena Rostova',
                    role: 'Family Office Chief Executive',
                    scope: 'All Four Estates, Charter Aviation, Trust Ledgers',
                    limit: 'Unlimited (Primary Mandator)',
                    channel: 'Hardened Signal + Hardware Token',
                  },
                  {
                    person: 'Henriette de Vries',
                    role: 'Chief of Staff (Zurich / London)',
                    scope: 'Travel Logistics, Schooling, Household Staffing',
                    limit: '£75,000 per Mandate',
                    channel: 'Encrypted Portal + PGPsigned Wire',
                  },
                  {
                    person: 'Julian Sterling',
                    role: 'Tactical Security Lead',
                    scope: 'Emergency Extraction, FBO Clearance & Fleet',
                    limit: '£40,000 Immediate Mobilisation',
                    channel: 'Direct Albemarle Radio & Signal',
                  },
                  {
                    person: 'Charles Ashworth',
                    role: 'Daylesford Estate House Manager',
                    scope: 'Cotswolds Provisions, Contractors & Grounds',
                    limit: '£15,000 Monthly Operational',
                    channel: 'Family Office Portal Voucher',
                  },
                ].map((sig) => (
                  <tr key={sig.person} className="hover:bg-[#131722] transition-colors">
                    <td className="py-3.5 px-4 font-serif text-[#FAF7F0] whitespace-nowrap">{sig.person}</td>
                    <td className="py-3.5 px-4 text-[#D4D8E2]">{sig.role}</td>
                    <td className="py-3.5 px-4 text-[#B5BCCB]">{sig.scope}</td>
                    <td className="py-3.5 px-4 font-mono text-[#E2BA6B] whitespace-nowrap">{sig.limit}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#D4D8E2]">{sig.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Estate Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg bg-[#0D1016] border border-[#2B3242] p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#202633]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A3B8CC]">
                    Family Office Governance
                  </span>
                  <h3 className="font-serif text-xl text-[#F4F1EA] font-light">Log New Estate Directive</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-300 text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateEstateTask} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1">
                    Target Estate / Property
                  </label>
                  <select
                    value={taskEstate}
                    onChange={(e) => setTaskEstate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#A3B8CC]"
                  >
                    <option value="Chester Square Townhouse">Chester Square Townhouse (Belgravia)</option>
                    <option value="Daylesford Manor Estate">Daylesford Manor Estate (Cotswolds)</option>
                    <option value="Les Esserts Alpine Chalet">Les Esserts Alpine Chalet (Verbier)</option>
                    <option value="Cap d’Antibes Waterfront Villa">Cap d’Antibes Waterfront Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1">
                    Directive Title
                  </label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g. Winterizing irrigation and fine wine delivery intake"
                    className="w-full px-3 py-2 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#A3B8CC]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1">
                    Operational Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                    placeholder="Instruct estate staff, contractors, or bonded deliveries..."
                    className="w-full px-3 py-2 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#A3B8CC]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#202633]">
                  <button
                    type="button"
                    onClick={() => setIsTaskModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-[#8C96A8]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-wider font-semibold"
                  >
                    Dispatch Directive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
