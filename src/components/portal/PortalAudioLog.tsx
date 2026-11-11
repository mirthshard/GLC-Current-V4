import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Mic,
  Square,
  Send,
  Radio,
  Clock,
  Shield,
  FileText,
  CheckCircle2,
  Lock,
  ChevronRight,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import {
  PortalUser,
  AudioMemo,
  simulatedSupabase,
} from '../../services/supabaseClient';

interface PortalAudioLogProps {
  user: PortalUser;
}

export const PortalAudioLog: React.FC<PortalAudioLogProps> = ({ user }) => {
  const [memos, setMemos] = useState<AudioMemo[]>([]);
  const [activeMemo, setActiveMemo] = useState<AudioMemo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedTitle, setRecordedTitle] = useState('');
  const [recordedCategory, setRecordedCategory] = useState<'Flight Telemetry' | 'Security Escort' | 'Residency Staging' | 'Personal Briefing'>('Personal Briefing');
  const [showRecorderModal, setShowRecorderModal] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [recordedSuccessToast, setRecordedSuccessToast] = useState(false);

  // Web Audio Context for realistic ambient audio tone feedback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const loadMemos = async () => {
    const { data } = await simulatedSupabase.from('audio_memos').select();
    if (data && data.length > 0) {
      setMemos(data);
      if (!activeMemo) {
        setActiveMemo(data[0]);
      }
    }
  };

  useEffect(() => {
    loadMemos();
    const handleStoreChange = () => loadMemos();
    window.addEventListener('tglc_store_change', handleStoreChange);
    return () => window.removeEventListener('tglc_store_change', handleStoreChange);
  }, []);

  // Web Audio Playback Simulation
  const startTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtxRef.current.currentTime); // gentle warm low tone
        gain.gain.setValueAtTime(0.015, audioCtxRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
      }
    } catch {
      // AudioContext disallowed or blocked by browser
    }
  };

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
      oscRef.current = null;
    }
  };

  // Playback timer ticker
  useEffect(() => {
    let interval: any;
    if (isPlaying && activeMemo) {
      startTone();
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            stopTone();
            return 0;
          }
          const next = prev + 100 / activeMemo.durationSeconds;
          const currentSec = Math.floor((next / 100) * activeMemo.durationSeconds);
          const mins = Math.floor(currentSec / 60);
          const secs = currentSec % 60;
          setCurrentTimeFormatted(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return next;
        });
      }, 1000);
    } else {
      stopTone();
    }
    return () => {
      clearInterval(interval);
      stopTone();
    };
  }, [isPlaying, activeMemo]);

  // Recording timer
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectMemo = (memo: AudioMemo) => {
    setIsPlaying(false);
    stopTone();
    setPlaybackProgress(0);
    setCurrentTimeFormatted('00:00');
    setActiveMemo(memo);
  };

  const handleCopyTranscript = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const handleDownloadTranscript = (memo: AudioMemo) => {
    const content = [
      'THE GLOBAL LUXURY CONSORTIUM — VOICE BRIEFING TRANSCRIPT',
      `Memo ID: ${memo.id}`,
      `Classification: ${memo.classification}`,
      `Title: ${memo.title}`,
      `Speaker: ${memo.speakerName} (${memo.speakerRole})`,
      `Category: ${memo.audioCategory} | Duration: ${memo.durationFormatted} | Recorded: ${memo.timestamp}`,
      '',
      'VERBATIM TRANSCRIPT:',
      memo.transcript,
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tglc-briefing-${memo.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartRecording = () => {
    setRecordingSeconds(0);
    setIsRecording(true);
    setRecordedTitle(
      `Verbal Mandate: Departure Directive (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleTransmitRecording = async () => {
    if (recordingSeconds < 2) return;
    setIsTransmitting(true);

    const mins = Math.floor(recordingSeconds / 60);
    const secs = recordingSeconds % 60;
    const durFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const newMemo: Partial<AudioMemo> = {
      userId: user.id,
      title: recordedTitle || `Principal Audio Mandate (${durFormatted})`,
      speakerName: user.name,
      speakerRole: 'Principal / Accredited Member',
      durationSeconds: recordingSeconds,
      durationFormatted: durFormatted,
      timestamp: 'Just now',
      audioCategory: recordedCategory,
      classification: 'Confidential',
      transcript: `[Decrypted Audio Stream]: Priority verbal directive from ${user.name}. Instructing desk team to prioritize transport staging and concierge clearance.`,
      waveformHeights: [25, 45, 65, 90, 75, 60, 85, 95, 70, 50, 65, 80, 55, 40, 70, 85, 60, 35, 20, 15],
    };

    await simulatedSupabase.from('audio_memos').insert(newMemo);

    // Also auto-dispatch into concierge requests
    await simulatedSupabase.from('concierge_requests').insert({
      userId: user.id,
      title: `[Audio Mandate] ${recordedTitle}`,
      category: 'Tactical Protection',
      priority: 'Urgent',
      status: 'Received',
      submittedDate: 'Just now',
      assignedTo: user.assignedManager,
      notes: `Verbal mandate transcribed from encrypted audio log (${durFormatted}). Reviewing acoustic signature.`,
      estimatedCost: 'Retained Priority Protocol',
    });

    setIsRecording(false);
    setRecordingSeconds(0);
    setIsTransmitting(false);
    setShowRecorderModal(false);
    setRecordedSuccessToast(true);
    setTimeout(() => setRecordedSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Audio Briefing Vault Header */}
      <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E222D]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E2BA6B] px-2.5 py-0.5 bg-[#171B24] border border-[#2F3746]">
                Tactical Audio Log & Memos
              </span>
              <span className="text-[11px] font-mono text-[#8F98AA]">256-Bit Voice Encryption</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] font-light tracking-wide">
              Encrypted Voice Dossier
            </h1>
            <p className="text-xs sm:text-sm text-[#D4D8E2] font-light flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#E2BA6B]" /> Spoken operational briefs from Camilla Vance-Moreau, Julian Sterling & Dr. Helena Zhang
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRecorderModal(true)}
              className="px-5 py-3.5 bg-[#CFA85E] hover:bg-[#E2BA6B] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-lg whitespace-nowrap shrink-0"
            >
              <Mic className="w-4 h-4" /> Record Verbal Mandate
            </button>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {recordedSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 p-3.5 bg-[#14231E] border border-[#2B6049] text-emerald-300 text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verbal mandate encrypted, archived to the Private Office Vault, and flagged for priority triage with Camilla & Julian.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Player & Waveform Visualizer */}
      {activeMemo && (
        <div className="bg-[#0E1117] border border-[#232731] p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E222D]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 border border-[#8C6D32] text-[#DDB872] bg-[#141822]">
                  {activeMemo.classification}
                </span>
                <span className="text-[10px] font-mono text-[#7B8599]">{activeMemo.audioCategory}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] font-normal">{activeMemo.title}</h2>
              <p className="text-xs text-[#8A95A8] font-light mt-0.5">
                Speaker: <span className="text-[#CFA85E] font-medium">{activeMemo.speakerName}</span> ({activeMemo.speakerRole}) • Recorded {activeMemo.timestamp}
              </p>
            </div>

            <div className="flex items-center gap-2 text-right">
              <span className="font-mono text-sm text-[#DDB872] tabular-nums">
                {currentTimeFormatted} / {activeMemo.durationFormatted}
              </span>
            </div>
          </div>

          {/* Interactive Visualizer Canvas / Animated Waveform */}
          <div className="bg-[#090C12] border border-[#1E2432] p-6 flex flex-col items-center justify-center space-y-5">
            <div className="w-full flex items-center justify-between gap-1 sm:gap-2 h-20 px-2 sm:px-6">
              {activeMemo.waveformHeights.map((h, i) => {
                const isPassed = (i / activeMemo.waveformHeights.length) * 100 <= playbackProgress;
                return (
                  <motion.div
                    key={i}
                    style={{ height: `${Math.max(14, h * 0.72)}px`, transformOrigin: 'center' }}
                    animate={{
                      scaleY: isPlaying ? [0.55, 1.15, 0.7] : 0.75,
                    }}
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: 0.8 + (i % 5) * 0.15,
                      ease: 'easeInOut',
                    }}
                    className={`w-full max-w-[8px] rounded-xs transition-colors duration-200 ${
                      isPassed
                        ? 'bg-[#CFA85E]'
                        : isPlaying
                        ? 'bg-[#4A3D24]'
                        : 'bg-[#222938]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Scrubber Bar */}
            <div className="w-full relative">
              <div className="w-full h-1.5 bg-[#171D28] overflow-hidden">
                <div
                  style={{ width: `${playbackProgress}%` }}
                  className="h-full bg-[#CFA85E] transition-all duration-300"
                />
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <button
                onClick={togglePlay}
                className="px-7 py-3.5 bg-[#CFA85E] hover:bg-[#E2BA6B] text-[#090B0E] flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-105 font-mono text-xs uppercase tracking-widest font-semibold"
                aria-label={isPlaying ? 'Pause briefing memo' : 'Play briefing memo'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Briefing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Decrypt & Play</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verbatim Transcript */}
          <div className="bg-[#12161F] border border-[#202636] p-4 sm:p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#D4D8E2] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#E2BA6B]" /> Verbatim Transcript
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDownloadTranscript(activeMemo)}
                  className="text-[10px] font-mono text-[#D4D8E2] hover:text-[#E2BA6B] flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3" /> Export .txt
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyTranscript(activeMemo.transcript)}
                  className="text-[10px] font-mono text-[#E2BA6B] hover:underline flex items-center gap-1"
                >
                  {copiedTranscript ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Text
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF7F0] font-light leading-relaxed">
              &ldquo;{activeMemo.transcript}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Briefings Archive Playlist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E222D]">
          <div>
            <h2 className="font-serif text-xl text-[#F4F1EA] font-light">Spoken Briefing Archive</h2>
            <p className="text-xs text-[#8A95A8] font-light mt-0.5">
              Select any memo to inspect acoustic waveform and decrypt audio briefing.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-[#7D879C]">Vault Capacity: Unlimited</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memos.map((memo) => {
            const isSelected = activeMemo?.id === memo.id;
            return (
              <button
                key={memo.id}
                type="button"
                onClick={() => selectMemo(memo)}
                className={`text-left p-5 transition-all duration-200 border flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-[#151922] border-[#CFA85E]/60 shadow-md'
                    : 'bg-[#0E1117] border-[#202530] hover:border-[#354054] hover:bg-[#12161F]'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-[#CFA85E] block">
                      {memo.speakerName} • {memo.speakerRole}
                    </span>
                    <h3 className="font-serif text-base text-[#F4F1EA] font-normal mt-0.5">{memo.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#DDB872] px-2 py-0.5 bg-[#171C26] border border-[#2B3547]">
                    {memo.durationFormatted}
                  </span>
                </div>

                <p className="text-xs text-[#8893A7] line-clamp-2 font-light">"{memo.transcript}"</p>

                <div className="flex items-center justify-between pt-2 border-t border-[#1C222E] w-full text-[10px] font-mono text-[#6A7488]">
                  <span>{memo.timestamp}</span>
                  <span className="flex items-center gap-1 text-[#CFA85E]">
                    {isSelected && isPlaying ? 'Playing Audio...' : 'Listen Now'} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Record Verbal Mandate Modal */}
      <AnimatePresence>
        {showRecorderModal && (
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
                    Sovereign Audio Dictation
                  </span>
                  <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">Record Verbal Mandate</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRecording(false);
                    setShowRecorderModal(false);
                  }}
                  className="text-neutral-500 hover:text-neutral-300 text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1.5">
                    Directive Subject / Title
                  </label>
                  <input
                    type="text"
                    value={recordedTitle}
                    onChange={(e) => setRecordedTitle(e.target.value)}
                    placeholder="e.g. Tarmac luggage briefing for Farnborough"
                    className="w-full px-3.5 py-2.5 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-[0.12em] text-[#8E98AC] mb-1.5">
                    Operational Classification
                  </label>
                  <select
                    value={recordedCategory}
                    onChange={(e) => setRecordedCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#131722] border border-[#262D3C] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  >
                    <option value="Personal Briefing">Personal Briefing</option>
                    <option value="Flight Telemetry">Flight Telemetry & Aviation</option>
                    <option value="Security Escort">Security Escort & Fleet</option>
                    <option value="Residency Staging">Residency Staging & Estates</option>
                  </select>
                </div>

                {/* Recorder Visualizer Box */}
                <div className="bg-[#090C12] border border-[#1E2432] p-6 text-center space-y-4">
                  {isRecording ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-rose-400 font-mono text-sm tracking-widest uppercase tabular-nums">
                        <motion.span
                          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-2.5 h-2.5 bg-rose-500 rotate-45"
                        />
                        RECORDING ENCRYPTED AUDIO · 00:
                        {recordingSeconds.toString().padStart(2, '0')}
                      </div>

                      <div className="flex items-center justify-center gap-1.5 h-12">
                        {[15, 30, 50, 80, 95, 70, 45, 85, 60, 40, 75, 90, 65, 35, 20].map((h, idx) => (
                          <motion.div
                            key={idx}
                            style={{ height: `${Math.max(14, h * 0.45)}px`, transformOrigin: 'center' }}
                            animate={{ scaleY: [0.5, 1.15, 0.6] }}
                            transition={{ repeat: Infinity, duration: 0.5 + (idx % 3) * 0.2, ease: 'easeInOut' }}
                            className="w-1.5 bg-rose-500/80 rounded-xs"
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleStopRecording}
                        className="px-5 py-2 bg-[#2D1618] hover:bg-[#3D1E22] text-rose-300 border border-[#6B2428] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 mx-auto"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" /> Stop Dictation
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-[#8A95A8] font-light">
                        Speak directly into your microphone. Audio is encoded locally with 256-bit encryption before transmission.
                      </p>

                      <button
                        onClick={handleStartRecording}
                        className="px-6 py-3 bg-[#CFA85E] hover:bg-[#DBC17D] text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mx-auto shadow-md"
                      >
                        <Mic className="w-4 h-4" /> Start Dictation
                      </button>

                      {recordingSeconds > 0 && (
                        <p className="text-[11px] font-mono text-emerald-400">
                          Captured {recordingSeconds}s of verbal instructions. Ready for dispatch.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#202633]">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecording(false);
                    setRecordingSeconds(0);
                    setShowRecorderModal(false);
                  }}
                  className="px-4 py-2 text-xs font-mono text-[#8C96A8]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={recordingSeconds < 2 || isTransmitting}
                  onClick={handleTransmitRecording}
                  className="px-6 py-2.5 bg-[#CFA85E] hover:bg-[#DBC17D] disabled:opacity-40 text-[#090B0E] font-serif text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isTransmitting ? 'Encrypting & Dispatching...' : 'Transmit to Private Office'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
