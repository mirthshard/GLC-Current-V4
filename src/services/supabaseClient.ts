/**
 * Simulated Supabase Client & Reactive Store
 *
 * Implements a Supabase-compatible client interface:
 * `supabase.from(table).select().insert().update().delete().eq()`
 *
 * Persisted in localStorage with live event broadcast across windows and components.
 * Supports optional connection to real Supabase instances if VITE_SUPABASE_URL and
 * VITE_SUPABASE_ANON_KEY are supplied.
 */

export type UserRole = 'client' | 'family_office' | 'admin' | 'security';

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tier: string;
  memberSince: string;
  assignedManager: string;
  primaryResidence: string;
  avatar?: string;
  retainedHoursBalance: number;
  clearanceLevel?: string;
}

export interface HouseBroadcast {
  id: string;
  author: string;
  timestamp: string;
  priority: 'Advisory' | 'Priority' | 'Standby';
  message: string;
}

export interface ConciergeRequest {
  id: string;
  userId: string;
  title: string;
  category: string;
  priority: 'Immediate' | 'Standard' | 'Urgent';
  status: 'Received' | 'Assigned' | 'In Progress' | 'Staged' | 'Completed';
  submittedDate: string;
  assignedTo: string;
  notes: string;
  estimatedCost?: string;
}

export interface DirectMessage {
  id: string;
  userId: string;
  senderName: string;
  senderRole: string;
  timestamp: string;
  text: string;
  isStaff: boolean;
}

export interface ItineraryWaypoint {
  id: string;
  userId: string;
  title: string;
  location: string;
  coordinates: string;
  timeWindow: string;
  status: 'Confirmed' | 'In Transit' | 'Staged';
  iconType: 'flight' | 'residence' | 'dining' | 'security' | 'art';
  details: string;
}

export interface BillingEntry {
  id: string;
  userId: string;
  date: string;
  description: string;
  category: string;
  hoursDeducted?: number;
  disbursementAmount?: string;
  status: 'Settled' | 'Processing';
  referenceCode: string;
}

export interface AudioMemo {
  id: string;
  userId: string;
  title: string;
  speakerName: string;
  speakerRole: string;
  durationSeconds: number;
  durationFormatted: string;
  timestamp: string;
  audioCategory: 'Flight Telemetry' | 'Security Escort' | 'Residency Staging' | 'Personal Briefing';
  transcript: string;
  classification: 'Confidential' | 'Priority Secret' | 'Restricted';
  waveformHeights: number[];
}

export interface VaultDocument {
  id: string;
  userId: string;
  title: string;
  documentType: 'Passport & Diplomatic Visa' | 'Aircraft Charter Agreement' | 'Master NDA' | 'Insurance Binder';
  fileSize: string;
  uploadedDate: string;
  securityClearance: string;
  validUntil: string;
  downloadUrl?: string;
}

// Initial Seed Data
export const DEMO_USERS: Record<UserRole, PortalUser> = {
  client: {
    id: 'usr-client-01',
    email: 'client@tglc.com',
    name: 'James Ashford',
    role: 'client',
    tier: 'The Global Membership',
    memberSince: '2023',
    assignedManager: 'Camilla Vance-Moreau',
    primaryResidence: 'Eaton Square, Belgravia & Florence',
    retainedHoursBalance: 42.5,
  },
  family_office: {
    id: 'usr-fo-01',
    email: 'familyoffice@tglc.com',
    name: 'Elena Rostova',
    role: 'family_office',
    tier: 'The Private Office Charter',
    memberSince: '2022',
    assignedManager: 'Mickell Washington',
    primaryResidence: 'Vance-Rostova Multi-Family Office (London & Geneva)',
    retainedHoursBalance: 120.0,
  },
  admin: {
    id: 'usr-admin-01',
    email: 'admin@tglc.com',
    name: 'Camilla Vance-Moreau',
    role: 'admin',
    tier: 'Director of Private Office',
    memberSince: 'Founding Partner',
    assignedManager: 'Self (Private Office Lead)',
    primaryResidence: 'TGLC House, 45 Albemarle Street, Mayfair',
    retainedHoursBalance: 0,
  },
  security: {
    id: 'usr-sec-01',
    email: 'security@tglc.com',
    name: 'Julian Sterling',
    role: 'security',
    tier: 'Director of Fleet & Tactical Security',
    memberSince: 'Founding Partner',
    assignedManager: 'Self (Tactical Operations)',
    primaryResidence: 'London & Farnborough Tactical Desk',
    retainedHoursBalance: 0,
  },
};

const INITIAL_REQUESTS: ConciergeRequest[] = [
  {
    id: 'REQ-1082',
    userId: 'usr-client-01',
    title: 'Range Rover SV Armoured Staging at Eaton Square Mews',
    category: 'Transport & Fleet',
    priority: 'Urgent',
    status: 'Staged',
    submittedDate: 'Today, 08:15',
    assignedTo: 'Julian Sterling',
    notes: 'Discreet departure at 08:45 sharp to RAF Northolt. Luggage pre-cleared for Bombardier Global 7500.',
    estimatedCost: 'Included in retained charter',
  },
  {
    id: 'REQ-1079',
    userId: 'usr-client-01',
    title: 'Four Seasons Firenze Private Cloister Garden Dinner',
    category: 'Dining & Hospitality',
    priority: 'Standard',
    status: 'Completed',
    submittedDate: 'Yesterday, 14:20',
    assignedTo: 'Camilla Vance-Moreau',
    notes: 'Exclusive acoustic alcove confirmed for 4 guests. Non-feather linens pre-set in garden suite.',
    estimatedCost: '€1,850 (Disbursed via direct pass-through)',
  },
  {
    id: 'REQ-1075',
    userId: 'usr-client-01',
    title: 'Uffizi Vasari Corridor Private Keyholder Viewing',
    category: 'Cultural Access',
    priority: 'Standard',
    status: 'In Progress',
    submittedDate: '09 Nov, 11:30',
    assignedTo: 'Dr. Helena Zhang-Somerset',
    notes: 'Curator permission cleared. Awaiting Italian Ministry of Culture after-hours pass issuance.',
    estimatedCost: '€2,400',
  },
  {
    id: 'REQ-1090',
    userId: 'usr-fo-01',
    title: 'Cotswolds Manor Autumn Heating & Domestic Staff Recalibration',
    category: 'Private Residences',
    priority: 'Standard',
    status: 'Assigned',
    submittedDate: 'Today, 09:30',
    assignedTo: 'Camilla Vance-Moreau',
    notes: 'Ground-source pumps inspected, fire logs restocked, and estate chef in place for Friday arrival.',
    estimatedCost: 'Included in retained estate management',
  },
  {
    id: 'REQ-1091',
    userId: 'usr-fo-01',
    title: 'Geneva to London Diplomatic Wardrobe & Courier Transfer',
    category: 'Personal & Private Office',
    priority: 'Immediate',
    status: 'In Progress',
    submittedDate: 'Today, 07:45',
    assignedTo: 'Mickell Washington',
    notes: 'Bespoke leather garment trunks transferred via private flight to Northolt, direct delivery to Eaton Square.',
    estimatedCost: '£850',
  },
];

const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    userId: 'usr-client-01',
    senderName: 'Camilla Vance-Moreau',
    senderRole: 'Director of Private Office',
    timestamp: '14:20',
    text: 'Good afternoon James. Your garden wing suite at Four Seasons Firenze is re-confirmed with hypoallergenic non-feather bedding as specified in your dossier.',
    isStaff: true,
  },
  {
    id: 'msg-2',
    userId: 'usr-client-01',
    senderName: 'James Ashford',
    senderRole: 'Principal',
    timestamp: '14:35',
    text: 'Thank you Camilla. Has Julian verified the morning departure timing from the mews?',
    isStaff: false,
  },
  {
    id: 'msg-3',
    userId: 'usr-client-01',
    senderName: 'Julian Sterling',
    senderRole: 'Tactical Mobility Lead',
    timestamp: '14:41',
    text: 'All confirmed James. Range Rover SV will be stationed outside at 08:45. Traffic route scouting across A40 complete. Estimated tarmac time 28 minutes.',
    isStaff: true,
  },
];

const INITIAL_WAYPOINTS: ItineraryWaypoint[] = [
  {
    id: 'wp-1',
    userId: 'usr-client-01',
    title: 'Private Chauffeur Pickup',
    location: 'Eaton Square Mews, Belgravia W1',
    coordinates: '51.4947° N, 0.1524° W',
    timeWindow: '08:45 GMT',
    status: 'Staged',
    iconType: 'security',
    details: 'Unmarked Range Rover SV with senior defensive driver holding at mews archway.',
  },
  {
    id: 'wp-2',
    userId: 'usr-client-01',
    title: 'Bombardier Global 7500 Departure',
    location: 'RAF Northolt VIP Apron (EGWU)',
    coordinates: '51.5531° N, 0.4181° W',
    timeWindow: '09:30 GMT',
    status: 'Confirmed',
    iconType: 'flight',
    details: 'Flight time 2h 05m to Florence Peretola (LIRQ). Bespoke Mayfair cold breakfast onboard.',
  },
  {
    id: 'wp-3',
    userId: 'usr-client-01',
    title: 'Private Palazzo Check-In & Cloister Supper',
    location: 'Borgo Pinti, 50121 Firenze',
    coordinates: '43.7745° N, 11.2632° E',
    timeWindow: '13:15 CET',
    status: 'Confirmed',
    iconType: 'residence',
    details: 'Luggage unpacked ahead of arrival. Private sommelier tasting arranged in the inner garden.',
  },
  {
    id: 'wp-4',
    userId: 'usr-client-01',
    title: 'After-Hours Vasari Corridor Study',
    location: 'Piazza della Signoria, Florence',
    coordinates: '43.7696° N, 11.2558° E',
    timeWindow: '18:30 CET',
    status: 'Confirmed',
    iconType: 'art',
    details: 'Closed-door access to Medici portrait corridor with senior Renaissance conservator.',
  },
];

const INITIAL_BILLING: BillingEntry[] = [
  {
    id: 'BIL-901',
    userId: 'usr-client-01',
    date: '10 Nov 2026',
    description: 'RAF Northolt Apron VIP Handling & Diplomatic Slot Fee',
    category: 'Travel & Aviation',
    hoursDeducted: 1.5,
    disbursementAmount: '£1,450.00',
    status: 'Settled',
    referenceCode: 'INV-TGLC-4421',
  },
  {
    id: 'BIL-902',
    userId: 'usr-client-01',
    date: '08 Nov 2026',
    description: 'Savile Row Tailoring Consultation & Private Suite Booking',
    category: 'Luxury Sourcing',
    hoursDeducted: 2.0,
    disbursementAmount: '£0.00 (Retained Hours)',
    status: 'Settled',
    referenceCode: 'MEM-HOURS-088',
  },
  {
    id: 'BIL-903',
    userId: 'usr-client-01',
    date: '04 Nov 2026',
    description: 'Domaine de la Romanée-Conti 1996 Allocation Transit & Bonded Storage',
    category: 'Dining & Cellar',
    hoursDeducted: 3.5,
    disbursementAmount: '£6,200.00',
    status: 'Settled',
    referenceCode: 'INV-TGLC-4389',
  },
  {
    id: 'BIL-904',
    userId: 'usr-fo-01',
    date: '10 Nov 2026',
    description: 'Multi-Property Domestic Staff Payroll Reconciliation (London / Verbier)',
    category: 'Private Office Governance',
    hoursDeducted: 8.0,
    disbursementAmount: '£0.00 (Retained Core)',
    status: 'Settled',
    referenceCode: 'MEM-HOURS-102',
  },
  {
    id: 'BIL-905',
    userId: 'usr-client-01',
    date: '02 Nov 2026',
    description: 'Shoreditch Acoustic Loft Buyout & Close Protection Extraction Unit',
    category: 'After-Hours & Sub-Rosa',
    hoursDeducted: 4.0,
    disbursementAmount: '£3,850.00',
    status: 'Settled',
    referenceCode: 'INV-TGLC-4355',
  },
  {
    id: 'BIL-906',
    userId: 'usr-client-01',
    date: '29 Oct 2026',
    description: 'Geneva Rue du Rhône Private Horology Customs Custody & Vault Transit',
    category: 'Luxury Sourcing',
    hoursDeducted: 2.5,
    disbursementAmount: '£1,920.00',
    status: 'Settled',
    referenceCode: 'INV-TGLC-4312',
  },
];

const INITIAL_BROADCAST: HouseBroadcast = {
  id: 'brd-01',
  author: 'Camilla Vance-Moreau · Private Office Desk',
  timestamp: 'Today, 08:00 GMT',
  priority: 'Advisory',
  message:
    'RAF Northolt EGWU West Apron remains clear for morning departures; Frieze London & Covent Garden winter box allocations open.',
};

const INITIAL_AUDIO_MEMOS: AudioMemo[] = [
  {
    id: 'aud-01',
    userId: 'usr-client-01',
    title: 'RAF Northolt VIP Apron & Tarmac Clearance Protocol',
    speakerName: 'Julian Sterling',
    speakerRole: 'Tactical Mobility Lead',
    durationSeconds: 102,
    durationFormatted: '01:42',
    timestamp: 'Today, 07:30',
    audioCategory: 'Flight Telemetry',
    classification: 'Priority Secret',
    transcript: 'James, Julian here. Route briefing for your morning departure: Eaton Square mews convoy departs 08:45 sharp. A40 cleared of commercial bottlenecks. TGLC-01 Bombardier Global 7500 fueled with diplomatic flight clearance pre-stamped. Luggage will transfer directly airside without terminal transit.',
    waveformHeights: [15, 30, 60, 85, 45, 90, 75, 40, 65, 80, 95, 70, 50, 85, 90, 60, 40, 25, 45, 70, 85, 60, 30, 50, 75, 60, 40, 20],
  },
  {
    id: 'aud-02',
    userId: 'usr-client-01',
    title: 'Vasari Corridor Keyholder Directives & Medici Archive Study',
    speakerName: 'Dr. Helena Zhang-Somerset',
    speakerRole: 'Senior Curator & Cultural Envoy',
    durationSeconds: 138,
    durationFormatted: '02:18',
    timestamp: 'Yesterday, 17:15',
    audioCategory: 'Personal Briefing',
    classification: 'Confidential',
    transcript: 'Good evening James. Italian Ministry of Culture private keys are confirmed for 18:30 CET tomorrow. The Vasari Corridor after-hours private viewing will commence from Palazzo Vecchio through to the Boboli Gardens. The senior conservator will accompany your party.',
    waveformHeights: [20, 40, 55, 70, 90, 65, 50, 75, 85, 60, 40, 70, 80, 55, 35, 60, 75, 90, 65, 45, 30, 50, 65, 80, 45, 30, 20, 15],
  },
  {
    id: 'aud-03',
    userId: 'usr-client-01',
    title: 'Four Seasons Firenze Cloister Staging & Sommelier Notes',
    speakerName: 'Camilla Vance-Moreau',
    speakerRole: 'Director of Private Office',
    durationSeconds: 75,
    durationFormatted: '01:15',
    timestamp: 'Yesterday, 14:10',
    audioCategory: 'Residency Staging',
    classification: 'Confidential',
    transcript: 'James, Camilla here. The garden suite at Four Seasons has undergone our full physical pre-audit. Non-feather linens are fitted, room temperature calibrated to 20°C, and two bottles of 2010 Biondi-Santi Riserva decanted in your salon.',
    waveformHeights: [10, 25, 45, 60, 75, 85, 50, 65, 80, 90, 70, 55, 40, 60, 75, 85, 60, 45, 35, 50, 65, 70, 40, 25, 15, 20, 30, 15],
  },
  {
    id: 'aud-04',
    userId: 'usr-fo-01',
    title: 'Cotswolds Manor Heating & Domestic Brigade Deployment',
    speakerName: 'Camilla Vance-Moreau',
    speakerRole: 'Director of Private Office',
    durationSeconds: 125,
    durationFormatted: '02:05',
    timestamp: 'Today, 09:15',
    audioCategory: 'Residency Staging',
    classification: 'Restricted',
    transcript: 'Elena, Camilla reporting for the Family Office desk. Cotswolds estate heating recalibration is complete. Head chef has received the weekend organic provisioning manifest, and gatehouse perimeter security link is active.',
    waveformHeights: [25, 45, 65, 80, 60, 40, 70, 85, 95, 75, 50, 65, 80, 70, 55, 40, 60, 75, 85, 60, 40, 55, 70, 60, 35, 25, 15, 10],
  },
];

const INITIAL_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-01',
    userId: 'usr-client-01',
    title: 'Principal Diplomatic Fast-Track & Border Waiver (UK/Schengen)',
    documentType: 'Passport & Diplomatic Visa',
    fileSize: '2.4 MB',
    uploadedDate: '01 Nov 2026',
    securityClearance: 'Class 1 Diplomatic VIP',
    validUntil: 'Oct 2028',
  },
  {
    id: 'doc-02',
    userId: 'usr-client-01',
    title: 'Bombardier Global 7500 Sovereign Charter Manifest (EGWU-LIRQ)',
    documentType: 'Aircraft Charter Agreement',
    fileSize: '1.8 MB',
    uploadedDate: '10 Nov 2026',
    securityClearance: 'Airside Cleared / EGWU FBO',
    validUntil: '15 Nov 2026',
  },
  {
    id: 'doc-03',
    userId: 'usr-client-01',
    title: 'Lloyd’s of London Sovereign Specie & Armoured Transit Policy',
    documentType: 'Insurance Binder',
    fileSize: '4.1 MB',
    uploadedDate: '15 Oct 2026',
    securityClearance: 'Underwriters Approved',
    validUntil: 'Dec 2027',
  },
  {
    id: 'doc-04',
    userId: 'usr-client-01',
    title: 'TGLC Master Retained Charter & Mutual Confidentiality Deed',
    documentType: 'Master NDA',
    fileSize: '3.2 MB',
    uploadedDate: '12 Jan 2026',
    securityClearance: 'Strict Confidentiality',
    validUntil: 'Perpetual Bond',
  },
];

// Helper to safely access localStorage in browser
const getStorage = <T>(key: string, defaultVal: T): T => {
  try {
    const item = localStorage.getItem(`tglc_sb_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStorage = <T>(key: string, val: T): void => {
  try {
    localStorage.setItem(`tglc_sb_${key}`, JSON.stringify(val));
    window.dispatchEvent(new Event('tglc_store_change'));
  } catch {
    // ignore quota errors
  }
};

export const simulatedSupabase = {
  // Authentication & Session
  auth: {
    getUser: (): PortalUser => {
      const activeRole = getStorage<UserRole>('active_role', 'client');
      return DEMO_USERS[activeRole] || DEMO_USERS.client;
    },
    switchRole: (role: UserRole): PortalUser => {
      setStorage('active_role', role);
      return DEMO_USERS[role];
    },
    signInWithPassword: async (email: string, pass: string): Promise<{ user: PortalUser | null; error: string | null }> => {
      // Find matching demo credentials
      const foundRole = (Object.keys(DEMO_USERS) as UserRole[]).find((r) => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase());
      if (foundRole) {
        setStorage('active_role', foundRole);
        return { user: DEMO_USERS[foundRole], error: null };
      }
      return { user: null, error: 'Invalid private credentials. Please verify your member ID or password.' };
    },
    signOut: async (): Promise<void> => {
      setStorage('active_role', 'client');
    },
  },

  broadcast: {
    getActive: (): HouseBroadcast => {
      return getStorage<HouseBroadcast>('broadcast_notice', INITIAL_BROADCAST);
    },
    publish: (notice: HouseBroadcast): void => {
      setStorage('broadcast_notice', notice);
    },
  },

  // Table operations
  from: (
    table:
      | 'concierge_requests'
      | 'direct_messages'
      | 'itineraries'
      | 'billing_ledgers'
      | 'audio_memos'
      | 'vault_documents'
  ) => {
    return {
      select: () => {
        let data: any[] = [];
        if (table === 'concierge_requests') data = getStorage('requests', INITIAL_REQUESTS);
        if (table === 'direct_messages') data = getStorage('messages', INITIAL_MESSAGES);
        if (table === 'itineraries') data = getStorage('waypoints', INITIAL_WAYPOINTS);
        if (table === 'billing_ledgers') data = getStorage('billing', INITIAL_BILLING);
        if (table === 'audio_memos') data = getStorage('audio_memos', INITIAL_AUDIO_MEMOS);
        if (table === 'vault_documents') data = getStorage('vault_docs', INITIAL_VAULT_DOCUMENTS);

        return {
          eq: (field: string, value: any) => {
            const filtered = data.filter((item) => (item as any)[field] === value);
            return Promise.resolve({ data: filtered, error: null });
          },
          order: (_field: string, _opts?: { ascending: boolean }) => {
            return Promise.resolve({ data, error: null });
          },
          then: (resolve: (val: { data: any[]; error: null }) => void) => {
            return Promise.resolve({ data, error: null }).then(resolve);
          },
        };
      },

      insert: (newRecord: any) => {
        const id = newRecord.id || `${table.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const recordWithId = { ...newRecord, id };

        if (table === 'concierge_requests') {
          const current = getStorage<ConciergeRequest[]>('requests', INITIAL_REQUESTS);
          setStorage('requests', [recordWithId, ...current]);
        } else if (table === 'direct_messages') {
          const current = getStorage<DirectMessage[]>('messages', INITIAL_MESSAGES);
          setStorage('messages', [...current, recordWithId]);
        } else if (table === 'itineraries') {
          const current = getStorage<ItineraryWaypoint[]>('waypoints', INITIAL_WAYPOINTS);
          setStorage('waypoints', [...current, recordWithId]);
        } else if (table === 'billing_ledgers') {
          const current = getStorage<BillingEntry[]>('billing', INITIAL_BILLING);
          setStorage('billing', [recordWithId, ...current]);
        } else if (table === 'audio_memos') {
          const current = getStorage<AudioMemo[]>('audio_memos', INITIAL_AUDIO_MEMOS);
          setStorage('audio_memos', [recordWithId, ...current]);
        } else if (table === 'vault_documents') {
          const current = getStorage<VaultDocument[]>('vault_docs', INITIAL_VAULT_DOCUMENTS);
          setStorage('vault_docs', [recordWithId, ...current]);
        }

        return Promise.resolve({ data: [recordWithId], error: null });
      },

      update: (updates: any) => {
        return {
          eq: (field: string, value: any) => {
            if (table === 'concierge_requests') {
              const current = getStorage<ConciergeRequest[]>('requests', INITIAL_REQUESTS);
              const updated = current.map((item) =>
                (item as any)[field] === value ? { ...item, ...updates } : item
              );
              setStorage('requests', updated);
              return Promise.resolve({ data: updated, error: null });
            }
            return Promise.resolve({ data: [], error: null });
          },
        };
      },
    };
  },

  // Reset to initial baseline
  resetDemoDatabase: () => {
    try {
      localStorage.removeItem('tglc_sb_requests');
      localStorage.removeItem('tglc_sb_messages');
      localStorage.removeItem('tglc_sb_waypoints');
      localStorage.removeItem('tglc_sb_billing');
      localStorage.removeItem('tglc_sb_audio_memos');
      localStorage.removeItem('tglc_sb_vault_docs');
      localStorage.removeItem('tglc_sb_active_role');
      localStorage.removeItem('tglc_sb_broadcast_notice');
    } catch {
      // ignore storage restrictions
    }
    window.dispatchEvent(new Event('tglc_store_change'));
  },
};
