import React from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FadeUp from '../components/FadeUp'
import {
  ORANGE, CHARCOAL, DEEP_BLACK, CREAM, WHITE, GREY_TEXT, GREY_LIGHT,
  PHONE_DISPLAY, PHONE_TEL,
  display, numeral, body, label, EASE, EASE_SHARP, angleCut,
} from '../components/tokens'

const areas = [
  'Ditchling', 'Burgess Hill', 'Brighton', 'Crawley',
  'Worthing', 'Lewes', 'Haywards Heath', 'Hove',
  'Shoreham', 'Lancing', 'Henfield', 'Hurstpierpoint',
  'Hassocks', 'Wivelsfield', 'Plumpton', 'Cuckfield',
  'Lindfield', 'Ansty', 'Sayers Common', 'Albourne',
]

export default function MobileFitting() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section style={{
          background: CHARCOAL,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 80, paddingLeft: 24, paddingRight: 24,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          ...angleCut('down'),
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(240,114,18,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', overflow: 'hidden',
          }}>
            <motion.svg
              width="100vw" viewBox="0 0 65 110" preserveAspectRatio="xMidYMid meet"
              style={{ maxHeight: '75vh' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 2, ease: EASE }}
            >
              <polygon points="5,5 95,60 5,115" fill="rgba(255,255,255,0.05)" />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: `1.5px solid ${ORANGE}`, padding: '8px 16px', marginBottom: 28,
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: ORANGE, flexShrink: 0 }}
            />
            <span style={{ ...label(12, ORANGE) }}>Same Day Callout Available</span>
          </motion.div>

          <div style={{ position: 'relative', maxWidth: 800 }}>
            {[
              { text: 'We Come', color: WHITE, delay: 0 },
              { text: 'To You', color: ORANGE, delay: 0.15 },
            ].map(({ text, color, delay }) => (
              <motion.div
                key={text}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay, duration: 0.6, ease: EASE_SHARP }}
                style={{ ...display(clamp(60, 10, 120), color) }}
              >
                {text}
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ ...body(17, '#CCCCCC'), marginTop: 24, marginBottom: 36 }}
            >
              Emergency and same day mobile tyre fitting across Sussex.
            </motion.p>

            <motion.a
              href={PHONE_TEL}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.04, background: '#E06308' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                background: ORANGE, color: WHITE,
                padding: '18px 36px',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700, fontSize: 16,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              CALL NOW {PHONE_DISPLAY}
            </motion.a>
          </div>
        </section>

        {/* Coverage */}
        <section style={{
          background: CREAM, position: 'relative',
          paddingTop: 80 + 56, paddingLeft: 24, paddingRight: 24,
          ...angleCut('up'),
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <FadeUp>
              <h2 style={{ ...display(clamp(32, 5, 60), DEEP_BLACK), marginBottom: 12 }}>
                Where We Cover
              </h2>
              <p style={{ ...body(15, GREY_TEXT), marginBottom: 48 }}>
                Fast callout coverage across West &amp; East Sussex
              </p>
            </FadeUp>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
              {areas.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                  whileHover={{ background: ORANGE, color: WHITE, borderColor: ORANGE }}
                  style={{
                    padding: '10px 20px',
                    border: `1.5px solid ${ORANGE}`,
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700, fontSize: 13,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: DEEP_BLACK, cursor: 'default',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {area}
                </motion.div>
              ))}
            </div>

            <FadeUp>
              <p style={{ ...body(14, GREY_TEXT), fontStyle: 'italic', marginBottom: 12 }}>
                ...and all surrounding areas across West &amp; East Sussex
              </p>
              <p style={{ ...body(15, DEEP_BLACK, 600) }}>
                Not sure if we cover your area? Just call{' '}
                <a href={PHONE_TEL} style={{ color: ORANGE, fontWeight: 700 }}>{PHONE_DISPLAY}</a>
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Broken down CTA */}
        <section style={{
          background: ORANGE, textAlign: 'center', position: 'relative', overflow: 'hidden',
          paddingTop: 72 + 56, paddingLeft: 24, paddingRight: 24,
          ...angleCut('down'),
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(13,13,13,0.08) 0%, transparent 40%)',
          }} />
          <FadeUp style={{ position: 'relative' }}>
            <h2 style={{ ...display(clamp(48, 8, 92), WHITE), marginBottom: 16 }}>
              Broken Down?
            </h2>
            <p style={{ ...body(17, 'rgba(255,255,255,0.85)', 500), marginBottom: 32 }}>
              Don't wait. Call us now and we'll get to you.
            </p>
            <motion.a
              href={PHONE_TEL}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                ...numeral(clamp(40, 6, 72), WHITE),
                marginBottom: 32,
                textDecoration: 'none',
              }}
            >
              {PHONE_DISPLAY}
            </motion.a>
            <br />
            <motion.a
              href={PHONE_TEL}
              whileHover={{ background: '#222', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                background: DEEP_BLACK, color: WHITE,
                padding: '16px 36px',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700, fontSize: 14,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              TAP TO CALL
            </motion.a>
          </FadeUp>
        </section>

        {/* How it works */}
        <section style={{
          background: CHARCOAL, position: 'relative',
          paddingTop: 80 + 56, paddingLeft: 24, paddingRight: 24, paddingBottom: 80,
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <FadeUp style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 style={{ ...display(clamp(32, 5, 60), WHITE) }}>How It Works</h2>
            </FadeUp>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
              gap: 40,
            }} className="steps-grid">
              {[
                { num: '01', title: 'Call Us', text: `Ring ${PHONE_DISPLAY} and tell us your location and tyre size.` },
                { num: '02', title: 'We Come To You', text: "We'll give you an ETA and come to wherever you are." },
                { num: '03', title: 'Sorted', text: 'New or part worn tyre fitted on the spot. Back on the road fast.' },
              ].map((step, i) => (
                <FadeUp key={step.num} delay={i * 0.15}>
                  <div style={{ ...numeral(clamp(56, 8, 80), ORANGE), marginBottom: 12 }}>{step.num}</div>
                  <h3 style={{ ...display(clamp(20, 2.5, 26), WHITE), marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ ...body(15, GREY_TEXT), lineHeight: 1.7 }}>{step.text}</p>
                </FadeUp>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 767px) { .steps-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  )
}

function clamp(min: number, vw: number, max: number) {
  return `clamp(${min}px, ${vw}vw, ${max}px)` as unknown as number
}
