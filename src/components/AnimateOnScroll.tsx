import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface AnimateOnScrollProps {
    children: ReactNode;
    delay?: number;
}

const AnimateOnScroll = ({ children, delay = 0 }: AnimateOnScrollProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    const variants: import('framer-motion').Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
};

export default AnimateOnScroll;
