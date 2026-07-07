import React from 'react'
import RetyredLogo from './RetyredLogo'
import { DEEP_BLACK, ORANGE, WHITE, GREY_TEXT, ADDRESS_L1, ADDRESS_L2, PHONE_DISPLAY, PHONE_TEL } from './tokens'

export default function Footer() {
  return (
    <footer style={{ background: DEEP_BLACK, borderTop: `1px solid ${ORANGE}` }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '48px 24px 32px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 40, alignItems: 'start',
      }}>
        <div>
          <RetyredLogo size="sm" animate={false} />
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: GREY_TEXT, marginTop: 16, lineHeight: 1.6 }}>
            {ADDRESS_L1}<br />{ADDRESS_L2}
          </p>
          <a href={PHONE_TEL} style={{ display: 'block', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: ORANGE, marginTop: 12 }}>
            {PHONE_DISPLAY}
          </a>
        </div>
        <div style={{ textAlign: 'right' }}>
          <a href="https://pjmjstudios.co.uk" target="_blank" rel="noopener noreferrer"
             style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: ORANGE }}>
            Website by PJMJ Studios
          </a>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid #1A1A1A',
        padding: '16px 24px',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: GREY_TEXT }}>
          &copy; 2025 RE&gt;TYRED. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
