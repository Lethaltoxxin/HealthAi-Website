"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductSuite() {
    const section1Ref = useRef(null);
    const { scrollYProgress: scrollYProgress1 } = useScroll({
        target: section1Ref,
        offset: ["start end", "end start"]
    });
    const y1 = useTransform(scrollYProgress1, [0, 1], [150, -150]);
    const scale1 = useTransform(scrollYProgress1, [0, 0.5, 1], [0.9, 1, 0.9]);

    const section2Ref = useRef(null);
    const { scrollYProgress: scrollYProgress2 } = useScroll({
        target: section2Ref,
        offset: ["start end", "end start"]
    });
    const y2 = useTransform(scrollYProgress2, [0, 1], [100, -100]);

    return (
        <div className="w-full flex flex-col">
            {/* Block 1: Legacy Replacement */}
            <section ref={section1Ref} className="w-full bg-[#00D4AA] min-h-[100vh] py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-center">
                    <h2 className="text-[#0A1118] font-bold text-[64px] md:text-[92px] leading-[0.9] tracking-[-4.6px] mb-16">
                        The first composable AI system<br />for state services.
                    </h2>

                    <motion.div
                        style={{ y: y1, scale: scale1 }}
                        className="w-full max-w-5xl mx-auto relative drop-shadow-[0_45px_65px_rgba(0,0,0,0.5)]"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-contain"
                            src="https://res.cloudinary.com/healthytogether/video/upload/v1674060628/htio/home/video/homepage-dashboard-01-floating_larger_VP9.webm"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Block 2: Modernization */}
            <section ref={section2Ref} className="w-full bg-[#C6F7EB] min-h-[100vh] py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-center">
                    <h2 className="text-[#0A1118] font-bold text-[64px] md:text-[92px] leading-[0.9] tracking-[-4.6px] mb-16">
                        Upgrade to a cost-effective,<br />modern system.
                    </h2>

                    <motion.div
                        style={{ y: y2 }}
                        className="w-full max-w-lg mx-auto relative drop-shadow-[0_45px_65px_rgba(0,0,0,0.3)] filter"
                    >
                        <img
                            src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/63c80f07f1654d4d9f018da9_phone-poster.png"
                            className="w-full h-auto object-contain scale-[1.1] opacity-0 absolute inset-0 z-0"
                            alt="Phone Backup"
                        />
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-contain relative z-10 rounded-[3.5rem] overflow-hidden"
                            src="https://res.cloudinary.com/healthytogether/video/upload/v1671045767/htio/home/video/appointments-mobile-1.mp4"
                        />
                        {/* Fake phone bezel */}
                        <div className="absolute inset-0 z-20 pointer-events-none border-[12px] border-black rounded-[4rem] shadow-inner box-border"></div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
