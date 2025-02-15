import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/continental.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContinentalPage() {
    const sectionsRef = useRef([]);
    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const toggleAudio = () => {
        if (!audioRef.current) return;
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    // Audio-Handling
    useEffect(() => {
        if (typeof window === 'undefined') return;

        audioRef.current = new Audio('/static/sounds/Baccara-Yes-Sir.mp3');
        audioRef.current.loop = true;
    }, []);

    // Scroll-Animationen
    useEffect(() => {
        gsap.utils.toArray(`.${styles.contentSection}`).forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Scroll-Lock Mechanismus
        const handleWheel = (e) => e.deltaY < 0 && e.preventDefault();
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const handleFirstInteraction = useCallback(() => {
        if (!isPlaying && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [isPlaying]);

    useEffect(() => {
        window.addEventListener('click', handleFirstInteraction);

        return () => {
            audioRef.current?.pause();
            window.removeEventListener('click', handleFirstInteraction);
        };
    }, [handleFirstInteraction]);

    const ScrollSection = ({ children, id, title }) => {
        const sectionRef = useRef(null);

        useEffect(() => {
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                }
            });
        }, []);

        return (
            <section id={id} className={styles.contentSection} ref={sectionRef}>
                {/* ... */}
            </section>
        );
    };

    return (
        <div className={styles.continentalContainer} ref={containerRef}>
            {/* Audio Controls */}
            <div className={styles.audioControls}>
                <button
                    onClick={() => {
                        isPlaying ? audioRef.current.pause() : audioRef.current.play();
                        setIsPlaying(!isPlaying);
                    }}
                >
                    {isPlaying ? '❚❚' : '▶'}
                </button>
            </div>

            {/* Hero Section */}
            <section className={styles.heroSection}>
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
            <ScrollSection id="tokenomics" title="Tokenomics">
                {/* Content here */}
            </ScrollSection>

            <ScrollSection id="roadmap" title="Roadmap">
                {/* Content here */}
            </ScrollSection>

            <ScrollSection id="whitepaper" title="Whitepaper">
                {/* Content here */}
            </ScrollSection>
        </div>
    );
}
