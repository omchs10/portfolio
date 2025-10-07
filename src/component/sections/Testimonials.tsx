import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative bg-indigo-50 py-16 md:py-24 overflow-hidden shadow-lg">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-700 italic mb-4 md:mb-6 text-base md:text-lg">
              "Guptally transformed our customer support with their intelligent chatbot. The efficiency gains are remarkable, and our customers love the instant, accurate responses. Truly a game-changer!"
            </p>
            <div className="flex items-center">
              <img src="https://placehold.co/60x60/E0F2FE/1E40AF?text=Client1" alt="Client 1" className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/60x60/E0F2FE/1E40AF?text=C1"; }} />
              <div>
                <p className="font-semibold text-gray-800">Jane Doe</p><p className="text-xs md:text-sm text-gray-500">CEO, Tech Innovations Inc.</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-700 italic mb-4 md:mb-6 text-base md:text-lg">
              "Their expertise in Machine Learning helped us predict equipment failures, saving us millions in potential downtime. The team is highly skilled, professional, and delivers real results."
            </p>
            <div className="flex items-center">
              <img src="https://placehold.co/60x60/E0F2FE/1E40AF?text=Client2" alt="Client 2" className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/60x60/E0F2FE/1E40AF?text=C2"; }} />
              <div>
                <p className="font-semibold text-gray-800">John Smith</p><p className="text-xs md:text-sm text-gray-500">Operations Director, Global Manufacturing Co.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};