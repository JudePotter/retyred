import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import RetyredLogo from './RetyredLogo'
import { ORANGE, CHARCOAL, WHITE, DEEP_BLACK, PHONE_TEL, PHONE_DISPLAY } from './tokens'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isMobilePage = location.pathname === '/mobile-fitting'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const navLink: React.CSSProperties = {
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: WHITE,
    transition: 'color 0.2s',
    padding: '4px 0',
  }

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: DEEP_BLACK,
        borderBottom: scrolled ? `1px solid ${ORANGE}` : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.5)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>
          <Link to="/">
            <RetyredLogo size="sm" animate={false} />
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1, justifyContent: 'center' }}
               className="nav-desktop">
            {['Home', 'Services', 'About', 'Contact'].map(l => (
              <a
                key={l}
                href={l === 'Home' ? '/' : `/#${l.toLowerCase()}`}
                style={navLink}
                onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = WHITE)}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="nav-desktop">
            <Link to="/mobile-fitting">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: ORANGE,
                  color: WHITE,
                  border: 'none',
                  padding: '10px 18px',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <PulsingDot />
                CALLOUT
              </motion.button>
            </Link>

            <a href="/#contact">
              <motion.button
                whileHover={{ scale: 1.03, background: WHITE, color: DEEP_BLACK }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  color: WHITE,
                  border: `1.5px solid ${WHITE}`,
                  padding: '9px 18px',
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                GET A QUOTE
              </motion.button>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="nav-mobile"
            onClick={() => setOpen(o => !o)}
            style={{
              width: 42, height: 42,
              border: `1.5px solid ${ORANGE}`,
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 8,
              cursor: 'pointer',
            }}
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ display: 'block', width: 18, height: 2, background: ORANGE, transformOrigin: 'center' }} />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: 'block', width: 18, height: 2, background: ORANGE }} />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ display: 'block', width: 18, height: 2, background: ORANGE, transformOrigin: 'center' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden', background: DEEP_BLACK, borderTop: `1px solid #222` }}
            >
              <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Home', 'Services', 'About', 'Contact'].map(l => (
                  <a key={l} href={l === 'Home' ? '/' : `/#${l.toLowerCase()}`}
                     style={{ ...navLink, fontSize: 16, padding: '8px 0', borderBottom: '1px solid #222' }}>
                    {l}
                  </a>
                ))}
                <Link to="/mobile-fitting">
                  <button style={{
                    width: '100%', background: ORANGE, color: WHITE, border: 'none',
                    padding: '14px 20px', fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700, fontSize: 14, letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer', marginTop: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    <PulsingDot /> MOBILE FITTING CALLOUT
                  </button>
                </Link>
                <a href="/#contact" style={{ width: '100%' }}>
                  <button style={{
                    width: '100%', background: 'transparent', color: WHITE,
                    border: `1.5px solid ${WHITE}`, padding: '13px 20px',
                    fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                    fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    GET A QUOTE
                  </button>
                </a>
                <a href={PHONE_TEL} style={{ width: '100%' }}>
                  <button style={{
                    width: '100%', background: 'transparent', color: ORANGE,
                    border: `1.5px solid ${ORANGE}`, padding: '13px 20px',
                    fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                    fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    CALL {PHONE_DISPLAY}
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating callout FAB - mobile only, not on mobile-fitting page */}
      {!isMobilePage && (
        <Link to="/mobile-fitting" className="fab-callout">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 90,
              background: ORANGE, color: WHITE,
              padding: '14px 20px',
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700, fontSize: 13,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(240,114,18,0.4)',
            }}
          >
            <PulsingDot /> CALLOUT
          </motion.div>
        </Link>
      )}

      <style>{`
        @media (min-width: 900px) {
          .nav-mobile { display: none !important; }
          .fab-callout { display: none !important; }
        }
        @media (max-width: 899px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}

function PulsingDot() {
  return (
    <motion.span
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'inline-block', width: 7, height: 7,
        borderRadius: '50%', background: '#fff', flexShrink: 0,
      }}
    />
  )
}
