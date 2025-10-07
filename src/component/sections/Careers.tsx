import React from 'react';

export const Careers: React.FC = () => {
  return (
    <section id="careers" className="relative bg-white py-16 md:py-24 overflow-hidden shadow-lg">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Join Our Team</h2>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Are you passionate about AI, automation, and shaping the future of technology? We're looking for talented individuals to join our growing team. At Guptally, you'll work on groundbreaking projects that make a real-world impact.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Open Positions</h3>
          <ul className="list-disc list-inside text-gray-600 text-left max-w-xl mx-auto space-y-2">
            <li>AI/ML Engineer</li>
            <li>Full-Stack Developer</li>
            <li>Data Scientist</li>
            <li>Solutions Architect</li>
            <li>Technical Project Manager</li>
          </ul>
        </div>
        <a href="mailto:careers@guptally.com" className="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300">Apply Now</a>
      </div>
    </section>
  );
};