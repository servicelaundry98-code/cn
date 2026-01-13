import { useState, useEffect } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Custom hook to manage anti-gravity movement.
 * @param {Object} config - Configuration object
 * @param {Object} config.initialPos - {x, y}
 * @param {boolean} config.isFloating - Whether it should float upward/idle
 */
export const useAntiGravity = ({ initialPos, isFloating = true }) => {
    const controls = useAnimation();
    const [position, setPosition] = useState(initialPos);

    useEffect(() => {
        if (isFloating) {
            // Idle floating animation (bobbing + slight upward drift possibility)
            controls.start({
                x: initialPos.x,
                y: [initialPos.y, initialPos.y - 10, initialPos.y],
                transition: {
                    x: { duration: 0.5, ease: "easeInOut" },
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }
                }
            });
        } else {
            controls.start({
                x: initialPos.x,
                y: initialPos.y,
                transition: { duration: 0.5 }
            });
        }
    }, [isFloating, controls, initialPos.x, initialPos.y]);

    const moveTo = async (targetPos, duration = 1) => {
        await controls.start({
            x: targetPos.x,
            y: targetPos.y,
            transition: { duration: duration, type: "spring", stiffness: 50 }
        });
        setPosition(targetPos);
    };

    return { controls, moveTo };
};
