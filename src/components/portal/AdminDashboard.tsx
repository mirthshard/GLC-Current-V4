import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Users,
  Clock,
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Send,
  Sliders,
  ChevronRight,
  UserCheck,
  Building,
  Plane,
} from 'lucide-react';
import {
  PortalUser,
  ConciergeRequest,
  simulatedSupabase,
} from '../../services/supabaseClient';

interface AdminDashboardProps {
  user: PortalUser;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [requests, setRequests] = useState<ConciergeRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ConciergeRequest | null>(null);
  const [statusUpdatedToast, setStatusUpdatedToast] = useState<string | null>(null);

  // Broadcast state
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastPriority, setBroadcastPriority] = useState<'Advisory' | 'Priority' | 'Standby'>('Advisory');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const DIRECTORS = [
    'Camilla Vance-Moreau',
    'Julian Sterling',
    'Mickell Washington',
    'Dr. Helena Zhang-Somerset',
  ];

  // Sovereign Members Roster
  const sovereignMembers = [
    {
      name: 'James Ashford',
      tier: 'The Global Membership',
      location: 'Eaton Square / Florence',
      thumb: '/assets/aistudio/hero_luxury_london_residence_1794298893032.jpg',
      hoursRemaining: 42.5,
      activeDossier: 'Florence Villa & RAF Northolt Apron Staging',
      manager: 'Camilla Vance-Moreau',
      status: 'Active In Transit',
    },
    {
      name: 'Elena Rostova',
      tier: 'The Private Office Charter',
      location: 'Geneva / London / Verbier',
      thumb: '/assets/aistudio/cotswolds_manor_estate.jpg',
      hoursRemaining: 120.0,
      activeDossier: 'Cotswolds Manor Autumn Recalibration',
      manager: 'Mickell Washington',
      status: 'Active Sovereign',
    },
    {
      name: 'Lord Alistair Sterling',
      tier: 'The Sovereign Circle',
      location: 'Mayfair, London',
      thumb: '/assets/aistudio/monaco_harbor_twilight_1794391696625.jpg',
      hoursRemaining: 185.0,
      activeDossier: 'Monaco Yacht Show Sovereign Berth Tender',
      manager: 'Camilla Vance-Moreau',
      status: 'Active Sovereign',
    },
    {
      name: 'Lady Beatrice Pelham',
      tier: 'The Global Membership',
      location: 'Kensington & Zurich',
      thumb: '/assets/aistudio/frieze_gallery_pavilion_1794391697548.jpg',
      hoursRemaining: 68.0,
      activeDossier: 'Basel Art Fair Curatorial Escort',
      manager: 'Dr. Helena Zhang-Somerset',
      status: 'Active',
    },
  ];

  const loadRequests = async () => {
    const { data } = await simulatedSupabase.from('concierge_requests').select();
    if (data) setRequests(data);
  };

  useEffect(() => {
    loadRequests();
    const handleStoreChange = () => loadRequests();
    window.addEventListener('tglc_store_change', handleStoreChange);
    return () => window.removeEventListener('tglc_store_change', handleStoreChange);
  }, []);

  const handleUpdateStatus = async (reqId: string, newStatus: ConciergeRequest['status']) => {
    await simulatedSupabase.from('concierge_requests').update({ status: newStatus }).eq('id', reqId);
    setStatusUpdatedToast(`Request ${reqId} updated to "${newStatus}" across portal consoles.`);
    setTimeout(() => setStatusUpdatedToast(null), 3000);
  };

  const handleUpdatePriority = async (reqId: string, priority: ConciergeRequest['priority']) => {
    await simulatedSupabase.from('concierge_requests').update({ priority }).eq('id', reqId);
    setStatusUpdatedToast(`Priority triage for ${reqId} elevated to "${priority}".`);
    setTimeout(() => setStatusUpdatedToast(null), 3000);
  };

  const handleReassignDirector = async (reqId: string, assignedTo: string) => {
    await simulatedSupabase.from('concierge_requests').update({ assignedTo }).eq('id', reqId);
    setStatusUpdatedToast(`${reqId} reassigned to ${assignedTo}.`);
    setTimeout(() => setStatusUpdatedToast(null), 3000);
  };

  const handleUpdateNotes = async (reqId: string, notes: string) => {
    await simulatedSupabase.from('concierge_requests').update({ notes }).eq('id', reqId);
    setStatusUpdatedToast(`Operational brief saved for ${reqId}.`);
    setTimeout(() => setStatusUpdatedToast(null), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    simulatedSupabase.broadcast.publish({
      id: `brd-${Date.now()}`,
      author: `${user.name} · Private Office Desk`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' GMT',
      priority: broadcastPriority,
      message: broadcastMessage.trim(),
    });
    setBroadcastSent(true);
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSent(false), 3500);
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || r.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8">
      {/* Admin Operations Banner */}
      <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E222D]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] px-2.5 py-0.5 bg-[#171B24] border border-[#3A331E]">
                Private Office Command
              </span>
              <span className="text-[11px] font-mono text-[#7D879C]">Station: 45 Albemarle St, Mayfair W1S</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-light tracking-wide">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#8B95A8] font-light flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> Global Mandate Dispatch & Multi-Family Triage Console
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#141822] border border-[#242A38]">
              <span className="block text-[9px] font-mono uppercase tracking-[0.14em] text-[#788296]">Active Queue</span>
              <span className="text-xl font-serif text-[#F4F1EA] font-medium">{requests.length}</span>
              <span className="block text-[9px] text-[#555E70] mt-0.5">Live mandates</span>
            </div>
            <div className="p-3.5 bg-[#141822] border border-[#242A38]">
              <span className="block text-[9px] font-mono uppercase tracking-[0.14em] text-[#788296]">Urgent / SLA</span>
              <span className="text-xl font-serif text-amber-400 font-medium">
                {requests.filter((r) => r.priority !== 'Standard').length}
              </span>
              <span className="block text-[9px] text-amber-500/80 mt-0.5">&lt; 15m target</span>
            </div>
            <div className="p-3.5 bg-[#141822] border border-[#242A38]">
              <span className="block text-[9px] font-mono uppercase tracking-[0.14em] text-[#788296]">Staged / Flight</span>
              <span className="text-xl font-serif text-[#CFA85E] font-medium">
                {requests.filter((r) => r.status === 'Staged').length}
              </span>
              <span className="block text-[9px] text-[#86754B] mt-0.5">On tarmac / fleet</span>
            </div>
            <div className="p-3.5 bg-[#141822] border border-[#242A38]">
              <span className="block text-[9px] font-mono uppercase tracking-[0.14em] text-[#788296]">Sovereign Roster</span>
              <span className="text-xl font-serif text-emerald-400 font-medium">18 Principals</span>
              <span className="block text-[9px] text-emerald-600 mt-0.5">100% Retained</span>
            </div>
          </div>
        </div>

        {/* Global Operations Notice Push */}
        <form onSubmit={handleSendBroadcast} className="mt-4 flex flex-col sm:flex-row gap-3">
          <select
            value={broadcastPriority}
            onChange={(e) => setBroadcastPriority(e.target.value as any)}
            className="px-3 py-2.5 bg-[#12161F] border border-[#242B3A] text-xs font-mono text-[#E2BA6B] focus:outline-none focus:border-[#D4AF37] shrink-0"
          >
            <option value="Advisory">Advisory</option>
            <option value="Priority">Priority</option>
            <option value="Standby">Standby</option>
          </select>
          <input
            type="text"
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Publish house briefing across all portal headers (e.g. Farnborough Gate 4 clear, Shoreditch studio standby)..."
            className="flex-1 px-3.5 py-2.5 bg-[#12161F] border border-[#242B3A] text-xs font-mono text-[#FAF7F0] focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#252E3E] hover:bg-[#313C50] text-[#E2BA6B] border border-[#3A465C] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Publish Broadcast
          </button>
        </form>

        {broadcastSent && (
          <p className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Broadcast published live across Principal, Family Office & Tactical banners.
          </p>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {statusUpdatedToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 bg-[#15241C] border border-[#2B6049] text-emerald-300 text-xs font-mono flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusUpdatedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Triage Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E222D]">
          <div>
            <h2 className="font-serif text-xl text-[#F4F1EA] font-light">Global Concierge Triage Console</h2>
            <p className="text-xs text-[#8B95A8] font-light mt-0.5">
              Live updates made here synchronize instantly to the client and security leads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5D677B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter requests..."
                className="pl-8.5 pr-3 py-1.5 bg-[#12161F] border border-[#252D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#12161F] border border-[#252D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Statuses</option>
              <option value="Received">Received</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Staged">Staged</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#12161F] border border-[#252D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Priorities</option>
              <option value="Standard">Standard</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </select>
          </div>
        </div>

        <div className="border border-[#202530] overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#12161F] border-b border-[#202530] font-mono text-[10px] uppercase tracking-[0.14em] text-[#7B8599]">
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Request & Brief</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned Director</th>
                <th className="py-3 px-4">Current Status (Quick Update)</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171C26] bg-[#0E1117]">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#131722] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#D4AF37] font-medium">{req.id}</td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <span className="font-serif text-sm text-[#F4F1EA] block font-normal">{req.title}</span>
                    <span className="text-[11px] text-[#7B8599] font-light block mt-0.5">{req.notes}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#D4D8E2] whitespace-nowrap">{req.category}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={req.priority}
                      onChange={(e) => handleUpdatePriority(req.id, e.target.value as any)}
                      className={`px-2 py-1 font-mono text-[10px] uppercase border focus:outline-none bg-[#12161F] ${
                        req.priority === 'Immediate'
                          ? 'text-rose-400 border-rose-800/60'
                          : req.priority === 'Urgent'
                          ? 'text-amber-400 border-amber-800/60'
                          : 'text-[#D4D8E2] border-[#2B3547]'
                      }`}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Immediate">Immediate</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={req.assignedTo}
                      onChange={(e) => handleReassignDirector(req.id, e.target.value)}
                      className="px-2.5 py-1 bg-[#141924] border border-[#2B3547] text-[11px] font-mono text-[#FAF7F0] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {DIRECTORS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={req.status}
                      onChange={(e) => handleUpdateStatus(req.id, e.target.value as any)}
                      className="px-2.5 py-1 bg-[#141924] border border-[#2B3547] text-[11px] font-mono text-[#E2BA6B] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Received">Received</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Staged">Staged</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] hover:underline whitespace-nowrap"
                    >
                      Edit Brief
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sovereign Member Roster Directory */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E222D]">
          <div>
            <h2 className="font-serif text-xl text-[#FAF7F0] font-light">Accredited Sovereign Directory</h2>
            <p className="text-xs text-[#D4D8E2] font-light mt-0.5">
              Principal dossier status, retained hours depletion, and active deployments.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-[#E2BA6B]">Confidential · Mayfair Level 1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sovereignMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#0E1117] border border-[#202530] hover:border-[#E2BA6B]/50 transition-all overflow-hidden group"
            >
              <div className="aspect-[16/7] w-full overflow-hidden bg-black relative">
                <img
                  src={member.thumb}
                  alt={member.location}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-transparent" />
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-400 bg-[#0A0E12]/90 border border-emerald-800/50 px-2 py-0.5">
                  {member.status}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#E2BA6B] block">
                    {member.tier}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF7F0] font-medium mt-0.5">{member.name}</h3>
                </div>

                <div className="text-xs text-[#D4D8E2] font-light space-y-1.5 bg-[#12161F] p-3 border border-[#1B212C]">
                  <p>
                    <span className="text-[#8E98AB] font-mono text-[10px] uppercase">Current Deployment: </span>
                    <span className="text-[#FAF7F0]">{member.location}</span>
                  </p>
                  <p>
                    <span className="text-[#8E98AB] font-mono text-[10px] uppercase">Active Dossier: </span>
                    <span className="text-[#D4D8E2]">{member.activeDossier}</span>
                  </p>
                  <div className="flex items-center justify-between pt-1.5 border-t border-[#1C222E]">
                    <span className="text-[10px] font-mono text-[#B5BCCB]">Desk Lead: {member.manager}</span>
                    <span className="text-[11px] font-mono text-[#E2BA6B] font-medium tabular-nums">
                      {member.hoursRemaining.toFixed(1)} Retained Hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Brief Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg bg-[#0D1016] border border-[#2B3242] p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#202633]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                    TGLC Internal Brief Triage
                  </span>
                  <h3 className="font-serif text-lg text-[#F4F1EA] font-normal">{selectedRequest.id}: {selectedRequest.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="text-neutral-500 hover:text-neutral-300 text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1">
                    Operational Notes & Internal Brief
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={selectedRequest.notes}
                    id="brief-notes"
                    className="w-full px-3 py-2 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#202633]">
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2 text-xs font-mono text-[#8C96A8]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('brief-notes') as HTMLTextAreaElement;
                      if (el) handleUpdateNotes(selectedRequest.id, el.value);
                      setSelectedRequest(null);
                    }}
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E0C058] text-[#090B0E] font-serif text-xs uppercase tracking-wider font-semibold"
                  >
                    Save Internal Brief
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
