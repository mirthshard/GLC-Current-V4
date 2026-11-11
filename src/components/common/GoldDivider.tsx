import React from 'react';
import { motion } from 'motion/react';

interface GoldDividerProps {
  className?: string;
  withDiamond?: boolean;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = 'my-5 sm:my-7', withDiamond = true }) => {
  return (
    <div className={`relative w-full max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-center ${className}`}>
      <motion.div
        initial={{ scaleX: 0.35, opacity: 0.55 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.01 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#B98633]/55 to-transparent origin-center"
      />
      {withDiamond && (
        <motion.div
          initial={{ scale: 0.6, rotate: 0, opacity: 0.7 }}
          whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="absolute w-2.5 h-2.5 border border-[#C4933F] bg-[#08090C] shadow-[0_0_12px_rgba(185,134,51,0.45)]"
        />
      )}
    </div>
  );
};
