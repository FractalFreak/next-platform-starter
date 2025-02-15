import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/continental.module.css';

// Initialisiere GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export default function ContinentalPage() {
    const sectionsRef = useRef([]);
    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // 1. SSR-Sicherung
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // 2. Audio-Handling
    useEffect(() => {
        if (!isMounted) return;

        audioRef.current = new Audio('/static/sounds/Baccara-Yes-Sir.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isMounted]);

    // 3. Event-Handler
    const toggleAudio = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // 4. Scroll-Animationen
    useEffect(() => {
        if (!isMounted) return;

        const sections = gsap.utils.toArray(`.${styles.contentSection}`);

        sections.forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                    markers: process.env.NODE_ENV === 'development'
                }
            });
        });

        // 5. Scroll-Lock
        const handleWheel = (e) => {
            if (e.deltaY < 0) e.preventDefault();
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isMounted]);

    // 6. ScrollSection-Komponente
    const ScrollSection = ({ children, id, title }) => (
        <section id={id} className={styles.contentSection} ref={(el) => el && sectionsRef.current.push(el)}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{title}</h2>
            </div>
            {children}
        </section>
    );

    if (!isMounted) return null;

    return (
        <div className={styles.continentalContainer} ref={containerRef}>
            {/* Audio Controls */}
            <div className={styles.audioControls}>
                <button onClick={toggleAudio}>{isPlaying ? '❚❚' : '▶'}</button>
            </div>
            {/* Hero Section */}
            <section
                className={styles.heroSection}
                style={{
                    backgroundImage: 'url("/static/images/backgrounds/the-continental-background.webp")'
                }}
            >
                <div className={styles.goldOverlay}></div>
                <nav className={styles.continentalNav}>
                    <div className={styles.navLogo}>THE CONTINENTAL</div>
                    <div className={styles.navLinks}>
                        <a href="#tokenomics">Tokenomics</a>
                        <a href="#roadmap">Roadmap</a>
                        <a href="#whitepaper">Whitepaper</a>
                    </div>
                </nav>

                <div className={styles.heroContent}>
                    <h1 className={styles.mainTitle}>MAINNET IS LIVE</h1>
                    <div className={styles.buttonGroup}>
                        <button className={styles.goldButton}>CLAIM ARTHROP</button>
                        <button className={styles.goldButton}>VISIT BERATHUB</button>
                    </div>
                </div>
            </section>
            {/* Content Sections */}
            <ScrollSection id="tokenomics" title="Tokenomics" />
            <ScrollSection id="roadmap" title="Roadmap" />
            <ScrollSection id="whitepaper" title="Whitepaper" />
            <ScrollSection id="tokenomics" title="Tokenomics">
                <div className={styles.tokenGrid}>
                    <div className={styles.tokenItem}>
                        <h3>Token Supply</h3>
                        <p>Total: 1,000,000,000 $CONT</p>
                        <p>Burned: 30%</p>
                    </div>
                    <div className={styles.tokenItem}>
                        <h3>Distribution</h3>
                        <p>Liquidity: 50%</p>
                        <p>Community: 30%</p>
                        <p>Team: 20%</p>
                    </div>
                    <div className={styles.tokenItem}>
                        <h3>Features</h3>
                        <p>0% Taxes</p>
                        <p>LP Locked</p>
                        <p>Renounced CA</p>
                    </div>
                </div>
            </ScrollSection>
            ;
        </div>
    );
}
