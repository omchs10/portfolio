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
  const [isUploading, setIsUploading] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleCloseModal = () => {
    setShowResponseModal(false);
    setApiResponse(null);
    setIsUploading(false);
    setUploadStatus(null);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handlePlayAudio = () => {
    if (!apiResponse || !('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported or no response to speak.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = apiResponse;
    try {
      const parsedResponse = JSON.parse(apiResponse);
      if (parsedResponse && parsedResponse.message) {
        textToSpeak = parsedResponse.message;
      }
    } catch (e) {
      console.log('API response is not a valid JSON object with a message property. Reading the full response.');
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleUploadClick = async () => {
    setIsUploading(true);
    setUploadStatus('Initializing camera...');

    if (!videoRef.current || !canvasRef.current) {
      setUploadStatus('Error: Required elements are not ready.');
      setIsUploading(false);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      setUploadStatus('Capturing photo...');

      // Capture after a short delay to allow the camera to adjust
      setTimeout(async () => {
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

          // Stop the camera stream
          stream.getTracks().forEach(track => track.stop());

          setUploadStatus('Uploading image...');

          const response = await fetch('https://blind-ai-2-371470408138.us-central1.run.app', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageCode: base64Image,
              description: "Image captured from user's camera for analysis.",
            }),
          });

          const responseData = await response.text();

          console.log('API Response:', {
            status: response.status,
            ok: response.ok,
            body: responseData,
          });

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${responseData}`);
          }

          setApiResponse(responseData);
          setUploadStatus('Analysis complete!');
        }
      }, 500);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Upload failed:', errorMessage);
      setUploadStatus(`Error: ${errorMessage}`);
      setApiResponse(`Upload Failed:\n${errorMessage}`);
      // Keep isUploading true to show the error state until the user closes the modal
    }
  };

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
       
        {/* Hidden elements for camera capture */}
        <video ref={videoRef} style={{ display: 'none' }}></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        
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
        
          {apiResponse && !showResponseModal ? (
            <button
              onClick={() => setShowResponseModal(true)}
              className="ml-4 text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-xs rounded-md p-1"
              style={{ textAlign: 'right', marginLeft: 'auto', marginRight: '10px' }}
            >
              View Response
            </button>
          ) : (
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="ml-4 text-black hover:text-indigo-800 transition-colors duration-300 text-xs bg-gray-100 rounded-md p-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ textAlign: 'right', marginLeft: 'auto', marginRight: '10px' }}
          >
            {isUploading ? (uploadStatus || 'Uploading...') : 'Upload Photo'}
          </button>
          )}
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
        {showResponseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Response</h3>
              <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-h-96">
                {apiResponse}
              </pre>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handlePlayAudio}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  {isSpeaking ? 'Stop' : 'Play Audio'}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
