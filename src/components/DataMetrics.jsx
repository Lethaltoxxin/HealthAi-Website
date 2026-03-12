"use client";

import { motion } from "framer-motion";

export default function DataMetrics() {
    return (
        <section className="w-full bg-[#0A1118] py-20 px-6 flex flex-col items-center">
            <div className="max-w-[1240px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* Blue Metric Card - 42px 42px 42px 0px border-radius */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#00D4AA] rounded-tr-[42px] rounded-tl-[42px] rounded-bl-[42px] rounded-br-[0px] p-10 md:p-14 flex flex-col justify-between aspect-square"
                >
                    <div className="text-[#0A1118] text-[16px] font-bold tracking-widest uppercase opacity-80 mb-6">Volume</div>
                    <div>
                        <h3 className="text-[#0A1118] font-bold text-[64px] md:text-[80px] leading-[0.9] tracking-tight mb-2">500M+</h3>
                        <p className="text-[#0A1118]/80 text-[18px] md:text-[22px] font-medium leading-tight">Messages securely delivered to residents.</p>
                    </div>
                </motion.div>

                {/* White Metric Card - 42px 42px 42px 0px border-radius */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-white rounded-tr-[42px] rounded-tl-[42px] rounded-bl-[42px] rounded-br-[0px] p-10 md:p-14 flex flex-col justify-between aspect-square"
                >
                    <div className="text-[#0A1118] text-[16px] font-bold tracking-widest uppercase opacity-80 mb-6">Adoption</div>
                    <div>
                        <h3 className="text-[#0A1118] font-bold text-[64px] md:text-[80px] leading-[0.9] tracking-tight mb-2">1/2</h3>
                        <p className="text-[#0A1118]/80 text-[18px] md:text-[22px] font-medium leading-tight">Households use the platform in launched states.</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
