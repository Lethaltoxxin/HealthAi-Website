"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNavigation from '../app_components/BottomNavigation';
import { AuthProvider } from '../context/AuthContext';
export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isLandingPage = pathname === '/' || pathname === '/intro';
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reduced timeout for smoother feel, typical of premium sites
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="preloader"
                        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                        exit={{
                            clipPath: 'inset(0% 0% 100% 0%)',
                            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                        }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#0d0914',
                            zIndex: 100000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                fontFamily: 'Barlow Condensed',
                                fontWeight: 900,
                                fontSize: '48px',
                                color: '#F2EEE8',
                                letterSpacing: '0.1em'
                            }}>
                                HEALTH<span style={{ color: '#00C9A7' }}>AI</span>
                            </div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                style={{
                                    height: '2px',
                                    background: '#00C9A7',
                                    marginTop: '8px',
                                    transformOrigin: 'left'
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                style={{ paddingBottom: !isLandingPage ? '80px' : '0px', minHeight: '100vh', background: 'var(--bg-primary, #0d0914)' }}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </motion.div>
            {!isLandingPage && <BottomNavigation />}
        </>
    );
}
