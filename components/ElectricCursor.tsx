"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
  paths: string[];
}

export default function ElectricCursor() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Generate 6 random jagged lightning paths shooting out from click coordinates
      const paths: string[] = [];
      const numLines = 6;
      for (let i = 0; i < numLines; i++) {
        const baseAngle = (i * 360) / numLines;
        const angle = (baseAngle + Math.random() * 30 - 15) * (Math.PI / 180);
        const length = 40 + Math.random() * 30; // length of bolt
        
        // Build a jagged path with 4 segments
        let path = "M 0 0";
        let curX = 0;
        let curY = 0;
        const steps = 4;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const targetX = Math.cos(angle) * length * t;
          const targetY = Math.sin(angle) * length * t;
          // Add perpendicular offset for jagged zigzag shape
          const offsetAmount = (Math.random() * 8 - 4) * (1 - t * 0.5);
          const perpAngle = angle + Math.PI / 2;
          const offsetX = Math.cos(perpAngle) * offsetAmount;
          const perpY = Math.sin(perpAngle) * offsetAmount;
          
          curX = targetX + offsetX;
          curY = targetY + perpY;
          path += ` L ${curX.toFixed(1)} ${curY.toFixed(1)}`;
        }
        paths.push(path);
      }

      const newSpark = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        paths,
      };
      setSparks((prev) => [...prev, newSpark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 400);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute"
            style={{ left: spark.x, top: spark.y }}
          >
            {/* Rapidly expanding ripple */}
            <motion.div
              initial={{ scale: 0.1, opacity: 1, borderWidth: "2px" }}
              animate={{ scale: 2.5, opacity: 0, borderWidth: "1px" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#C8F400] blur-[0.5px]"
            />
            {/* Center spark core */}
            <motion.div
              initial={{ scale: 1.5, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_#C8F400]"
            />

            {/* Jagged Bolts */}
            <svg className="absolute overflow-visible -translate-x-1/2 -translate-y-1/2 w-0 h-0">
              {spark.paths.map((d, index) => (
                <motion.path
                  key={index}
                  d={d}
                  fill="none"
                  stroke="#C8F400"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: "drop-shadow(0px 0px 4px rgba(200, 244, 0, 0.95))"
                  }}
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ 
                    pathLength: [0, 1, 1], 
                    opacity: [1, 1, 0],
                  }}
                  transition={{ 
                    duration: 0.35,
                    ease: "easeOut",
                    times: [0, 0.4, 1]
                  }}
                />
              ))}
              {/* Secondary white hot core lines to make it look realistic */}
              {spark.paths.map((d, index) => (
                <motion.path
                  key={`white-${index}`}
                  d={d}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ 
                    pathLength: [0, 1, 1], 
                    opacity: [1, 1, 0],
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut",
                    times: [0, 0.3, 1]
                  }}
                />
              ))}
            </svg>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
