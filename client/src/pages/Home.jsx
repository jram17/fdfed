// Home.js
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "../components/HeroSection";
import Features from "../components/FeaturesSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      // Hero animation (without ScrollTrigger)
      t1.addLabel("hero")
        .from("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
          delay: 0.3,
        })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 2,
        })
        .from("#tagline", { // Animate tagline after "Society Log"
          opacity: 0,
          y: "+=30",
          duration: 1.5,
        }, "-=1"); // Start tagline animation just before welcome fades in

      gsap.utils.toArray(".feature-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 1, // Scale down to create a 'bounce' effect
          duration: 1.2,
          ease: "back.out(1.7)", // Easing for a bounce effect
          scrollTrigger: {
            trigger: ".feature-card",
            start: "top 90%", // Trigger animation when the element enters the viewport
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animate "Era" in the CTA
      gsap.to("#era", {
        color: "red",
        duration: 2,
        scrollTrigger: {
            trigger: "#era",
            start: "top 80%", // Trigger CTA animation
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        // repeat: -1,
        // yoyo: true,
        ease: "power1.inOut",
      });

      // Call to Action animation triggered on scroll
      gsap.fromTo("#cta", 
        {
          opacity: 0,
        }, 
        {
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: "#cta",
            start: "top 80%", // Trigger CTA animation
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
    }, comp);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp}>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
