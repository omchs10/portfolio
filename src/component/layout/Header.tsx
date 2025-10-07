import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon, XIcon } from '../icons/index.ts';
import { FaSearch } from 'react-icons/fa';
import './header.css'; // Import custom CSS for additional styling
import logo from './logo.png'; 

interface HeaderProps {
  onNavLinkClick: (id: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Solutions' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'careers', label: 'Careers' },
  { id: 'contact', label: 'Contact' },
];


export const Header: React.FC<HeaderProps> = ({ onNavLinkClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMobileLinkClick = (id: string) => {
    onNavLinkClick(id);
    setIsMobileMenuOpen(false);
  };

  // Define CSS classes for menu states for better readability
  const menuOpenClasses = 'opacity-100 scale-100';
  const menuClosedClasses = 'opacity-0 scale-0';

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownOptions = [
    { label: "Upwork", value: "upwork" },
    { label: "Remotely", value: "remotely" },
    { label: "LinkedIn", value: "linkedin" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md ">
      <nav className="container mx-auto px-4 flex justify-between items-center relative nav-padding">
        <a href="#home" onClick={() => onNavLinkClick('home')} className="flex items-center space-x-2" style={{ marginLeft: '5px' }}>
          <img
            src={logo}
            alt="Guptally Logo - Automation and AI"
            className="h-12 w-auto rounded-md"
            onError={(e) => { (e.target as HTMLImageElement).src="https://placehold.co/150x40/E0F2FE/1E40AF?text=Guptally"; }}
          />
        </a>
       
        
        <div className='flex '>
        
        <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center ml-4 text-black hover:text-indigo-800 transition-colors duration-300 text-xs bg-gray-100 rounded-md p-1"
              style={{ textAlign: 'right', marginLeft: 'auto', marginRight: '10px' }}
            >
              Freelancing Dashboard
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10">
                {dropdownOptions.map((option) => (
                  <a
                    key={option.value}
                    href="#"
                    className="block px-2 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
                  >
                    {option.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        
          <a          href="mailto:omchs10@gmail.com?subject=Inquiry"
            className="ml-4 text-black hover:text-indigo-800 transition-colors duration-300 text-xs bg-gray-100 rounded-md p-1"
            style={{ textAlign: 'right', marginLeft: 'auto', marginRight: '10px' }}
          >Email Us</a> 
       
          <div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none" style={{position: 'relative', top: '2.5px'}}>
              {isMobileMenuOpen ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>

          
        </div> 


        {/* Navigation Menu Dropdown - Visible on all screen sizes when open */}
        <div className={`absolute top-[70px] right-4 z-40 bg-white rounded-xl shadow-lg p-4 w-48 transform transition-all duration-300 ease-in-out origin-top-right ${isMobileMenuOpen ? menuOpenClasses : menuClosedClasses}`}>
          <nav className="flex flex-col items-start space-y-4">
          {navLinks.map(link => (
             <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleMobileLinkClick(link.id); }} className="text-gray-700 hover:text-indigo-700 font-medium text-base w-full text-left cursor-pointer"> {link.label} </a>
            ))}
          </nav>
        </div>
      </nav>
    </header>
  );
};
