"use client";

import { motion } from "framer-motion";

export default function FeatureGrid() {
    return (
        <section className="w-full bg-[#0A1118] py-32 px-6 flex flex-col items-center">
            <div className="max-w-[1240px] w-full mx-auto">
                <div className="mb-20 text-center md:text-left">
                    <h2 className="text-[#E8F0EF] font-bold text-[56px] md:text-[72px] leading-[0.9] tracking-[-3px] max-w-[800px]">
                        Enterprise-grade infrastructure.
                    </h2>
                </div>

                {/* The DOM-matched Bento Grid with 1600px border radius arches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* Light Arch Card */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-[#E8FFF7] rounded-t-[1600px] w-full aspect-[3/4] p-10 md:p-14 flex flex-col justify-end items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute top-[20%] flex flex-col items-center justify-center w-[60%] aspect-square bg-gradient-to-b from-[#00D4AA]/10 to-transparent rounded-full">
                            <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/638e7478d0e9175e5c4a5246_icon-shield.svg" alt="Security Shield" className="w-[35%] h-[35%] object-contain" />
                        </div>
                        <div className="relative z-10 w-full mb-8">
                            <h3 className="text-[#0A1118] font-bold text-[32px] md:text-[42px] leading-[1] tracking-tight mb-4">Maximum Security</h3>
                            <p className="text-[#0A1118]/70 text-[18px] leading-relaxed max-w-[80%] mx-auto">Built from the ground up to protect highly sensitive federal, state, and health data.</p>
                        </div>
                    </motion.div>

                    {/* Dark Arch Card (Inset bordered) */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-[#0A1118] border border-white/10 rounded-t-[1600px] w-full aspect-[3/4] p-10 md:p-14 flex flex-col justify-end items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute top-[20%] flex flex-col items-center justify-center w-[60%] aspect-square bg-gradient-to-b from-[#5DFFD4]/10 to-transparent rounded-full">
                            <img src="https://cdn.prod.website-files.com/6388ec2a0f7223fc4c8ed3d2/638e7478405976152781d60c_icon-chart-up.svg" alt="Scalable Chart" className="w-[35%] h-[35%] object-contain" />
                        </div>
                        <div className="relative z-10 w-full mb-8">
                            <h3 className="text-[#E8F0EF] font-bold text-[32px] md:text-[42px] leading-[1] tracking-tight mb-4">Scalable Success</h3>
                            <p className="text-[#E8F0EF]/60 text-[18px] leading-relaxed max-w-[80%] mx-auto">Architecture proven to scale automatically through extreme traffic events instantly.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
