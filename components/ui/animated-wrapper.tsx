// src/components/AnimatedWrapper.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="layout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}