"use client";

import { motion } from "framer-motion";
import "../styles/Hero.css";

const SplitText = ({ text }) => {
    const words = text.split(" ");
    return (
        <>
            {words.map((word, i) => (
                <span key={i} className="word-wrapper inline-block overflow-hidden py-[0.1em] -my-[0.1em]">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "150%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1], // The exact premium easing curve
                            delay: i * 0.05,
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </>
    );
};

export default function Hero() {
    return (
        <section className="relative w-full min-h-[100vh] flex flex-col justify-center items-center text-center overflow-hidden pt-[120px]">

            {/* Absolute Video Waveform Backplate */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-[1600px] h-auto z-0 pointer-events-none mix-blend-screen opacity-90">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="https://res.cloudinary.com/healthytogether/video/upload/v1670361640/htio/home/video/hero-waveform-1.mov"
                />
            </div>

            <div className="relative z-10 w-full max-w-[1000px] px-6 mx-auto flex flex-col items-center">

                {/* Exact Healthytogether Text & Sizing (92px, -4.6px tracking, #F9F0FF) */}
                <h1 className="text-[var(--foreground)] font-bold text-[72px] md:text-[92px] leading-[1] tracking-[-4.6px] max-w-[800px] mb-8">
                    <SplitText text="Systems that deliver outcomes for government." />
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="mt-4"
                >
                    <button
                        className="bg-[var(--button-white)] text-[var(--text-dark)] font-semibold py-[14px] px-[24px] rounded-[16000px] text-[16px] hover:scale-[1.03] transition-transform duration-500 shadow-md"
                        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                        Schedule a Demo
                    </button>
                </motion.div>
            </div>

            {/* Trusted By Logos relative at bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="relative mt-20 w-full px-6 z-20 flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
            >
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/69309d21a468d421f0226091_60ec53d86b1bb2d46f57a09f56df5b98_brag-bar-flda.svg" alt="Florida Health" className="h-[28px] object-contain" />
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/69309e4631279cebeab56515_brag-bar-ak.png" alt="Alaska" className="h-[32px] object-contain" />
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/69309eed61037307a16d1615_373ad2ed71e36cd0dd11c77d0e1580bc_brag-bar-dars.png" alt="DARS" className="h-[30px] object-contain" />
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/68c97aec8cd248c3f7cd0458_brag_bar_choctaw.avif" alt="Choctaw" className="h-[36px] object-contain" />
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/66fd4fcd4f1b4521099c99e4_brag-bar-mdss.svg" alt="MDSS" className="h-[32px] object-contain" />
                <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/69309fd8382bbe0a5e67f57d_brag-bar-mdphhs.png" alt="MDPHHS" className="h-[32px] object-contain" />
            </motion.div>
        </section>
    );
}
