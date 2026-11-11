import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plane,
  Navigation,
  Compass,
  Wind,
  Shield,
  Clock,
  MapPin,
  Radio,
  Eye,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface FlightRadarViewerProps {
  onClose?: () => void;
  isEmbedded?: boolean;
}

interface AircraftProfile {
  id: string;
  tail: string;
  type: string;
  code: string;
  route: string;
  sector: string;
  transponder: string;
  depCode: string;
  arrCode: string;
  midLabel: string;
  altitude: number;
  flLabel: string;
  groundSpeed: number;
  mach: string;
  outsideTemp: number;
  headwind: string;
  bearing: string;
  elapsed: number;
  remaining: number;
  departedAt: string;
  etaAt: string;
  headingLabel: string;
  progress: number;
}

const FLEET_PROFILES: AircraftProfile[] = [
  {
    id: 'gtglc',
    tail: 'G-TGLC',
    type: 'Bombardier Global 7500',
    code: 'GL7T',
    route: 'RAF Northolt (EGWU) ➔ Florence Peretola (LIRQ)',
    sector: 'Cruising over Alpine Sector',
    transponder: '4421 Active',
    depCode: 'EGWU (DEP)',
    arrCode: 'LIRQ (ARR)',
    midLabel: 'ALPS / WAYPOINT LULUS',
    altitude: 43000,
    flLabel: 'FL430 Level',
    groundSpeed: 512,
    mach: '0.88',
    outsideTemp: -52,
    headwind: '+38 kts',
    bearing: 'Bearing 310°',
    elapsed: 42,
    remaining: 48,
    departedAt: 'Departed 09:30',
    etaAt: '11:00 GMT / 12:00 CET',
    headingLabel: 'FL430 · 512 KTS · HDG 138°',
    progress: 0.52,
  },
  {
    id: '9hvjo',
    tail: '9H-VJO',
    type: 'Gulfstream G650ER',
    code: 'G650',
    route: 'Farnborough (EGLF) ➔ Geneva Cointrin (LSGG)',
    sector: 'Descending over Jura Basin',
    transponder: '5190 Active',
    depCode: 'EGLF (DEP)',
    arrCode: 'LSGG (ARR)',
    midLabel: 'TROYES / WAYPOINT SOSAL',
    altitude: 45000,
    flLabel: 'FL450 Level',
    groundSpeed: 524,
    mach: '0.90',
    outsideTemp: -56,
    headwind: '+24 kts',
    bearing: 'Bearing 144°',
    elapsed: 34,
    remaining: 26,
    departedAt: 'Departed 16:00',
    etaAt: '17:00 GMT / 18:00 CET',
    headingLabel: 'FL450 · 524 KTS · HDG 144°',
    progress: 0.68,
  },
  {
    id: 'hbjgl',
    tail: 'HB-JGL',
    type: 'Bombardier Challenger 650',
    code: 'CL60',
    route: 'Zurich Kloten (LSZH) ➔ Saanen Gstaad (LSGK)',
    sector: 'Visual Alpine Approach Corridor',
    transponder: '3204 Active',
    depCode: 'LSZH (DEP)',
    arrCode: 'LSGK (ARR)',
    midLabel: 'BERNESE OBERLAND',
    altitude: 31000,
    flLabel: 'FL310 Cruise',
    groundSpeed: 446,
    mach: '0.79',
    outsideTemp: -41,
    headwind: '+12 kts',
    bearing: 'Bearing 218°',
    elapsed: 18,
    remaining: 14,
    departedAt: 'Departed 10:15',
    etaAt: '10:47 CET',
    headingLabel: 'FL310 · 446 KTS · HDG 218°',
    progress: 0.61,
  },
];

export const FlightRadarViewer: React.FC<FlightRadarViewerProps> = ({ onClose, isEmbedded = false }) => {
  const [selectedId, setSelectedId] = useState<string>('gtglc');
  const active = FLEET_PROFILES.find((p) => p.id === selectedId) ?? FLEET_PROFILES[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Radar sweep animation on canvas keyed off active aircraft profile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Clear with dark obsidian background
      ctx.fillStyle = '#080B10';
      ctx.fillRect(0, 0, width, height);

      // Radar Concentric Circles
      ctx.strokeStyle = 'rgba(207, 168, 94, 0.15)';
      ctx.lineWidth = 1;

      for (let r = radius / 4; r <= radius; r += radius / 4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Range labels
      ctx.fillStyle = 'rgba(207, 168, 94, 0.45)';
      ctx.font = '9px monospace';
      ctx.fillText('100 NM', centerX + radius * 0.25 + 4, centerY - 4);
      ctx.fillText('200 NM', centerX + radius * 0.5 + 4, centerY - 4);
      ctx.fillText('300 NM', centerX + radius * 0.75 + 4, centerY - 4);
      ctx.fillText('400 NM', centerX + radius - 35, centerY - 4);

      // Flight Vector Corridor
      const startX = centerX - radius * 0.65;
      const startY = centerY - radius * 0.55;
      const endX = centerX + radius * 0.65;
      const endY = centerY + radius * 0.55;

      // Dashed corridor line
      ctx.strokeStyle = 'rgba(207, 168, 94, 0.45)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current Aircraft Position
      const curX = startX + (endX - startX) * active.progress;
      const curY = startY + (endY - startY) * active.progress;

      // Radar sweep beam
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + 0.35);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(207, 168, 94, 0.25)');
      gradient.addColorStop(1, 'rgba(207, 168, 94, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Waypoint 1: Departure
      ctx.fillStyle = '#CFA85E';
      ctx.beginPath();
      ctx.arc(startX, startY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '10px monospace';
      ctx.fillText(active.depCode, startX - 25, startY - 8);

      // Waypoint 2: Mid-Corridor
      const midX = startX + (endX - startX) * 0.5;
      const midY = startY + (endY - startY) * 0.5;
      ctx.fillStyle = 'rgba(139, 168, 136, 0.85)';
      ctx.beginPath();
      ctx.arc(midX - 15, midY - 15, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8BA888';
      ctx.font = '9px monospace';
      ctx.fillText(active.midLabel, midX - 60, midY - 22);

      // Waypoint 3: Arrival
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(endX, endY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '10px monospace';
      ctx.fillText(active.arrCode, endX + 8, endY + 4);

      // Aircraft Marker
      ctx.fillStyle = '#F4F1EA';
      ctx.shadowColor = '#CFA85E';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(curX, curY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sweep echo ring around aircraft
      const echoRadius = 5 + ((angle * 6) % 15);
      ctx.strokeStyle = 'rgba(207, 168, 94, 0.6)';
      ctx.beginPath();
      ctx.arc(curX, curY, echoRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Aircraft Label
      ctx.fillStyle = '#E2BA6B';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${active.tail} (${active.code})`, curX + 10, curY - 6);
      ctx.fillStyle = '#B5BCCB';
      ctx.font = '9px monospace';
      ctx.fillText(active.headingLabel, curX + 10, curY + 6);

      angle += 0.025;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  return (
    <div className={`bg-[#0A0D13] border border-[#202636] p-4 sm:p-6 space-y-5 ${isEmbedded ? '' : 'shadow-2xl'}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1E2432]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/50">
              Live ADS-B Telemetry
            </span>
            <span className="text-[10px] font-mono text-[#8E98AB]">Transponder: {active.transponder}</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F0] font-normal">
            {active.tail} · {active.type} Air Corridor
          </h3>
          <p className="text-xs text-[#D4D8E2] font-light mt-0.5">
            Routing: {active.route} · {active.sector}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {FLEET_PROFILES.map((item) => {
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`px-3 py-1.5 text-[11px] font-mono border transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#19202D] text-[#E2BA6B] border-[#E2BA6B]'
                    : 'bg-[#11151E] text-[#B5BCCB] border-[#242B3A] hover:border-[#8B672B] hover:text-[#FAF7F0]'
                }`}
              >
                {item.tail}
              </button>
            );
          })}

          {onClose && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-[#FAF7F0] font-mono text-xs ml-2 px-2 py-1 border border-[#242B3A]"
            >
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* Canvas Radar Viewport */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[360px] bg-[#080B10] border border-[#1A202D] overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={380}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur-xs px-2.5 py-1 border border-[#212A3A] text-[10px] font-mono text-[#E2BA6B] flex items-center gap-1.5 tabular-nums">
          <Radio className="w-3 h-3 text-emerald-400" />
          SWEEP 120 RPM · RANGE 400 NM · {active.tail}
        </div>
      </div>

      {/* Flight Telemetry KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Cruising Altitude</span>
          <span className="text-base font-serif text-[#FAF7F0] font-medium block mt-0.5 tabular-nums">
            {active.altitude.toLocaleString()} <span className="text-[10px] font-mono text-[#8E98AB]">ft</span>
          </span>
          <span className="text-[9px] font-mono text-emerald-400">{active.flLabel}</span>
        </div>

        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Ground Speed</span>
          <span className="text-base font-serif text-[#E2BA6B] font-medium block mt-0.5 tabular-nums">
            {active.groundSpeed} <span className="text-[10px] font-mono text-[#8E98AB]">kts</span>
          </span>
          <span className="text-[9px] font-mono text-[#A3B8CC]">Mach {active.mach}</span>
        </div>

        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Outside Air Temp</span>
          <span className="text-base font-serif text-[#FAF7F0] font-medium block mt-0.5 tabular-nums">
            {active.outsideTemp}°C
          </span>
          <span className="text-[9px] font-mono text-[#8E98AB]">Tropopause</span>
        </div>

        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Wind Vector</span>
          <span className="text-base font-serif text-[#FAF7F0] font-medium block mt-0.5 flex items-center gap-1 tabular-nums">
            <Wind className="w-3 h-3 text-sky-400" /> {active.headwind}
          </span>
          <span className="text-[9px] font-mono text-[#8E98AB]">{active.bearing}</span>
        </div>

        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Elapsed Flight</span>
          <span className="text-base font-serif text-[#FAF7F0] font-medium block mt-0.5 tabular-nums">
            {active.elapsed}m
          </span>
          <span className="text-[9px] font-mono text-[#8E98AB]">{active.departedAt}</span>
        </div>

        <div className="p-3 bg-[#11151E] border border-[#1E2432]">
          <span className="text-[9px] font-mono uppercase text-[#8E98AB] block">Estimated Arrival</span>
          <span className="text-base font-serif text-emerald-400 font-medium block mt-0.5 tabular-nums">
            {active.remaining}m remaining
          </span>
          <span className="text-[9px] font-mono text-emerald-500">{active.etaAt}</span>
        </div>
      </div>
    </div>
  );
};
