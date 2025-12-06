import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { Prize } from '../types';

interface RouletteWheelProps {
  prizes: Prize[];
  rotation: number;
  isSpinning: boolean;
  size?: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ 
  prizes, 
  rotation, 
  isSpinning,
  size = 320 
}) => {
  const radius = size / 2;
  
  // Create D3 arc generator
  const arcGenerator = useMemo(() => {
    return d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(25); // Slightly larger inner hole
  }, [radius]);

  // Create pie generator (equal slices)
  const pieGenerator = useMemo(() => {
    return d3.pie<Prize>()
      .sort(null)
      .value(() => 1);
  }, []);

  const arcs = pieGenerator(prizes);

  return (
    <div className="relative flex justify-center items-center overflow-visible">
      {/* Pointer/Indicator - Static - Styled White/Gold */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
        <svg width="46" height="56" viewBox="0 0 40 50">
           <path d="M20 50 L0 0 L40 0 Z" fill="#ffffff" stroke="#84cc16" strokeWidth="2" />
        </svg>
      </div>

      {/* The Wheel - Rotates */}
      <div 
        style={{ 
          width: size, 
          height: size,
          transform: `rotate(-${rotation}deg)`,
          transition: isSpinning ? `transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none'
        }}
        className="rounded-full shadow-2xl shadow-black/50 border-[6px] border-[#0a1f13]"
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {arcs.map((arc, i) => {
              const arcPath = arcGenerator(arc as any);
              const [centroidX, centroidY] = arcGenerator.centroid(arc as any);
              const angle = (arc.startAngle + arc.endAngle) / 2 * (180 / Math.PI);

              return (
                <g key={prizes[i].id}>
                  {/* Slice Background */}
                  <path 
                    d={arcPath || ''} 
                    fill={prizes[i].color}
                    stroke="#022c22" // Dark green stroke separator
                    strokeWidth="3"
                  />
                  
                  {/* Text Label */}
                  <g transform={`translate(${centroidX}, ${centroidY}) rotate(${angle - 90})`}>
                    <text
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill={prizes[i].textColor}
                      fontSize="12"
                      fontWeight="900" // Heavier font like flyer
                      className="uppercase font-display tracking-wide"
                      style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' }}
                    >
                       {prizes[i].label.split(' ').slice(0, 2).join(' ')}
                    </text>
                    <text
                      y="14"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill={prizes[i].textColor}
                      fontSize="11"
                      fontWeight="700"
                      className="uppercase font-display tracking-wide"
                       style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' }}
                    >
                       {prizes[i].label.split(' ').slice(2).join(' ')}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      
      {/* Center Decor - Dark with Gold/Lime ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#022c22] rounded-full border-4 border-lime-500 flex items-center justify-center z-10 shadow-xl">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-400 to-white opacity-80 animate-pulse"></div>
      </div>
    </div>
  );
};

export default RouletteWheel;