import React, { useState } from 'react';
import aboutBg from '../images/about.png';

export const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fullText = `At Guptally, we are pioneers in leveraging cutting-edge Artificial Intelligence and Machine Learning to drive unparalleled efficiency and innovation for businesses worldwide. With a profound understanding of Gen AI, Large Language Models (LLMs), and advanced ML algorithms, we specialize in transforming complex challenges into streamlined, intelligent solutions.
Our core expertise lies in system maintenance, software development, and crucially, the seamless integration of automation and AI. We empower organizations to optimize their operations, enhance customer experiences through sophisticated contact centre chatbots, and unlock new growth opportunities in the digital era.
We are committed to delivering measurable impact and building long-term partnerships, ensuring our clients stay ahead in a rapidly evolving technological landscape.`;

  const truncatedText = fullText.split(' ').slice(0, 50).join(' ') + '...';

  return (
    <>
      <section 
        id="about"
        className="relative bg-white py-4 md:py-6 overflow-hidden shadow-lg"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Guptally Software</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {truncatedText}
                <button onClick={() => setIsModalOpen(true)} className="text-indigo-600 hover:underline font-semibold ml-2">
                  Read more
                </button>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img src={aboutBg} alt="About Guptally" className="rounded-lg w-full max-w-[14rem] h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Guptally Software</h2>
            <div className="space-y-4 text-base text-gray-700 leading-relaxed max-h-[70vh] overflow-y-auto">
              {fullText.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};