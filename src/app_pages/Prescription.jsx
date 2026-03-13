"use client";
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, Check, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import PageTransition from '../app_components/PageTransition';
import { mockApi } from '../utils/mockApi';
import { trackEvent } from '../utils/analytics';
import styles from './Prescription.module.css';

export default function Prescription() {
    const navigate = useRouter();
    const [scanning, setScanning] = useState(false);
    const [meds, setMeds] = useState([]);

    const handleBack = () => navigate('/records');

    const mockMeds = [
        { name: 'Metformin', dosage: '500mg', instructions: 'Take twice daily with meals', confidence: 98 },
        { name: 'Lisinopril', dosage: '10mg', instructions: 'Take once daily in the morning', confidence: 95 }
    ];

    const startScan = async () => {
        setScanning(true);
        trackEvent('prescription_scan_start');
        
        // Mock scan delay
        await new Promise(r => setTimeout(r, 3000));
        
        setMeds(mockMeds);
        setScanning(false);
        trackEvent('prescription_scan_complete', { count: mockMeds.length });
    };

    return (
        <PageTransition>
            <div className={styles.page}>
                <header className={styles.header}>
                    <button onClick={handleBack} className={styles.backBtn}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1>Scan Prescription</h1>
                </header>

                {!scanning && meds.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.cameraCircle}>
                            <Camera size={48} color="white" />
                        </div>
                        <h2>No prescription scanned yet</h2>
                        <p>Line up your document and tap the button below</p>
                        <button className={styles.primaryBtn} onClick={startScan}>
                            <Plus size={20} /> Start New Scan
                        </button>
                    </div>
                )}

                {scanning && (
                    <div className={styles.scanningState}>
                        <div className={styles.scannerLine}></div>
                        <Camera size={48} className={styles.scanningIcon} />
                        <p>Extracting medical details...</p>
                        <div className={styles.loadingBar}>
                            <motion.div 
                                className={styles.loadingProgress}
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 3 }}
                            />
                        </div>
                    </div>
                )}

                {meds.length > 0 && !scanning && (
                    <div className={styles.resultsList}>
                        <div className={styles.resultsHeader}>
                            <h3>Detected Medications</h3>
                            <button className={styles.rescanBtn} onClick={startScan}>Rescan</button>
                        </div>
                        
                        {meds.map((med, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.medCard}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.medMain}>
                                    <div className={styles.checkIcon}>
                                        <Check size={16} color="#10B981" />
                                    </div>
                                    <div className={styles.medInfo}>
                                        <h4>{med.name}</h4>
                                        <span className={styles.dosage}>{med.dosage}</span>
                                    </div>
                                    <div className={styles.confidenceBadge}>
                                        {med.confidence}% match
                                    </div>
                                </div>
                                <p className={styles.instructions}>
                                    <Clock size={14} /> {med.instructions}
                                </p>
                            </motion.div>
                        ))}

                        <div className={styles.warningNote}>
                            <AlertTriangle size={16} />
                            <span>Always verify extracted details with your physical prescription before taking any medication.</span>
                        </div>

                        <button className={styles.saveBtn} onClick={() => navigate('/records')}>
                            Save to Records
                        </button>
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
