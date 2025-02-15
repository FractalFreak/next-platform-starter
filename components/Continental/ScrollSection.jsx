import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/continental.module.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = ({ id, title, children }) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Animation für den Section-Titel
        gsap.from(contentRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top center+=100',
                toggleActions: 'play none none reverse',
                markers: process.env.NODE_ENV === 'development'
            }
        });

        // Parallax-Effekt für Hintergründe (Beispiel)
        gsap.to(sectionRef.current, {
            backgroundPosition: '50% 0px',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top'
            }
        });
    }, []);

    return (
        <section id={id} ref={sectionRef} className={styles.contentSection}>
            <div ref={contentRef} className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.sectionBody}>{children}</div>
            </div>
        </section>
    );
};

export default ScrollSection;
