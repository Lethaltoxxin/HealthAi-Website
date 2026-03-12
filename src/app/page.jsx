"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Camera, FileText, Stethoscope, MessageSquare, Lock, Moon, Leaf, Activity, Trophy, BarChart2, Shield, Apple, Play, ChevronDown, CheckCircle2, Scan, Menu, X, Upload, Zap, ClipboardCheck } from 'lucide-react';

/* =========================================
   CSS STYLES & ANIMATIONS
   ========================================= */
const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: #F2EEE8;
  color: #1A1614;
  font-family: 'Plus Jakarta Sans', sans-serif;
body {
  background: #F2EEE8;
  color: #1A1614;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 3px; background: #00C9A7;
  z-index: 99998; transform-origin: left; box-shadow: 0 0 8px rgba(0,201,167,0.60);
}
::selection { background: rgba(0,201,167,0.25); color: #1A1614; }

@keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
.marqueeLeft { animation: marqueeLeft 40s linear infinite; display: flex; width: max-content; }
.marqueeRight { animation: marqueeRight 40s linear infinite; display: flex; width: max-content; }
.marqueeLeft:hover, .marqueeRight:hover { animation-play-state: paused; }

@keyframes bokehPulse {
  0%, 100% { transform: scale(1); opacity: 0.18; }
  50% { transform: scale(1.15); opacity: 0.25; }
}
@keyframes phoneFloat {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-14px) rotate(-2deg); }
}
@keyframes scanLine {
  0% { top: 10%; opacity: 1; }
  90% { top: 90%; opacity: 1; }
  100% { top: 90%; opacity: 0; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Typography Helpers */
.font-display-h1 { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; letter-spacing: -0.03em; line-height: 0.9; }
.font-display-h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; letter-spacing: -0.025em; }
.font-feature { font-family: 'Fraunces', serif; font-weight: 300; font-style: italic; line-height: 1.4; }
.font-label { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }

/* Grid blocks */
.bento-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

.mask-reveal {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1);
}
.mask-reveal.visible {
  clip-path: inset(0 0 0% 0);
}

/* Skip to content */
.skip-link {
  position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
  z-index: 99999; background: #00C9A7; color: #0A2E28; padding: 12px 24px; font-weight: 700; font-size: 16px;
  border-radius: 0 0 8px 0; text-decoration: none;
}
.skip-link:focus {
  position: fixed; left: 0; top: 0; width: auto; height: auto; overflow: visible;
}

/* Focus visible */
*:focus-visible {
  outline: 2px solid #00C9A7;
  outline-offset: 3px;
  border-radius: 4px;
}
button:focus-visible, a:focus-visible {
  outline: 2px solid #00C9A7;
  outline-offset: 3px;
}

/* Mobile nav */
.nav-links { display: flex; gap: 32px; font-size: 14px; font-weight: 500; opacity: 0.7; }
.nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
.mobile-menu { display: none; }

/* Product demo */
.demo-step-indicator { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
.demo-step-indicator.active { width: 32px; border-radius: 4px; }

/* Responsive testimonials */
.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; width: 100%; }
.stats-row { max-width: 1200px; width: 100%; display: flex; justify-content: space-between; align-items: center; }
.stats-divider { width: 1px; height: 60px; background: rgba(242,238,232,0.08); }
.hero-content { max-width: 1200px; width: 100%; display: flex; padding: 0 48px; z-index: 1; position: relative; margin-top: 140px; }
.hero-phone { flex: 1; display: flex; justify-content: center; align-items: center; }
.section-padding { padding: 120px 48px; }
.section-padding-sm { padding: 80px 48px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; gap: 64px; margin-bottom: 80px; }
.side-by-side { max-width: 1200px; width: 100%; display: flex; align-items: center; gap: 80px; flex-wrap: wrap-reverse; }
.cta-buttons { display: flex; gap: 16px; margin-bottom: 48px; }
.secondary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; width: 100%; }
.incognito-layout { max-width: 1200px; width: 100%; display: flex; align-items: center; gap: 80px; }

/* ========= TABLET ========= */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; align-items: center; justify-content: center; }
  .mobile-menu.open { display: flex; flex-direction: column; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(10,17,24,0.97); z-index: 99995; padding: 80px 32px; gap: 24px; align-items: center; }
  .mobile-menu.open a { font-size: 24px; color: #F2EEE8; text-decoration: none; font-weight: 600; }
  .mobile-menu-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: #F2EEE8; font-size: 32px; cursor: pointer; }

  .hero-content { flex-direction: column; padding: 0 24px; margin-top: 100px; gap: 40px; }
  .hero-phone { display: none; }
  .section-padding { padding: 80px 24px; }
  .section-padding-sm { padding: 60px 24px; }
  .bento-grid { grid-template-columns: 1fr; }
  .testimonial-grid { grid-template-columns: 1fr; }
  .stats-row { flex-direction: column; gap: 32px; }
  .stats-divider { width: 60px; height: 1px; }
  .footer-grid { grid-template-columns: 1fr; gap: 40px; }
  .side-by-side { flex-direction: column; gap: 40px; }
  .cta-buttons { flex-direction: column; align-items: center; }
  .secondary-grid { grid-template-columns: 1fr; }
  .incognito-layout { flex-direction: column; gap: 40px; }
}

/* ========= PHONE ========= */
@media (max-width: 480px) {
  .hero-content { margin-top: 80px; padding: 0 16px; }
  .section-padding { padding: 60px 16px; }
  .section-padding-sm { padding: 48px 16px; }
}
`;

/* =========================================
   HELPER COMPONENTS
   ========================================= */

const TiltCard = ({ children, className, style, ...props }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
                ...style
            }}
            className={className}
            {...props}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

const MagneticElement = ({ children, className, distance = 0.3, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * distance;
        const y = (e.clientY - centerY) * distance;
        setPosition({ x, y });
    };

    return (
        <motion.div
            ref={ref}
            className={`magnetic-target ${className || ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

const TextReveal = ({ children, delay = 0 }) => {
    return (
        <div style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: 'inline-block' }}
            >
                {children}
            </motion.span>
        </div>
    );
};

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}</span>;
};

/* =========================================
   MAIN EXPORT
   ========================================= */
export default function HealthAIWebsite() {
    const router = useRouter();
    const { scrollYProgress, scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -80]);
    const [demoStep, setDemoStep] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Inject Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    // Auto-advance product demo
    useEffect(() => {
        const timer = setInterval(() => {
            setDemoStep(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Shared Animation Variants
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
    };
    const staggerContainer = {
        hidden: {}, visible: { transition: { staggerChildren: 0.15 } }
    };

    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <style>{styles}</style>

            {/* Skip to content (a11y) */}
            <a href="#main-content" className="skip-link">Skip to main content</a>

            {/* Scroll Progress */}
            <motion.div className="scroll-progress" style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} aria-hidden="true" />

            {/* Noise Overlay */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                opacity: 0.035, pointerEvents: 'none',
            }} aria-hidden="true" />

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">×</button>
                {["Features", "How It Works", "Privacy"].map(item => (
                    <a key={item} href={`#${item.toLowerCase().replace(/ /g, '')}`} onClick={() => setMobileMenuOpen(false)}>{item}</a>
                ))}
                <button onClick={() => { setMobileMenuOpen(false); router.push('/login'); }} style={{ background: '#00C9A7', color: '#0A2E28', height: '48px', padding: '0 24px', borderRadius: '999px', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '16px' }}>Get the App</button>
            </div>

            {/* NAV */}
            <motion.nav
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9990,
                    background: useTransform(scrollY, [0, 80], ['rgba(15, 25, 35, 0)', 'rgba(15, 25, 35, 0.85)']),
                    backdropFilter: useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(20px)']),
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '24px 48px', color: '#F2EEE8'
                }}
            >
                <MagneticElement distance={0.1}>
                    <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '26px', cursor: 'pointer' }}>HealthAI</div>
                </MagneticElement>
                <div className="nav-links">
                    {["Features", "How It Works", "Privacy"].map((item, idx) => (
                        <MagneticElement key={item} distance={0.2}>
                            <a href={`#${item.toLowerCase().replace(/ /g, '')}`} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>{item}</a>
                        </MagneticElement>
                    ))}
                </div>
                <button className="nav-hamburger" onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation menu">
                    <Menu color="#F2EEE8" size={24} />
                </button>
                <MagneticElement distance={0.2}>
                    <button
                        onClick={() => router.push('/intro')}
                        style={{ background: '#00C9A7', color: '#0A2E28', height: '40px', padding: '0 20px', borderRadius: '999px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                    >
                        Get the App
                    </button>
                </MagneticElement>
            </motion.nav>

            {/* SECTION 1: HERO */}
            <section id="main-content" aria-label="Hero" style={{ height: '100vh', background: '#0F1923', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Bokeh */}
                <div style={{ position: 'absolute', top: '-100px', left: '-200px', width: '600px', height: '600px', background: 'rgba(0,201,167,0.18)', borderRadius: '50%', filter: 'blur(120px)', animation: 'bokehPulse 8s infinite' }} />
                <div style={{ position: 'absolute', bottom: '-50px', right: '-100px', width: '500px', height: '500px', background: 'rgba(0,180,150,0.20)', borderRadius: '50%', filter: 'blur(100px)', animation: 'bokehPulse 8s infinite 2s' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', height: '300px', background: 'rgba(0,212,170,0.15)', borderRadius: '50%', filter: 'blur(80px)', animation: 'bokehPulse 8s infinite 4s' }} />

                <div className="hero-content">

                    <motion.div style={{ flex: 1, y: heroY }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ height: '1px', width: '24px', background: '#00C9A7' }} />
                            <span className="font-label" style={{ color: '#00C9A7' }}>INTRODUCING HEALTHAI</span>
                            <div style={{ height: '1px', width: '24px', background: '#00C9A7' }} />
                        </div>

                        <div className="font-display-h1" style={{ fontSize: '96px', color: '#F2EEE8', display: 'flex', flexDirection: 'column' }}>
                            <TextReveal delay={0.1}>Your Health,</TextReveal>
                            <TextReveal delay={0.2}>Finally</TextReveal>
                            <span style={{ color: '#00C9A7' }}><TextReveal delay={0.3}>Understood.</TextReveal></span>
                        </div>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="font-feature" style={{ fontSize: '22px', color: 'rgba(242,238,232,0.70)', maxWidth: '560px', margin: '32px 0' }}>
                            Scan any prescription. Read any report. Check your symptoms. Get answers in plain English — powered by AI that actually explains itself.
                        </motion.p>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <MagneticElement distance={0.1}>
                                <button
                                    onClick={() => router.push('/intro')}
                                    style={{ background: '#00C9A7', color: '#0A2E28', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', height: '54px', padding: '0 32px', borderRadius: '999px', boxShadow: '0 8px 32px rgba(0,201,167,0.40)', border: 'none', cursor: 'pointer' }}
                                >
                                    Download App
                                </button>
                            </MagneticElement>
                            <MagneticElement distance={0.1}>
                                <button
                                    onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
                                    style={{ background: 'transparent', border: '1.5px solid rgba(242,238,232,0.25)', color: '#F2EEE8', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', height: '54px', padding: '0 32px', borderRadius: '999px', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.target.style.borderColor = '#00C9A7'; e.target.style.color = '#00C9A7' }} onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(242,238,232,0.25)'; e.target.style.color = '#F2EEE8' }}
                                >
                                    See How It Works ↓
                                </button>
                            </MagneticElement>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
                            {["🔒 Zero data sold", "🧠 Gemini AI powered", "🌍 Works for everyone"].map(t => (
                                <div key={t} style={{ background: 'rgba(242,238,232,0.08)', border: '1px solid rgba(242,238,232,0.12)', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', color: 'rgba(242,238,232,0.60)' }}>{t}</div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* MOCKUP */}
                    <motion.div
                        initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
                        className="hero-phone"
                    >
                        <div style={{ width: '280px', height: '560px', background: '#0A1118', borderRadius: '40px', border: '2px solid rgba(242,238,232,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.60)', padding: '24px 16px', display: 'flex', flexDirection: 'column', animation: 'phoneFloat 4s infinite ease-in-out' }}>
                            <div style={{ width: '100%', height: '24px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '40px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ background: '#142230', padding: '12px', borderRadius: '16px 16px 16px 4px', color: '#F2EEE8', fontSize: '12px', marginBottom: '16px', lineHeight: 1.5 }}>
                                    Your HbA1c is 6.8% — slightly elevated. Here's what that means...
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, #00C9A7, #00B896)', padding: '12px', borderRadius: '16px 16px 4px 16px', color: '#0A2E28', fontSize: '12px', alignSelf: 'flex-end', marginLeft: '40px' }}>
                                    What should I eat?
                                </div>
                            </div>
                            <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between' }}>
                                <div style={{ width: '2px', height: '16px', background: '#00C9A7', animation: 'bokehPulse 1s infinite' }} />
                                <div style={{ width: '24px', height: '24px', background: '#00C9A7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div style={{ width: '8px', height: '8px', background: '#0A2E28', borderRadius: '2px' }} /></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div style={{ position: 'absolute', bottom: '40px', display: 'flex', justifyContent: 'center', width: '100%', animation: 'bounce 1.5s infinite' }}>
                    <ChevronDown color="rgba(242,238,232,0.40)" size={32} />
                </div>
            </section>
            {/* SECTION 2: MARQUEE */}
            <section style={{ height: '80px', background: '#F2EEE8', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid rgba(26,22,20,0.05)' }}>
                <div className="marqueeLeft" style={{ marginBottom: '4px' }}>
                    {Array(4).fill("SCAN PRESCRIPTIONS · READ LAB REPORTS · CHECK SYMPTOMS · AI HEALTH CHAT · SLEEP TRACKING · NUTRITION PLANNING · INCOGNITO MODE · UNDERSTAND YOUR MEDS · ").map((text, i) => (
                        <React.Fragment key={i}>
                            <span style={{ paddingRight: '32px', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '18px', color: '#1A1614', whiteSpace: 'nowrap' }}>{text}</span>
                        </React.Fragment>
                    ))}
                </div>
                <div className="marqueeRight">
                    {Array(4).fill("GEMINI AI POWERED · WORKS FOR EVERYONE · ZERO DATA SOLD · EXPLAINS ITSELF · PLAIN ENGLISH · INSTANT ANALYSIS · PRIVACY FIRST · UNIVERSAL HEALTH · ").map((text, i) => (
                        <React.Fragment key={i}>
                            <span style={{ paddingRight: '32px', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '18px', color: 'rgba(26,22,20,0.35)', whiteSpace: 'nowrap' }}>{text}</span>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* SECTION 3: CORE FEATURES */}
            <section id="features" className="section-padding" aria-label="Core features" style={{ background: '#0F1923', color: '#F2EEE8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="font-label" style={{ color: '#00C9A7', marginBottom: '24px' }}>WHAT HEALTHAI DOES</div>
                <h2 className="font-display-h1" style={{ fontSize: '72px', textAlign: 'center', marginBottom: '80px', lineHeight: 0.9 }}>
                    Everything you need<br /><span style={{ color: '#00C9A7' }}>to understand your health.</span>
                </h2>

                <div className="bento-grid" style={{ maxWidth: '1200px', width: '100%', position: 'relative' }}>
                    {/* Grid lines */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'rgba(242,238,232,0.06)' }} />
                    <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(242,238,232,0.06)' }} />

                    {[
                        { tag: "INC_MODE", title: "Zero-Retention AI Chat", desc: "Start an incognito session that wipes all memory and dialogue the moment you close it. Complete privacy for sensitive health questions.", icon: <Lock color="#00D4AA" size={24} />, bg: 'rgba(0,212,170,0.15)', border: 'rgba(0,212,170,0.3)', hover: 'rgba(0,212,170,0.6)', color: '#00D4AA', path: "/chat" },
                        { tag: "OCR_ENGINE", title: "Prescription Scanner", desc: "Upload handwriting or labels. The OCR engine reads the text, and Gemini explains each medication's purpose, dosage, and side effects.", icon: <Scan color="#2563EB" size={24} />, bg: 'rgba(37,99,235,0.15)', border: 'rgba(37,99,235,0.3)', hover: 'rgba(37,99,235,0.6)', color: '#2563EB', path: "/prescription" },
                        { tag: "CLINICAL_AI", title: "Report Analysis", desc: "Don't wait for your follow-up appointment. Extract lab values directly from your report to see what's normal, borderline, or needs attention.", icon: <FileText color="#00C9A7" size={24} />, bg: 'rgba(0,201,167,0.15)', border: 'rgba(0,201,167,0.3)', hover: 'rgba(0,201,167,0.6)', color: '#00C9A7', path: "/lab-report" },
                        { tag: "TRIAGE", title: "Symptom Checker", desc: "Describe what you're feeling or tap the body map. The AI ranks possible conditions by probability and assigns a clear triage urgency level.", icon: <Activity color="#D97706" size={24} />, bg: 'rgba(217,119,6,0.15)', border: 'rgba(217,119,6,0.3)', hover: 'rgba(217,119,6,0.6)', color: '#D97706', path: "/symptoms" }
                    ].map((f, i) => {
                        return (
                            <TiltCard key={i}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                style={{ background: '#142230', border: '1px solid rgba(242,238,232,0.10)', borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s' }}
                                onClick={() => router.push(f.path)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(f.path); }}
                                tabIndex={0}
                                role="link"
                                aria-label={`${f.title} — ${f.tag}`}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = f.hover; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(242,238,232,0.10)'; }}
                            >
                                <div style={{ transform: "translateZ(25px)" }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: f.bg, border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                        {f.icon}
                                    </div>
                                    <h3 className="font-display-h2" style={{ fontSize: '28px', color: '#F2EEE8', marginBottom: '16px' }}>{f.title}</h3>
                                    <p style={{ fontSize: '15px', color: 'rgba(242,238,232,0.65)', lineHeight: 1.7, marginBottom: '32px' }}>{f.desc}</p>
                                    <div style={{ padding: '6px 12px', background: f.bg, border: `1px solid ${f.border}`, color: f.color, borderRadius: '999px', fontSize: '11px', display: 'inline-block', fontWeight: 600 }}>{f.tag}</div>
                                </div>
                            </TiltCard>
                        )
                    })}
                </div>
            </section >

            {/* SECTION 4: HOW IT WORKS */}
            < section id="how" style={{ background: '#F2EEE8', padding: '120px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }
            }>
                <div className="font-label" style={{ color: '#6B6158', marginBottom: '24px' }}>THE PROCESS</div>
                <h2 className="font-display-h1" style={{ fontSize: '72px', textAlign: 'center', marginBottom: '80px', color: '#1A1614', lineHeight: 0.9 }}>
                    Three steps.<br /><span style={{ color: '#00C9A7' }}>Complete clarity.</span>
                </h2>

                <div style={{ maxWidth: '640px', width: '100%' }}>
                    {[
                        { num: "1", title: "Capture or Ask", desc: "Snap a photo of your medical report, prescription, or just type your symptoms directly into the chat. It takes seconds.", anim: true },
                        { num: "2", title: "Gemini Analysis", desc: "HealthAI’s custom engine rapidly extracts medical terminology, connects the dots, and references standard clinical guidance.", anim: false },
                        { num: "3", title: "Human Answers", desc: "You get a plain-English explanation, a structured triage recommendation, and smart follow-up questions to help you.", anim: false }
                    ].map((s, i) => {
                        return (
                            <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: i * 0.2 }}
                                style={{ display: 'flex', gap: '32px', marginBottom: i !== 2 ? '0' : '0' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className="font-display-h1" style={{ fontSize: '80px', color: 'rgba(0,201,167,0.15)', lineHeight: 0.8 }}>{s.num}</div>
                                    {i !== 2 && <div style={{ width: '2px', height: '60px', borderLeft: '2px dashed rgba(26,22,20,0.12)', margin: '16px 0' }} />}
                                </div>
                                <div style={{ paddingTop: '8px', paddingBottom: i !== 2 ? '40px' : '0' }}>
                                    <h3 className="font-display-h2" style={{ fontSize: '32px', color: '#1A1614', marginBottom: '12px' }}>{s.title}</h3>
                                    <p style={{ fontSize: '16px', color: '#6B6158', lineHeight: 1.6 }}>{s.desc}</p>

                                    {s.anim && (
                                        <div style={{ width: '160px', height: '120px', background: '#FFFFFF', border: '1px solid rgba(26,22,20,0.08)', borderRadius: '16px', marginTop: '24px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                            <FileText color="rgba(26,22,20,0.2)" size={48} />
                                            <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: '#00C9A7', boxShadow: '0 0 12px #00C9A7', animation: 'scanLine 2s infinite ease-in-out' }} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </section >

            {/* SECTION 5: STATS */}
            <section className="section-padding-sm" aria-label="Statistics" style={{ background: '#0F1923', display: 'flex', justifyContent: 'center' }}>
                <div className="stats-row">
                    {[
                        { end: 15, suffix: "+", label: "Specialised Triage Levels", stringVal: false },
                        { end: 4, suffix: "s", label: "Report Scan Speed", stringVal: false },
                        { end: 0, suffix: "", label: "Data Shared Externally", stringVal: false },
                        { end: "100", suffix: "%", label: "Anonymous Incognito Chat", stringVal: true }
                    ].map((stat, i) => (
                        <React.Fragment key={i}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="font-display-h1" style={{ fontSize: '64px', color: '#00C9A7', lineHeight: 1 }}>
                                    {stat.stringVal ? stat.end : <CountUp end={stat.end} duration={2000} />}{stat.suffix}
                                </div>
                                <div style={{ fontSize: '13px', color: 'rgba(242,238,232,0.55)', marginTop: '8px' }}>{stat.label}</div>
                            </div>
                            {i !== 3 && <div className="stats-divider" />}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* SECTION 6: INCOGNITO MODE */}
            <section id="privacy" className="section-padding" aria-label="Privacy and incognito mode" style={{ background: '#0A1118', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                <div className="incognito-layout">

                    {/* Left Text */}
                    <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1 }}>
                        <div className="font-label" style={{ color: '#00D4AA', marginBottom: '24px' }}>PRIVACY FIRST</div>
                        <h2 className="font-display-h1" style={{ fontSize: '64px', color: '#F2EEE8', marginBottom: '32px', lineHeight: 0.9 }}>
                            Some questions are<br />private. Keep them<br />that way.
                        </h2>
                        <p className="font-feature" style={{ fontSize: '18px', color: 'rgba(242,238,232,0.70)', marginBottom: '40px' }}>
                            Incognito Mode creates a zero-retention session. No messages stored. No history written. The moment you close it, it never happened. Your health is personal — HealthAI treats it that way.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {["Session memory wiped on exit", "Nothing written to database", "Visual indicator always visible"].map(feat => (
                                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CheckCircle2 color="#00D4AA" size={20} />
                                    <span style={{ color: '#F2EEE8', fontSize: '15px' }}>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1 }}>
                        <div style={{ width: '320px', height: '640px', background: '#0A1118', borderRadius: '48px', border: '2px solid rgba(0,212,170,0.2)', boxShadow: '0 0 60px rgba(0,212,170,0.25)', margin: '0 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ padding: '24px 16px 16px', borderBottom: '1px solid rgba(0,212,170,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Lock color="#00D4AA" size={16} />
                                <span style={{ color: '#F2EEE8', fontSize: '14px', fontWeight: 600 }}>AI Health Assistant</span>
                            </div>
                            <div style={{ background: '#00D4AA', padding: '8px', textAlign: 'center', fontSize: '11px', color: '#0A1118', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Private session — nothing will be saved
                            </div>
                            <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ background: '#142230', padding: '16px', borderRadius: '16px 16px 16px 4px', color: '#F2EEE8', fontSize: '13px' }}>
                                    I noticed a change in my body recently...
                                </div>
                                <div style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)', padding: '16px', borderRadius: '16px 16px 4px 16px', color: '#F2EEE8', fontSize: '13px', alignSelf: 'flex-end', marginLeft: '32px' }}>
                                    I can help you understand those symptoms confidentially. Your description won't be saved anywhere.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: PRODUCT DEMO WALKTHROUGH */}
            <section className="section-padding" aria-label="Product demo walkthrough" style={{ background: '#0F1923', color: '#F2EEE8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="font-label" style={{ color: '#00C9A7', marginBottom: '24px' }}>SEE IT IN ACTION</div>
                <h2 className="font-display-h1" style={{ fontSize: '72px', textAlign: 'center', marginBottom: '64px', lineHeight: 0.9 }}>
                    From scan to<br /><span style={{ color: '#00C9A7' }}>clarity in seconds.</span>
                </h2>

                <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
                    {/* Step indicators */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {[
                            { label: 'Upload', icon: <Upload size={16} /> },
                            { label: 'Analyze', icon: <Zap size={16} /> },
                            { label: 'Results', icon: <ClipboardCheck size={16} /> }
                        ].map((step, i) => (
                            <button key={i} onClick={() => setDemoStep(i)} aria-label={`Step ${i + 1}: ${step.label}`}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', transition: 'all 0.4s',
                                    background: demoStep === i ? '#00C9A7' : 'rgba(242,238,232,0.08)',
                                    color: demoStep === i ? '#0A2E28' : 'rgba(242,238,232,0.5)',
                                    fontWeight: 600, fontSize: '13px'
                                }}>
                                {step.icon} {step.label}
                            </button>
                        ))}
                    </div>

                    {/* Animated phone frame */}
                    <div style={{ width: '300px', height: '580px', background: '#0A1118', borderRadius: '44px', border: '2px solid rgba(0,212,170,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.50)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '24px', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px' }} />
                        </div>

                        <AnimatePresence mode="wait">
                            {demoStep === 0 && (
                                <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingTop: '40px' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '24px', border: '2px dashed rgba(0,212,170,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,212,170,0.06)' }}>
                                        <Upload size={40} color="#00D4AA" />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Upload your document</div>
                                        <div style={{ fontSize: '13px', color: 'rgba(242,238,232,0.5)', lineHeight: 1.5 }}>Snap a photo of your prescription, lab report, or medical document</div>
                                    </div>
                                    <div style={{ width: '100%', padding: '16px', background: 'rgba(0,212,170,0.1)', borderRadius: '16px', border: '1px solid rgba(0,212,170,0.2)', textAlign: 'center', fontSize: '13px', color: '#00D4AA', fontWeight: 600 }}>
                                        📷 Take Photo or Upload File
                                    </div>
                                </motion.div>
                            )}
                            {demoStep === 1 && (
                                <motion.div key="analyze" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingTop: '40px' }}>
                                    <div style={{ width: '200px', height: '140px', background: '#142230', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileText size={48} color="rgba(242,238,232,0.2)" />
                                        <div style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: '#00C9A7', boxShadow: '0 0 12px #00C9A7', animation: 'scanLine 2s infinite ease-in-out' }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Gemini AI Analyzing...</div>
                                        <div style={{ fontSize: '13px', color: 'rgba(242,238,232,0.5)', lineHeight: 1.5 }}>Extracting medical terminology and cross-referencing clinical data</div>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {['Extracting text...', 'Identifying medications...', 'Checking interactions...'].map((step, idx) => (
                                            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.3 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(242,238,232,0.6)' }}>
                                                <CheckCircle2 size={14} color="#00C9A7" /> {step}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {demoStep === 2 && (
                                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
                                    <div style={{ padding: '16px', background: '#142230', borderRadius: '16px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#00D4AA' }}>📋 Report Summary</div>
                                        <div style={{ fontSize: '12px', color: 'rgba(242,238,232,0.7)', lineHeight: 1.6 }}>Your HbA1c is 6.8% — slightly elevated above the normal range of 4-5.6%. This may indicate pre-diabetes.</div>
                                    </div>
                                    <div style={{ padding: '16px', background: 'rgba(0,212,170,0.1)', borderRadius: '16px', border: '1px solid rgba(0,212,170,0.2)' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#00D4AA' }}>💡 What to do next</div>
                                        <div style={{ fontSize: '12px', color: 'rgba(242,238,232,0.7)', lineHeight: 1.6 }}>Schedule a follow-up with your physician. Monitor carbohydrate intake and consider regular exercise.</div>
                                    </div>
                                    <div style={{ padding: '12px 16px', background: 'rgba(217,119,6,0.12)', borderRadius: '12px', border: '1px solid rgba(217,119,6,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Activity size={14} color="#D97706" />
                                        <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>Triage: Medium Priority</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress dots */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{ width: demoStep === i ? '32px' : '8px', height: '8px', borderRadius: '4px', background: demoStep === i ? '#00C9A7' : 'rgba(242,238,232,0.15)', transition: 'all 0.4s' }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7: SOCIAL PROOF */}
            <section className="section-padding" aria-label="Social proof and testimonials" style={{ background: '#F2EEE8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Aggregate Stats Bar */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px', padding: '32px 48px', background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(26,22,20,0.06)' }}>
                    {[
                        { value: '500+', label: 'Reports Analyzed' },
                        { value: '1,200+', label: 'Prescriptions Scanned' },
                        { value: '98%', label: 'Accuracy Rate' },
                        { value: '4.8★', label: 'Beta User Rating' }
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center', minWidth: '120px' }}>
                            <div className="font-display-h2" style={{ fontSize: '32px', color: '#0A2E28', marginBottom: '4px' }}>{stat.value}</div>
                            <div style={{ fontSize: '12px', color: '#6B6158', fontWeight: 500 }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                <div className="font-label" style={{ color: '#6B6158', marginBottom: '24px' }}>BETA USERS LOVE IT</div>
                <h2 className="font-display-h1" style={{ fontSize: '72px', color: '#1A1614', marginBottom: '80px', textAlign: 'center', lineHeight: 0.9 }}>
                    Finally, a health app<br />that speaks human.
                </h2>

                <div className="testimonial-grid" style={{ alignItems: 'stretch' }}>
                    {[
                        { quote: "I uploaded my dad's blood report and within seconds HealthAI explained every single value. For the first time, we actually understood what the doctor was talking about.", name: "Priya M.", role: "Beta Tester — Family Health", initials: "PM", color: '#00C9A7', verified: true },
                        { quote: "The prescription scanner is unreal. My grandmother takes 6 medications. HealthAI explained each one, flagged a potential interaction her pharmacist had missed.", name: "Arjun S.", role: "Beta Tester — Student", initials: "AS", color: '#2563EB', highlight: true, verified: true },
                        { quote: "I used the symptom checker when I had chest tightness. It asked smart follow-up questions and told me to seek care immediately — turned out to be the right call.", name: "Meera K.", role: "Beta Tester — Professional", initials: "MK", color: '#D97706', verified: true }
                    ].map((t, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.15 }}
                            style={{ background: '#FFFFFF', padding: '32px', borderRadius: '20px', border: t.highlight ? 'none' : '1px solid rgba(26,22,20,0.08)', boxShadow: t.highlight ? '0 8px 40px rgba(0,0,0,0.10)' : 'none', transform: t.highlight ? 'scale(1.03)' : 'scale(1)', display: 'flex', flexDirection: 'column', zIndex: t.highlight ? 2 : 1 }}>
                            <div style={{ color: '#00C9A7', fontSize: '20px', letterSpacing: '4px', marginBottom: '24px' }}>★★★★★</div>
                            <p style={{ fontSize: '15px', color: '#1A1614', lineHeight: 1.6, flex: 1, marginBottom: '32px' }}>"{t.quote}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{t.initials}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1A1614', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {t.name}
                                        {t.verified && <CheckCircle2 size={14} color="#00C9A7" />}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6B6158' }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Join beta CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ marginTop: '48px', textAlign: 'center' }}>
                    <p style={{ fontSize: '15px', color: '#6B6158', marginBottom: '16px' }}>Join 500+ beta users already using HealthAI</p>
                    <button onClick={() => router.push('/login')} aria-label="Join the beta" style={{ background: '#0A2E28', color: '#00C9A7', padding: '14px 32px', borderRadius: '999px', border: 'none', fontWeight: 600, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#142230'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0A2E28'}>
                        Create Your Free Account →
                    </button>
                </motion.div>
            </section>

            {/* SECTION: SLEEP & MINDFULNESS */}
            <section className="section-padding" aria-label="Sleep and mindfulness" style={{ background: '#0A1118', color: '#F2EEE8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="side-by-side">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ width: '100%', aspectRatio: '4/3', background: '#142230', borderRadius: '32px', border: '1px solid rgba(0,212,170,0.2)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A1118 0%, #0F2B3A 40%, #0D3D3A 100%)', opacity: 0.5 }} />
                            <Moon size={80} color="#5DFFD4" style={{ filter: 'drop-shadow(0 0 20px rgba(0,212,170,0.5))' }} />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '300px' }}>
                        <div className="font-label" style={{ color: '#5DFFD4', marginBottom: '24px' }}>SLEEP & MINDFULNESS</div>
                        <h2 className="font-display-h1" style={{ fontSize: '56px', marginBottom: '32px', lineHeight: 0.9 }}>
                            Drift off.<br />Wake up restored.
                        </h2>
                        <p className="font-feature" style={{ fontSize: '18px', color: 'rgba(242,238,232,0.70)', marginBottom: '32px' }}>
                            Headspace-inspired sleepcasts, wind-down meditations, and binaural soundscapes. Track your nightly sleep score and let the AI find correlations between your rest and your daily symptoms.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: NUTRITION */}
            <section style={{ background: '#F2EEE8', padding: '120px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '300px' }}>
                        <div className="font-label" style={{ color: '#10B981', marginBottom: '24px' }}>NUTRITION ENGINE</div>
                        <h2 className="font-display-h1" style={{ color: '#1A1614', fontSize: '56px', marginBottom: '32px', lineHeight: 0.9 }}>
                            Macro tracking,<br />visualised clearly.
                        </h2>
                        <p className="font-feature" style={{ fontSize: '18px', color: '#6B6158', marginBottom: '32px' }}>
                            Powered by a custom Indian Diet Database, get AI-generated daily meal plans based on your exact TDEE goals. Track your calories, protein, and carbs through beautiful, Apple-Health inspired rings.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ width: '100%', aspectRatio: '4/3', background: '#1A1614', borderRadius: '32px', border: '1px solid rgba(26,22,20,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity size={80} color="#10B981" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: WORKOUTS */}
            <section className="section-padding" aria-label="Workouts" style={{ background: '#0F1923', color: '#F2EEE8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="side-by-side">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ width: '100%', aspectRatio: '4/3', background: '#162A3A', borderRadius: '32px', border: '1px solid rgba(242,238,232,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #ef4444 100%)', opacity: 0.3 }} />
                            <Trophy size={80} color="#fca5a5" />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '300px' }}>
                        <div className="font-label" style={{ color: '#fca5a5', marginBottom: '24px' }}>EXPLORE & WORKOUT</div>
                        <h2 className="font-display-h1" style={{ fontSize: '56px', marginBottom: '32px', lineHeight: 0.9 }}>
                            Guided routines.<br />Anywhere.
                        </h2>
                        <p className="font-feature" style={{ fontSize: '18px', color: 'rgba(242,238,232,0.70)', marginBottom: '32px' }}>
                            Bodyweight routines, HIIT, and recovery flows illustrated with beautiful anatomical artwork. A built-in interval player guides you through every step of your Darebee-inspired workout.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: PROGRESS */}
            <section style={{ background: '#F2EEE8', padding: '120px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '300px' }}>
                        <div className="font-label" style={{ color: '#2563EB', marginBottom: '24px' }}>PROGRESS INSIGHTS</div>
                        <h2 className="font-display-h1" style={{ color: '#1A1614', fontSize: '56px', marginBottom: '32px', lineHeight: 0.9 }}>
                            Your health,<br />measured over time.
                        </h2>
                        <p className="font-feature" style={{ fontSize: '18px', color: '#6B6158', marginBottom: '32px' }}>
                            Watch your sleep scores, HRV, and nutrition adherence trend upwards. HealthAI generates weekly insight summaries telling you exactly what is working—and what needs to change.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ width: '100%', aspectRatio: '4/3', background: '#FFFFFF', borderRadius: '32px', border: '1px solid rgba(26,22,20,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <BarChart2 size={80} color="#2563EB" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 8: SECONDARY FEATURES */}
            <section className="section-padding" aria-label="Additional features" style={{ background: '#0F1923', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="font-label" style={{ color: '#00C9A7', marginBottom: '24px' }}>MORE FEATURES</div>
                <h2 className="font-display-h1" style={{ fontSize: '72px', color: '#F2EEE8', marginBottom: '80px', textAlign: 'center', lineHeight: 0.9 }}>
                    Built for your whole<br />wellness journey.
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', maxWidth: '1000px', width: '100%' }}>
                    {[
                        { tag: "Symptom Bodymap", desc: "Tap exactly where it hurts for precision diagnostics.", icon: <Activity size={24} color="#F2EEE8" />, path: "/symptoms" },
                        { tag: "Audio Sleepcasts", desc: "Binaural soundscapes & guided sleep stories.", icon: <Moon size={24} color="#F2EEE8" />, path: "/mindfulness" },
                        { tag: "Apple Health Macros", desc: "Track calories, protein, and carbs in visual rings.", icon: <Apple size={24} color="#F2EEE8" />, path: "/nutrition" },
                        { tag: "Indian Diet Engine", desc: "100+ local foods categorised by macros and preferences.", icon: <Leaf size={24} color="#F2EEE8" />, path: "/explore" },
                        { tag: "Darebee Workouts", desc: "Visual guides for bodyweight routines and stretches.", icon: <Trophy size={24} color="#F2EEE8" />, path: "/workout" },
                        { tag: "Weekly AI Insights", desc: "Trend tracking for HRV, sleep, and recovery.", icon: <BarChart2 size={24} color="#F2EEE8" />, path: "/progress" }
                    ].map((f, i) => {
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: Math.floor(i / 3) * 0.15 + (i % 3) * 0.1 }}
                                style={{ background: '#162A3A', border: '1px solid rgba(242,238,232,0.08)', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s' }}
                                onClick={() => router.push(f.path)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(f.path); }}
                                tabIndex={0}
                                role="link"
                                aria-label={f.title}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(242,238,232,0.2)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(242,238,232,0.08)'; }}>
                                {f.icon}
                                <h4 className="font-display-h2" style={{ fontSize: '22px', color: '#F2EEE8', marginTop: '20px', marginBottom: '8px' }}>{f.tag}</h4>
                                <p style={{ fontSize: '13px', color: 'rgba(242,238,232,0.55)' }}>{f.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* SECTION 9: CTA */}
            <section className="section-padding" aria-label="Call to action" style={{ minHeight: '100vh', background: '#00C9A7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {/* Noise Overlay */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.04, pointerEvents: 'none' }} />

                <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 48px' }}>
                    <div className="font-label" style={{ color: '#0A2E28', marginBottom: '32px' }}>GET STARTED TODAY</div>
                    <h2 className="font-display-h1" style={{ fontSize: '96px', color: '#0A2E28', lineHeight: 0.88, marginBottom: '32px' }}>
                        <TextReveal delay={0.1}>Your health, finally</TextReveal><br />
                        <TextReveal delay={0.2}>in your hands.</TextReveal>
                    </h2>
                    <p className="font-feature" style={{ fontSize: '20px', color: 'rgba(10,46,40,0.65)', maxWidth: '500px', marginBottom: '48px' }}>
                        Free to download. No subscription required to start. Works for prescriptions, reports, and symptoms — for anyone, anywhere.
                    </p>

                    <div className="cta-buttons">
                        <MagneticElement distance={0.15}>
                            <button style={{ background: '#0A2E28', color: '#00C9A7', display: 'flex', alignItems: 'center', gap: '12px', height: '60px', borderRadius: '16px', padding: '0 28px', border: 'none', transition: 'background 0.2s', fontWeight: 600, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#1C1040'} onMouseLeave={e => e.currentTarget.style.background = '#0A2E28'}>
                                <Apple size={24} /> Download on App Store
                            </button>
                        </MagneticElement>
                        <MagneticElement distance={0.15}>
                            <button style={{ background: '#0A2E28', color: '#00C9A7', display: 'flex', alignItems: 'center', gap: '12px', height: '60px', borderRadius: '16px', padding: '0 28px', border: 'none', transition: 'background 0.2s', fontWeight: 600, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#1C1040'} onMouseLeave={e => e.currentTarget.style.background = '#0A2E28'}>
                                <Play fill="#00C9A7" size={20} /> Download on Google Play
                            </button>
                        </MagneticElement>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <span style={{ fontSize: '14px', color: '#0A2E28', fontWeight: 600 }}>Or scan to download →</span>
                        <div style={{ width: '80px', height: '80px', background: 'transparent', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                            {/* Faux QR Code Pattern */}
                            {Array(16).fill(0).map((_, i) => <div key={i} style={{ background: [0, 1, 3, 4, 6, 8, 9, 11, 14, 15].includes(i) ? '#0A2E28' : 'transparent', borderRadius: '2px' }} />)}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 10: FOOTER */}
            <footer className="section-padding" aria-label="Footer" style={{ background: '#0A1118', color: '#F2EEE8' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="footer-grid">

                        {/* Col 1 */}
                        <div>
                            <div className="font-display-h1" style={{ fontSize: '32px', marginBottom: '16px' }}>HealthAI</div>
                            <div className="font-feature" style={{ fontSize: '14px', color: 'rgba(242,238,232,0.45)', marginBottom: '32px' }}>Your health, finally understood.</div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} style={{ width: '36px', height: '36px', background: 'rgba(242,238,232,0.06)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,201,167,0.15)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,238,232,0.06)'} />
                                ))}
                            </div>
                        </div>

                        {/* Col 2 */}
                        <div style={{ display: 'flex', gap: '80px' }}>
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B6158', marginBottom: '20px', letterSpacing: '0.08em' }}>PRODUCT</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {["Features", "How It Works", "Privacy", "Download"].map(l => (
                                        <MagneticElement key={l} distance={0.1}>
                                            <a href="#" style={{ color: 'rgba(242,238,232,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }} onMouseEnter={e => e.target.style.color = '#00C9A7'} onMouseLeave={e => e.target.style.color = 'rgba(242,238,232,0.5)'}>{l}</a>
                                        </MagneticElement>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B6158', marginBottom: '20px', letterSpacing: '0.08em' }}>COMPANY</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {["About", "Blog", "Careers", "Contact"].map(l => (
                                        <MagneticElement key={l} distance={0.1}>
                                            <a href="#" style={{ color: 'rgba(242,238,232,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }} onMouseEnter={e => e.target.style.color = '#00C9A7'} onMouseLeave={e => e.target.style.color = 'rgba(242,238,232,0.5)'}>{l}</a>
                                        </MagneticElement>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Col 3 */}
                        <div>
                            <div className="font-display-h2" style={{ fontSize: '22px', marginBottom: '16px' }}>Stay in the loop</div>
                            <p style={{ fontSize: '14px', color: 'rgba(242,238,232,0.5)', marginBottom: '24px' }}>Health tips, feature updates, and AI insights — weekly.</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="email" placeholder="Email address" style={{ flex: 1, background: 'rgba(242,238,232,0.06)', border: '1px solid rgba(242,238,232,0.12)', height: '48px', borderRadius: '999px', padding: '0 20px', color: '#F2EEE8', outline: 'none' }} />
                                <button style={{ background: '#00C9A7', color: '#0A2E28', height: '48px', padding: '0 24px', borderRadius: '999px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div style={{ borderTop: '1px solid rgba(242,238,232,0.06)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(242,238,232,0.3)' }}>
                        <div>© 2025 HealthAI. All rights reserved.</div>
                        <div>Made with Gemini AI · Privacy Policy · Terms</div>
                    </div>
                </div>
            </footer>

        </div >
    );
}
