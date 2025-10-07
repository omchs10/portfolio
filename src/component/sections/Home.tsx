import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/index.ts';

interface HomeProps {
  onButtonClick: () => void;
}

const carouselItems = [
  {
    title: "Guptally Software",
    subtitle: "Transforming Businesses with Intelligent Automation & AI ",
  },
  {
    title: "Generative AI Solutions",
    subtitle: "Harness the power of LLMs to build next-gen applications.",
  },
  {
    title: "Expert Chatbot Development",
    subtitle: "Enhance customer engagement with smart, responsive chatbots.",
  },
];

export const Home: React.FC<HomeProps> = ({ onButtonClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = useCallback((nextIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsFading(false);
    }, 300); // Corresponds to the fade animation duration
  }, []);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselItems.length;
      changeSlide(nextIndex);
    }, 5000);
  }, [currentIndex, changeSlide]);

  const handleNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    const nextIndex = (currentIndex + 1) % carouselItems.length;
    changeSlide(nextIndex);
    resumeTimeoutRef.current = setTimeout(startAutoPlay, 10000); // Wait 10s before resuming auto-play
  };

  const handlePrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    const nextIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    changeSlide(nextIndex);
    resumeTimeoutRef.current = setTimeout(startAutoPlay, 10000); // Wait 10s before resuming auto-play
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [startAutoPlay]);

  return (
    <section id="home" className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white pt-[50px] pb-14 md:pb-24 overflow-hidden shadow-lg">
      <div className="container mx-auto px-6 text-left relative z-10 flex items-center justify-center min-h-[300px] ">
        <button onClick={handlePrev} className="absolute left-4 md:left-8 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-20"><ChevronLeftIcon className="w-6 h-6 text-white" /></button>
        <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'} text-center`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">{carouselItems[currentIndex].title}</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">{carouselItems[currentIndex].subtitle}</p>
        </div>
        <button onClick={handleNext} className="absolute right-4 md:right-8 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-20"><ChevronRightIcon className="w-6 h-6 text-white" /></button>
      </div>
       <div className="text-center">
        <button onClick={onButtonClick} className="bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
          Get a Free Consultation
        </button>
        
      </div>
    </section>
  );
};