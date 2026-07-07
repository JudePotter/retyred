import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FadeUp from '../components/FadeUp'
import {
  ORANGE, CHARCOAL, DEEP_BLACK, CREAM, WHITE, GREY_TEXT, GREY_LIGHT,
  PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS_L1, ADDRESS_L2,
  display, numeral, body, label, EASE, EASE_SHARP, angleCut,
} from '../components/tokens'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WhyRetyred />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/* ── HERO ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" style={{
      background: CHARCOAL,
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 80, paddingLeft: 24, paddingRight: 24,
      ...angleCut('down'),
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(240,114,18,0.08) 0%, transparent 70%)',
      }} />

      {/* Ghost chevron watermark - spans full viewport width */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 2, ease: EASE }}
          style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}
        >
          <svg
            width="100%"
            viewBox="0 0 65 110"
            preserveAspectRatio="xMidYMid meet"
            style={{ maxHeight: '80vh' }}
          >
            <polygon points="5,5 95,60 5,115" fill="rgba(255,255,255,0.05)" />
          </svg>
        </motion.div>
      </div>

      {/* Headline */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 900 }}>
        {[
          { text: "Ditchling's No.1", color: WHITE, delay: 0 },
          { text: 'Part Worn', color: ORANGE, delay: 0.15 },
          { text: 'Tyre Centre', color: WHITE, delay: 0.3 },
        ].map(({ text, color, delay }) => (
          <motion.div
            key={text}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.6, ease: EASE }}
            style={{
              ...display(clamp(64, 8, 130), color),
              display: 'block',
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <HeroBtn href="/#contact" variant="outline">ENQUIRE</HeroBtn>
          <HeroBtn href={PHONE_TEL} variant="solid">CALL {PHONE_DISPLAY}</HeroBtn>
          <HeroBtn href="/#services" variant="outline">VIEW SERVICES</HeroBtn>
        </motion.div>
      </div>
    </section>
  )
}

function HeroBtn({ href, variant, children }: { href: string; variant: 'solid' | 'outline'; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={variant === 'solid'
        ? { scale: 1.04, background: '#E06308' }
        : { scale: 1.04, background: 'rgba(255,255,255,0.1)' }
      }
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'inline-block',
        padding: '14px 28px',
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 700, fontSize: 14,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: WHITE,
        background: variant === 'solid' ? ORANGE : 'transparent',
        border: variant === 'solid' ? 'none' : `1.5px solid ${WHITE}`,
        cursor: 'pointer',
        transition: 'background 0.2s',
        textDecoration: 'none',
      }}
    >
      {children}
    </motion.a>
  )
}

/* ── STATS BAR ────────────────────────────────────────── */
const stats = [
  { num: '400+', label: '5-Star Reviews', google: true },
  { num: '10+', label: 'Years Trading' },
  { num: '7,000+', label: 'Tyres In Stock' },
  { num: 'SAME DAY', label: 'Fitting Available' },
]

function StatsBar() {
  return (
    <section style={{
      background: ORANGE, position: 'relative',
      paddingTop: 40 + 56, paddingLeft: 24, paddingRight: 24,
      ...angleCut('up'),
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
      }}>
        {stats.map((s, i) => (
          <CountStat key={s.label} {...s} delay={i * 0.1} divider={i < stats.length - 1} />
        ))}
      </div>
    </section>
  )
}

function CountStat({ num, label, google, delay, divider }: {
  num: string; label: string; google?: boolean; delay: number; divider: boolean
}) {
  const [displayed, setDisplayed] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const parsed = parseInt(num.replace(/\D/g, ''))
        if (isNaN(parsed)) { setDisplayed(num); return }
        const suffix = num.replace(/[\d,]/g, '')
        let start = 0
        const duration = 1200
        const step = (timestamp: number, startTime: number) => {
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setDisplayed(Math.floor(ease * parsed).toLocaleString() + suffix)
          if (progress < 1) requestAnimationFrame(ts => step(ts, startTime))
        }
        requestAnimationFrame(ts => step(ts, ts))
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [num])

  return (
    <div ref={ref} style={{
      textAlign: 'center', padding: '0 16px',
      borderRight: divider ? `1px solid rgba(255,255,255,0.3)` : 'none',
    }}>
      <div style={{ ...numeral(clamp(40, 5, 60), WHITE) }}>{displayed}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
        {google && <GoogleG size={16} />}
        <span style={{ ...body(13, WHITE, 600), letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
    </div>
  )
}

/* ── SERVICES ─────────────────────────────────────────── */
const services = [
  {
    title: 'Part Worn Tyres',
    body: 'Fully inspected and guaranteed.',
    detail: 'Every tyre passes a full tread, sidewall and structural check before it goes anywhere near your car. A fraction of the price of new, none of the risk.',
    cta: 'Enquire', href: '/#contact',
  },
  {
    title: 'New Tyres',
    body: 'Full range, fitted same day.',
    detail: 'All makes, all sizes, budget to premium. We stock over 7,000 tyres so the one you need is almost always already on the shelf.',
    cta: 'Enquire', href: '/#contact',
  },
  {
    title: 'Wheel Alignment',
    body: 'Laser precision tracking.',
    detail: 'Misaligned wheels wear tyres unevenly and pull fuel economy down. A ten minute check now saves a full replacement later.',
    cta: 'Enquire', href: '/#contact',
  },
  {
    title: 'Mobile Tyre Fitting',
    body: "Can't get to us? We'll come to you.",
    detail: 'Emergency and same day callouts across Sussex. Fully equipped van, fitted on the spot, no need to get the car anywhere near a garage.',
    cta: 'Book a Callout', href: '/mobile-fitting', featured: true,
  },
  {
    title: 'Brakes',
    body: 'Full inspection, pads and discs.',
    detail: 'Pads, discs and fluid checked and replaced by people who look at brakes all day. Booked in and back on the road, safe.',
    cta: 'Enquire', href: '/#contact',
  },
  {
    title: 'General Mechanical Work',
    body: 'Servicing and diagnostics.',
    detail: "Not sure what's wrong? Tell us what it's doing and we'll take a look. Honest diagnosis, no upsell.",
    cta: 'Enquire', href: '/#contact',
  },
]

const TILE_WIDTH = 300
const TILE_HEIGHT = 400
const TILE_GAP = 20

function Services() {
  const [selected, setSelected] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ isDown: false, startX: 0, scrollLeft: 0, dragged: false })

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    drag.current.isDown = true
    drag.current.dragged = false
    drag.current.startX = e.pageX
    drag.current.scrollLeft = el.scrollLeft
  }

  // Window-level listeners (not setPointerCapture) so the drag-scroll gesture
  // doesn't hijack click delivery to the tiles being dragged over.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current.isDown) return
      const el = trackRef.current
      if (!el) return
      const dx = e.pageX - drag.current.startX
      if (Math.abs(dx) > 5) drag.current.dragged = true
      el.scrollLeft = drag.current.scrollLeft - dx
    }
    const onUp = () => { drag.current.isDown = false }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <section id="services" style={{
      background: CREAM, position: 'relative',
      paddingTop: 80 + 56, paddingBottom: 24,
      ...angleCut('down'),
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <FadeUp>
          <p style={{ ...label(12, ORANGE), marginBottom: 12 }}>Our Services</p>
          <h2 style={{ ...display(clamp(36, 5, 68), DEEP_BLACK), marginBottom: 12 }}>
            Everything your tyres need
          </h2>
          <p style={{ ...body(15, GREY_TEXT), marginBottom: 40, maxWidth: 460 }}>
            Drag to scroll · Click a tile to learn more.
          </p>
        </FadeUp>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="services-track"
        style={{
          display: 'flex',
          gap: TILE_GAP,
          overflowX: 'auto',
          cursor: 'grab',
          padding: '4px 24px 24px',
          maxWidth: 1280,
          margin: '0 auto',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        {services.map((s, i) => (
          <ServiceTile
            key={s.title}
            {...s}
            index={i}
            isOpen={selected === i}
            onToggle={() => {
              if (drag.current.dragged) return
              setSelected(sel => sel === i ? null : i)
            }}
          />
        ))}
      </div>

      <style>{`
        .services-track { scrollbar-width: none; }
        .services-track::-webkit-scrollbar { display: none; }
        .services-track:active { cursor: grabbing; }
      `}</style>
    </section>
  )
}

function ServiceTile({ title, body: bodyText, detail, cta, href, index, isOpen, onToggle }: {
  title: string; body: string; detail: string; cta: string; href: string
  index: number; isOpen: boolean; onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const isRoute = href.startsWith('/mobile')
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      animate={{ width: isOpen ? TILE_WIDTH * 2 : TILE_WIDTH }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE, width: { duration: 0.5, ease: EASE_SHARP } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onToggle}
      style={{
        flex: `0 0 auto`,
        width: TILE_WIDTH,
        height: TILE_HEIGHT,
        perspective: 1600,
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.6, ease: EASE_SHARP }}
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front face */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: WHITE, borderTop: `2px solid ${ORANGE}`,
          padding: '20px 24px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          <span style={{
            fontFamily: "'Barlow', monospace", fontSize: 12, letterSpacing: '0.1em', color: GREY_TEXT,
          }}>
            {num}
          </span>
          <div style={{ flex: 1 }} />
          <h3 style={{ ...display(24, DEEP_BLACK), marginBottom: 8 }}>{title}</h3>
          <p style={{ ...body(15, GREY_TEXT, 400), lineHeight: 1.6, marginBottom: 20 }}>{bodyText}</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 12,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: ORANGE,
          }}>
            <motion.span animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.2 }}>
              Click To Expand
            </motion.span>
            <motion.span animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight size={12} color={ORANGE} />
            </motion.span>
          </div>
        </div>

        {/* Back face */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: CHARCOAL, borderTop: `2px solid ${ORANGE}`,
          padding: '20px 24px 24px',
          display: 'flex', flexDirection: 'column',
          overflow: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: "'Barlow', monospace", fontSize: 12, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)',
            }}>
              {num}
            </span>
            <span
              onClick={e => { e.stopPropagation(); onToggle() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 12,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: WHITE,
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', transform: 'rotate(180deg)' }}>
                <ChevronRight size={12} color={WHITE} />
              </span>
              Close
            </span>
          </div>
          <div style={{ flex: 1 }} />
          <h3 style={{ ...display(24, WHITE), marginBottom: 4 }}>{title}</h3>
          <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)', margin: '16px 0' }} />
          <p style={{ ...body(15, 'rgba(255,255,255,0.75)', 400), lineHeight: 1.7 }}>
            {detail}
          </p>
          {isRoute ? (
            <Link to={href} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
              <ServiceCtaBtn>{cta}</ServiceCtaBtn>
            </Link>
          ) : (
            <a href={href} style={{ textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
              <ServiceCtaBtn>{cta}</ServiceCtaBtn>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ServiceCtaBtn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, background: '#E06308' }}
      whileTap={{ scale: 0.98 }}
      style={{
        marginTop: 20,
        display: 'inline-flex',
        background: ORANGE, color: WHITE,
        padding: '13px 22px',
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 700, fontSize: 13,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      {children}
      <ChevronRight size={14} color={WHITE} />
    </motion.div>
  )
}

/* ── WHY RE>TYRED ─────────────────────────────────────── */
function WhyRetyred() {
  return (
    <section id="about" style={{
      background: CHARCOAL, position: 'relative', overflow: 'hidden',
      paddingTop: 80 + 56, paddingLeft: 24, paddingRight: 24,
      ...angleCut('up'),
    }}>
      {/* Graphic accents: glow + thin diagonal rules, replaces the old tread strip */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 85% 20%, rgba(240,114,18,0.10) 0%, transparent 65%)',
      }} />
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <line x1="0%" y1="0%" x2="8%" y2="100%" stroke="rgba(240,114,18,0.15)" strokeWidth="2" />
        <line x1="4%" y1="0%" x2="12%" y2="100%" stroke="rgba(240,114,18,0.08)" strokeWidth="1" />
      </svg>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        <WhyBlock
          eyebrow="Our Promise"
          heading={<>Inspected.<br />Guaranteed.<br />Yours.</>}
          copy="Every part worn tyre goes through a full inspection before it reaches you. Anything that doesn't meet our standard doesn't leave the yard."
          statValue="SAFE"
          statLabel="Every Time"
          reverse={false}
        />

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(240,114,18,0.3), transparent)', margin: '64px 0' }} />

        <WhyBlock
          eyebrow="Our History"
          heading={<>Family Run<br />Since Day One.</>}
          copy="Over a decade serving Burgess Hill and the surrounding area. You talk to the owner, not a call centre."
          statValue="10+"
          statLabel="Years Of Trust"
          reverse={true}
        />
      </div>
      <style>{`
        @media (max-width: 767px) { .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  )
}

function WhyBlock({ eyebrow, heading, copy, statValue, statLabel, reverse }: {
  eyebrow: string; heading: React.ReactNode; copy: string; statValue: string; statLabel: string; reverse: boolean
}) {
  const text = (
    <FadeUp>
      <p style={{ ...label(12, ORANGE), marginBottom: 16 }}>{eyebrow}</p>
      <h3 style={{ ...display(clamp(32, 4, 52), WHITE), marginBottom: 20 }}>{heading}</h3>
      <p style={{ ...body(16, '#AAAAAA', 400), lineHeight: 1.75, maxWidth: 480 }}>{copy}</p>
    </FadeUp>
  )

  const stat = (
    <FadeUp delay={0.2} style={{ textAlign: 'center', position: 'relative' }}>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_SHARP, delay: 0.15 }}
        style={{ ...numeral(clamp(90, 14, 180), reverse ? WHITE : ORANGE), position: 'relative', display: 'inline-block' }}
      >
        {statValue}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SHARP, delay: 0.5 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: -8, height: 4, background: ORANGE, transformOrigin: 'left' }}
        />
      </motion.div>
      <div style={{ ...label(14, reverse ? ORANGE : WHITE), marginTop: 20 }}>{statLabel}</div>
    </FadeUp>
  )

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 60, alignItems: 'center',
    }} className="why-grid">
      {reverse ? <>{stat}{text}</> : <>{text}{stat}</>}
    </div>
  )
}

/* ── REVIEWS ──────────────────────────────────────────── */
const reviews = [
  { text: "Mark sorted us out in under an hour. Half the price I expected and the tyres were in great condition.", author: "Sarah T." },
  { text: "Genuinely the cheapest tyres in Burgess Hill. Been coming here for years and the service is always spot on.", author: "James R." },
  { text: "Brilliant local business. Part worn tyres fully checked, fitted quickly, no fuss.", author: "Dave M." },
  { text: "Incredible value. Wouldn't go anywhere else for tyres in Sussex.", author: "Tom K." },
  { text: "Fast, friendly, honest. Mark really knows his stuff.", author: "Claire P." },
]

function Reviews() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setCurrent(c => (c + 1) % reviews.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const go = (i: number) => {
    setDir(i > current ? 1 : -1)
    setCurrent(i)
  }

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ]

  return (
    <section style={{
      background: CREAM, position: 'relative',
      paddingTop: 80 + 56, paddingLeft: 24, paddingRight: 24,
      ...angleCut('down'),
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ ...display(clamp(36, 5, 64), DEEP_BLACK), marginBottom: 12 }}>
            480+ Reasons To Visit
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <GoogleG size={20} />
            <span style={{ ...body(15, GREY_TEXT, 600) }}>Rated 4.9 on Google</span>
          </div>
        </FadeUp>

        {/* Desktop: 3 cards */}
        <div className="reviews-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {visible.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} {...r} delay={i * 0.1} />
          ))}
        </div>

        {/* Mobile: 1 card */}
        <div className="reviews-mobile" style={{ display: 'none' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ x: dir * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -dir * 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ReviewCard {...reviews[current]} delay={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === current ? 28 : 8, height: 8,
                background: i === current ? ORANGE : GREY_LIGHT,
                border: 'none', cursor: 'pointer',
                borderRadius: 4,
                transition: 'width 0.3s, background 0.3s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .reviews-desktop { display: none !important; }
          .reviews-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function ReviewCard({ text, author, delay }: { text: string; author: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        background: WHITE,
        border: `1px solid ${GREY_LIGHT}`,
        borderLeft: `4px solid ${ORANGE}`,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <GoogleG size={18} />
        <Stars />
      </div>
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        fontStyle: 'italic',
        fontSize: 15, color: GREY_TEXT,
        lineHeight: 1.7, flex: 1,
      }}>
        "{text}"
      </p>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, color: DEEP_BLACK }}>
        {author}
      </p>
    </motion.div>
  )
}

/* ── CONTACT ──────────────────────────────────────────── */
function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', tyreSize: '' })
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <section id="contact" style={{
      background: CHARCOAL, position: 'relative',
      paddingTop: 80 + 56, paddingLeft: 24, paddingRight: 24, paddingBottom: 80,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'start',
        position: 'relative',
      }} className="contact-grid">
        <FadeUp>
          <h2 style={{ ...display(clamp(36, 5, 64), WHITE), marginBottom: 8 }}>
            Come And See Us
          </h2>
          <p style={{ ...body(15, '#AAAAAA'), marginBottom: 32 }}>
            Find us on the road. No appointment needed.
          </p>

          <p style={{ ...body(14, '#AAAAAA'), marginBottom: 4 }}>{ADDRESS_L1}</p>
          <p style={{ ...body(14, '#AAAAAA'), marginBottom: 20 }}>{ADDRESS_L2}</p>

          <a href={PHONE_TEL}>
            <motion.div
              whileHover={{ color: '#FF8C30' }}
              style={{ ...numeral(clamp(26, 4, 38), ORANGE) }}
            >
              {PHONE_DISPLAY}
            </motion.div>
          </a>

          <p style={{ ...body(14, GREY_TEXT), marginTop: 8 }}>{EMAIL}</p>

          <div style={{ marginTop: 32 }}>
            {[
              { day: 'MON - FRI', hours: '8:30AM - 5:30PM' },
              { day: 'SAT', hours: '8:30AM - 1:30PM' },
              { day: 'SUN / BANK HOLS', hours: 'CLOSED' },
            ].map(row => (
              <div key={row.day} style={{
                display: 'flex', gap: 20, alignItems: 'center',
                borderBottom: `1px solid #444`,
                padding: '10px 0',
              }}>
                <span style={{ ...body(13, WHITE, 700), minWidth: 140, letterSpacing: '0.05em' }}>{row.day}</span>
                <span style={{ width: 1, height: 16, background: ORANGE, flexShrink: 0 }} />
                <span style={{ ...body(13, '#CCCCCC'), letterSpacing: '0.02em' }}>{row.hours}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <form
            onSubmit={e => {
              e.preventDefault()
              window.location.href = `mailto:${EMAIL}?subject=Website Enquiry from ${formData.name}&body=Name: ${formData.name}%0APhone: ${formData.phone}%0ATyre Size: ${formData.tyreSize}`
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {[
              { id: 'name', label: 'NAME', type: 'text' },
              { id: 'phone', label: 'PHONE', type: 'tel' },
              { id: 'email', label: 'EMAIL', type: 'email' },
              { id: 'tyreSize', label: 'TYRE SIZE (e.g. 205/55 R16)', type: 'text' },
            ].map(field => (
              <ContactField
                key={field.id}
                {...field}
                value={formData[field.id as keyof typeof formData]}
                onChange={v => setFormData(p => ({ ...p, [field.id]: v }))}
                focused={focused === field.id}
                onFocus={() => setFocused(field.id)}
                onBlur={() => setFocused(null)}
              />
            ))}

            <motion.button
              type="submit"
              whileHover={{ background: '#E06308', scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: ORANGE, color: WHITE, border: 'none',
                padding: '18px 24px',
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700, fontSize: 14,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                marginTop: 4,
              }}
            >
              SEND ENQUIRY
              <ChevronRight size={16} color={WHITE} />
            </motion.button>
          </form>
        </FadeUp>
      </div>
      <style>{`
        @media (max-width: 767px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  )
}

function ContactField({ id, label, type, value, onChange, focused, onFocus, onBlur }: {
  id: string; label: string; type: string; value: string;
  onChange: (v: string) => void; focused: boolean; onFocus: () => void; onBlur: () => void
}) {
  const hasValue = value.length > 0
  return (
    <div style={{ position: 'relative' }}>
      <motion.label
        htmlFor={id}
        animate={{
          y: focused || hasValue ? -20 : 0,
          fontSize: focused || hasValue ? 10 : 12,
          color: focused ? ORANGE : '#888',
        }}
        style={{
          position: 'absolute', left: 0, top: 8,
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          transformOrigin: 'left',
          transition: 'none',
        }}
      >
        {label}
      </motion.label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: '100%', background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${focused ? ORANGE : '#555'}`,
          color: WHITE,
          fontFamily: "'Barlow', sans-serif",
          fontSize: 16, padding: '20px 0 8px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

/* ── HELPERS ──────────────────────────────────────────── */
function clamp(min: number, vw: number, max: number) {
  return `clamp(${min}px, ${vw}vw, ${max}px)` as unknown as number
}

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={ORANGE}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function ChevronRight({ size = 16, color = ORANGE }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
