import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from '../icons/index.ts';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-indigo-50 py-16 md:py-24 overflow-hidden shadow-lg">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                <MailIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm md:text-base">info@guptally.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm md:text-base">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">Visit Our Office</h3>
                <p className="text-gray-600 text-sm md:text-base">123 AI Boulevard, Suite 400, Innovation City, CA 90210</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
            <form className="space-y-4 md:space-y-6">
              <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label><input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="John Doe" /></div>
              <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label><input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="john.doe@example.com" /></div>
              <div><label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label><textarea id="message" name="message" rows={5} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="Tell us about your project or inquiry..."></textarea></div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};