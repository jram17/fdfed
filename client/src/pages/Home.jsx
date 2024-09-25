import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';

function Home() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
        </div>
    );
}

export default Home;


