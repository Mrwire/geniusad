"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function FloatingPaths() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Paths qui formeront un "G" stylisé selon genius.md - plus grand et plus visible
  const gPaths = [
    // Arc principal du G - plus prononcé
    "M100,50 C150,20 230,20 280,50 C330,80 330,170 280,200 C230,230 150,230 100,200",
    // Ligne verticale du G - plus épaisse
    "M100,50 C80,90 80,160 100,200",
    // Petit trait horizontal du G - plus visible
    "M180,130 L280,130",
    // Arc supérieur du G - plus défini
    "M100,50 C150,30 230,30 280,50",
  ]

  // Paths additionnels pour l'animation - arcs "G" stroke blanc/silver
  const additionalPaths = [
    // Arcs plus subtils formant des parties du G
    "M50,30 Q150,-10 250,80 T400,60",
    "M300,10 Q350,80 250,180 T50,160",
    "M70,130 Q170,230 320,80 T470,100",
    "M250,0 Q150,130 350,160 T150,200",
    "M120,80 Q220,30 320,130 T420,30",
    // Lignes horizontales et verticales pour un effet de grille
    "M10,60 H490",
    "M10,150 H490",
    "M70,15 V235",
    "M430,15 V235",
  ]

  const allPaths = [...gPaths, ...additionalPaths]

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 500 250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dégradés Silver selon genius.md */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(217, 217, 217, 0.35)" /> {/* #D9D9D9 Silver */}
            <stop offset="100%" stopColor="rgba(217, 217, 217, 0.25)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(217, 217, 217, 0.18)" />
            <stop offset="100%" stopColor="rgba(217, 217, 217, 0.08)" />
          </linearGradient>
          <linearGradient id="gradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(217, 217, 217, 0.2)" />
            <stop offset="100%" stopColor="rgba(217, 217, 217, 0.1)" />
          </linearGradient>
        </defs>
        <g>
          {allPaths.map((path, index) => {
            // Les 4 premiers chemins (ceux qui forment le G) utilisent une couleur plus vive
            const isGPath = index < 4
            const gradient = isGPath ? "url(#gradient1)" : ["url(#gradient2)", "url(#gradient3)"][index % 2]
            const strokeOpacity = isGPath ? "0.9" : "0.2"
            const strokeWidth = isGPath ? "2.5" : "1.2"
            
            return (
              <motion.path
                key={index}
                d={path}
                stroke={gradient}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  // Animation plus prononcée pour les chemins du G selon le design souhaité
                  y: isGPath ? [0, -10, 0] : [0, 6, 0],
                  x: isGPath ? [0, index % 2 === 0 ? 7 : -7, 0] : [0, index % 2 === 0 ? -4 : 4, 0],
                }}
                transition={{
                  pathLength: { 
                    duration: isGPath ? 3 : 2, 
                    ease: "easeInOut",
                    delay: isGPath ? 0.2 : 0.5 + (index * 0.2) % 1.5
                  },
                  opacity: { duration: 1, ease: "easeInOut" },
                  y: {
                    duration: isGPath ? 4 : 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }
                }}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default FloatingPaths
