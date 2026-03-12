"use client";
import { usePathname, useParams } from 'next/navigation';

import { AnimatePresence } from 'framer-motion';
import BottomNavigation from './BottomNavigation';
import PageTransition from './PageTransition';
import styles from './Layout.module.css';

export default function Layout() {
    const location = { pathname: usePathname() };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <BottomNavigation />
        </div>
    );
}
