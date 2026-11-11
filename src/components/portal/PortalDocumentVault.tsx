import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Lock,
  Download,
  Eye,
  Plus,
  CheckCircle2,
  Shield,
  FileCheck,
  Calendar,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  PortalUser,
  VaultDocument,
  simulatedSupabase,
} from '../../services/supabaseClient';

interface PortalDocumentVaultProps {
  user: PortalUser;
}

export const PortalDocumentVault: React.FC<PortalDocumentVaultProps> = ({ user }) => {
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<VaultDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<VaultDocument['documentType']>('Passport & Diplomatic Visa');
  const [newClearance, setNewClearance] = useState('Confidential VIP');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  const loadDocs = async () => {
    const { data } = await simulatedSupabase.from('vault_documents').select();
    if (data) setDocuments(data);
  };

  useEffect(() => {
    loadDocs();
    const handleStoreChange = () => loadDocs();
    window.addEventListener('tglc_store_change', handleStoreChange);
    return () => window.removeEventListener('tglc_store_change', handleStoreChange);
  }, []);

  const handleDownload = (doc: VaultDocument) => {
    const certText = [
      'THE GLOBAL LUXURY CONSORTIUM — ENCRYPTED VAULT CERTIFICATE',
      `Document ID: ${doc.id}`,
      `Title: ${doc.title}`,
      `Category: ${doc.documentType}`,
      `Holder: ${user.name}`,
      `Clearance Level: ${doc.securityClearance}`,
      `Valid Until: ${doc.validUntil}`,
      `Archived On: ${doc.uploadedDate}`,
      'Authentication Signature: ED25519 Elliptic Curve Verified · 45 Albemarle St W1S 4JL',
    ].join('\n');
    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tglc-vault-${doc.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded verified certificate ${doc.id} (${doc.title}).`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc: Partial<VaultDocument> = {
      userId: user.id,
      title: newTitle.trim(),
      documentType: newType,
      fileSize: '1.5 MB',
      uploadedDate: 'Just now',
      securityClearance: newClearance,
      validUntil: 'Nov 2027',
    };

    await simulatedSupabase.from('vault_documents').insert(newDoc);
    setIsAddModalOpen(false);
    setNewTitle('');
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Vault Header */}
      <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E222D]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#CFA85E] px-2.5 py-0.5 bg-[#171B24] border border-[#2F3746]">
                Encrypted Document Vault
              </span>
              <span className="text-[11px] font-mono text-[#7D879C]">Hardware-Bound Encryption</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-light tracking-wide">
              Confidential Document Locker
            </h1>
            <p className="text-xs sm:text-sm text-[#8B95A8] font-light flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#CFA85E]" /> Diplomatic travel waivers, aircraft charter manifests, and sovereign insurance policies
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3.5 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" /> Deposit Encrypted Document
            </button>
          </div>
        </div>

        {/* Action Notifications */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 p-3.5 bg-[#131E2A] border border-[#244260] text-sky-300 text-xs font-mono flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{downloadToast}</span>
            </motion.div>
          )}
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 p-3.5 bg-[#14231E] border border-[#2B6049] text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Credential recorded into Supabase vault with SHA-256 integrity hash.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0E1117] border border-[#202530] p-5 hover:border-[#333C4E] transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#151922] border border-[#272F3E] flex items-center justify-center text-[#CFA85E] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#788296] block">
                      {doc.documentType}
                    </span>
                    <h3 className="font-serif text-base text-[#F4F1EA] font-normal mt-0.5">{doc.title}</h3>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#141A22] text-[#CFA85E] border border-[#2E3747] shrink-0">
                  {doc.fileSize}
                </span>
              </div>

              <div className="mt-4 p-3 bg-[#11151E] border border-[#1C222E] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#6B7587]">Clearance Level:</span>
                  <span className="font-mono text-emerald-400 text-[11px]">{doc.securityClearance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#6B7587]">Valid Through:</span>
                  <span className="text-[#C2CAD8] font-mono text-[11px]">{doc.validUntil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#6B7587]">Archived On:</span>
                  <span className="text-[#788296] font-mono text-[10px]">{doc.uploadedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1C222E]">
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="text-[10px] font-mono uppercase tracking-wider text-[#CFA85E] hover:underline flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Inspect Dossier
              </button>
              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="text-[10px] font-mono uppercase tracking-wider text-[#A2ADBF] hover:text-[#F4F1EA] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Decrypt & Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Dossier Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-xl bg-[#0D1016] border border-[#2B3242] p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#202633]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E]">
                    Dossier Security Verification
                  </span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">{selectedDoc.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="text-neutral-500 hover:text-neutral-300 text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#12161F] border border-[#222938] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#788296] font-mono text-[10px] uppercase">Unique Reference:</span>
                    <span className="font-mono text-[#CFA85E]">{selectedDoc.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#788296] font-mono text-[10px] uppercase">Document Category:</span>
                    <span className="text-[#F4F1EA]">{selectedDoc.documentType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#788296] font-mono text-[10px] uppercase">Authentication Cryptography:</span>
                    <span className="font-mono text-emerald-400">ED25519 Elliptic Curve Verified</span>
                  </div>
                </div>

                <div className="p-4 bg-[#090C12] border border-[#1A202D] space-y-2 text-center py-8">
                  <Shield className="w-10 h-10 text-[#CFA85E] mx-auto mb-2" />
                  <p className="text-xs text-[#E2E8F0] font-light">
                    This document is bound to principal identity <span className="font-mono text-[#CFA85E]">{user.name}</span>.
                  </p>
                  <p className="text-[11px] text-[#717C92] font-mono">
                    Airside clearance protocols synchronized with RAF Northolt (EGWU) and Farnborough (EGLF) FBOs.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202633]">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 text-xs font-mono text-[#8C96A8]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownload(selectedDoc);
                    setSelectedDoc(null);
                  }}
                  className="px-6 py-2.5 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Decrypted PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Deposit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg bg-[#0D1016] border border-[#2B3242] p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#202633]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E]">
                    Sovereign Document Deposit
                  </span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">Deposit Vault Credential</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-300 text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddDocument} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1.5">
                    Credential Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Geneva Diplomatic Residuary Deed"
                    className="w-full px-3.5 py-2.5 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1.5">
                    Document Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  >
                    <option value="Passport & Diplomatic Visa">Passport & Diplomatic Visa</option>
                    <option value="Aircraft Charter Agreement">Aircraft Charter Agreement</option>
                    <option value="Master NDA">Master Confidentiality NDA</option>
                    <option value="Insurance Binder">Insurance & Transit Binder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1.5">
                    Security Classification
                  </label>
                  <input
                    type="text"
                    value={newClearance}
                    onChange={(e) => setNewClearance(e.target.value)}
                    placeholder="e.g. Class 1 VIP / Airside Only"
                    className="w-full px-3.5 py-2.5 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#202633]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-[#8C96A8]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    Deposit & Encrypt
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
