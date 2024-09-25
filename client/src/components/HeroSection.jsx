import React, { useRef, useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const HeroSection = () => {
  const titleRef = useRef(null); // Create a ref for the title
  const paragraphRef = useRef(null); // Create a ref for the paragraph

  useEffect(() => {
    console.log("HeroSection mounted"); 
    // Create a timeline for more controlled animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top center", // Adjust this if needed
        // Once the animation has completed, you can remove the trigger
        once: true, // Animation will only happen once
      },
    });

    // Animation for the title
    tl.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
    })
    .from(paragraphRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5, // Delay to start after the title animation
      ease: 'power2.out',
    });

    // Cleanup function to kill the ScrollTrigger instance when the component unmounts
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="hero-section bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 ref={titleRef} className="text-5xl font-bold mb-4">
        Welcome to Your Community Hub
      </h1>
      <p ref={paragraphRef} className="text-xl mb-8">
        Stay connected, stay informed, and manage your residence with ease.
      </p>
    </section>
  );
};

export default HeroSection;
