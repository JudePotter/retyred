import React from 'react'
import { motion } from 'framer-motion'
import { ORANGE, WHITE, DEEP_BLACK } from './tokens'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ghost?: boolean
  animate?: boolean
}

const sizes = { sm: 28, md: 40, lg: 60, xl: 90 }

export default function RetyredLogo({
  variant = 'dark',
  size = 'md',
  ghost = false,
  animate = true,
}: LogoProps) {
  const fs = sizes[size]
  const textColor = ghost ? `rgba(255,255,255,0.08)` : WHITE
  const chevronColor = ghost ? `rgba(255,255,255,0.08)` : ORANGE
  const chevH = fs * 0.55
  const chevW = chevH * 0.65

  const slide = animate
    ? { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    : {}
  const slideR = animate
    ? { initial: { x: 20, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    : {}
  const spring = animate
    ? { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 } }
    : {}

  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: fs * 0.12, cursor: 'default', userSelect: 'none' }}
      whileHover={animate ? { scale: 1.01 } : {}}
    >
      <motion.span
        {...slide}
        transition={{ duration: 0.5, ease: [0.25,0.1,0.25,1] }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: fs,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: textColor,
        }}
      >
        RE
      </motion.span>

      <motion.div
        {...spring}
        transition={{ delay: animate ? 0.5 : 0, type: 'spring', stiffness: 400, damping: 18 }}
        whileHover={animate ? { scale: [1, 1.15, 1], transition: { duration: 0.4 } } : {}}
        style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
      >
        <svg
          width={chevW}
          height={chevH}
          viewBox="0 0 65 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="5,5 95,60 5,115" fill={chevronColor} />
        </svg>
      </motion.div>

      <motion.span
        {...slideR}
        transition={{ delay: animate ? 0.8 : 0, duration: 0.5, ease: [0.25,0.1,0.25,1] }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: fs,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: textColor,
        }}
      >
        TYRED
      </motion.span>
    </motion.div>
  )
}
