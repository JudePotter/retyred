export const ORANGE       = '#F07212'
export const ORANGE_DARK  = '#C85A08'
export const ORANGE_TINT  = '#FEF1E5'
export const CHARCOAL     = '#3A3A3A'
export const DEEP_BLACK   = '#0D0D0D'
export const CREAM        = '#FBF7F1'
export const WHITE        = '#FFFFFF'
export const GREY_TEXT    = '#888888'
export const GREY_LIGHT   = '#E4DCD0'
export const GREEN        = '#2E7D52'

export const PHONE_DISPLAY = '07436 454547'
export const PHONE_TEL     = 'tel:07436454547'
export const EMAIL         = 'info@retyred.co.uk'
export const ADDRESS_L1    = 'SM Tidy Estate, Ditchling Road'
export const ADDRESS_L2    = 'Burgess Hill, BN6 8SG'

export const EASE: [number,number,number,number] = [0.25, 0.1, 0.25, 1]
export const EASE_SHARP: [number,number,number,number] = [0.65, 0, 0.15, 1]

/* Headlines - Barlow Condensed 900, bold uppercase */
export const display = (size: number, color = WHITE): React.CSSProperties => ({
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  fontSize: size,
  lineHeight: 0.92,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase' as const,
  color,
})

/* Small tracked labels - replaces uppercase display() for secondary tags */
export const label = (size: number, color = WHITE): React.CSSProperties => ({
  fontFamily: "'Barlow', sans-serif",
  fontWeight: 700,
  fontSize: size,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color,
})

/* Huge numerals - Barlow Condensed 900, tall and compressed */
export const numeral = (size: number, color = WHITE): React.CSSProperties => ({
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900,
  fontSize: size,
  lineHeight: 0.85,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase' as const,
  color,
})

/* Diagonal section seams - replaces the old tread-strip dividers.
   'down' slopes the bottom-right corner down, 'up' slopes it back up.
   The negative bottom margin pulls the next section into the cut so there's no gap. */
export const ANGLE = 56
export function angleCut(direction: 'down' | 'up'): React.CSSProperties {
  return {
    clipPath: direction === 'down'
      ? `polygon(0 0, 100% 0, 100% calc(100% - ${ANGLE}px), 0 100%)`
      : `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${ANGLE}px))`,
    marginBottom: -ANGLE,
    paddingBottom: `calc(80px + ${ANGLE}px)`,
  }
}

export const body = (size = 16, color = WHITE, weight = 400): React.CSSProperties => ({
  fontFamily: "'Barlow', sans-serif",
  fontWeight: weight,
  fontSize: size,
  color,
  lineHeight: 1.6,
})

import React from 'react'
