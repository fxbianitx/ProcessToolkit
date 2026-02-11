'use client';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

export default function Reveal({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
