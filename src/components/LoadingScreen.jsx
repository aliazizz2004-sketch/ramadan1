import React from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#020617',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                overflow: 'hidden'
            }}
        >
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    zIndex: 0
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1], // Custom bounce/spring feel
                    }}
                    style={{ marginBottom: '2rem' }}
                >
                    <Moon size={100} fill="var(--primary)" color="var(--primary)" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{
                        fontSize: '3.5rem',
                        fontWeight: '900',
                        color: 'white',
                        letterSpacing: '2px',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(to bottom, #fff, var(--primary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Ramadan Kareem
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '200px' }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                    style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                        margin: '0 auto'
                    }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{
                        marginTop: '1.5rem',
                        color: 'white',
                        fontSize: '0.9rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase'
                    }}
                >
                    2026 • 1447
                </motion.p>
            </div>

            {/* Decorative Stars/Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        position: 'absolute',
                        width: '2px',
                        height: '2px',
                        background: 'white',
                        borderRadius: '50%',
                        zIndex: 0
                    }}
                />
            ))}
        </motion.div>
    );
};

export default LoadingScreen;
