import React, { useState } from 'react';
import { ChevronDown, BarChart2, Zap, Cloud } from 'lucide-react';

/**
 * Project Data Structure
 * Using hardcoded data to represent the portfolio items and their metrics.
 */
const projectData = [
  {
    id: 1,
    name: "Gemini Chatbot Engine",
    initialMetric: "12 Clients",
    shortDescription: "An advanced, scalable conversational AI engine for customer support and FAQ resolution.",
    extendedDescription: "This advanced, scalable conversational AI engine specializes in customer support and FAQ resolution, drastically reducing human intervention hours through natural language processing.",
    metrics: [
      { label: "Demos Given", value: "85", icon: <BarChart2 size={12} /> },
      { label: "Usecases Built", value: "5", icon: <Zap size={12} /> },
      { label: "Tech Stack", value: "React/TS", icon: <Cloud size={12} /> },
      { label: "Cloud Platform", value: "Google Cloud", icon: <Cloud size={12} /> },
      { label: "Delivered", value: "4", icon: <Zap size={12} /> },
      { label: "Ongoing", value: "1", icon: <Zap size={12} /> },
    ],
    demoLink: "#demo-chatbot",
  },
  {
    id: 2,
    name: "Inventory Management System",
    initialMetric: "4 Clients",
    shortDescription: "A real-time asset tracking and warehousing solution for complex supply chain logistics.",
    extendedDescription: "This comprehensive real-time asset tracking and warehousing solution is built to minimize stockouts and automate complex supply chain logistics for enterprise use cases.",
    metrics: [
      { label: "Demos Given", value: "25", icon: <BarChart2 size={12} /> },
      { label: "Usecases Built", value: "3", icon: <Zap size={12} /> },
      { label: "Tech Stack", value: "Angular/TS", icon: <Cloud size={12} /> },
      { label: "Cloud Platform", value: "AWS", icon: <Cloud size={12} /> },
      { label: "Delivered", value: "4", icon: <Zap size={12} /> },
      { label: "Ongoing", value: "1", icon: <Zap size={12} /> },
    ],
    demoLink: "#demo-inventory",
  },
  {
    id: 3,
    name: "Predictive Analytics Tool",
    initialMetric: "3 Clients",
    shortDescription: "A powerful data visualization and forecasting application using machine learning for market trends.",
    extendedDescription: "This tool is a powerful data visualization and forecasting application that uses machine learning to predict market trends and user behavior with high accuracy.",
    metrics: [
      { label: "Demos Given", value: "40", icon: <BarChart2 size={12} /> },
      { label: "Usecases Built", value: "4", icon: <Zap size={12} /> },
      { label: "Tech Stack", value: "Python/Flask", icon: <Cloud size={12} /> },
      { label: "Cloud Platform", value: "Azure", icon: <Cloud size={12} /> },
      { label: "Delivered", value: "1", icon: <Zap size={12} /> },
      { label: "Ongoing", value: "2", icon: <Zap size={12} /> },
    ],
    demoLink: "#demo-analytics",
  },
  {
    id: 4,
    name: "HR Onboarding Portal",
    initialMetric: "7 Clients",
    shortDescription: "Streamlines hiring and orientation for new employees, ensuring compliance and rapid integration.",
    extendedDescription: "This portal streamlines the hiring and orientation process for new employees, ensuring compliance and rapid integration into the company structure with minimal HR overhead.",
    metrics: [
      { label: "Demos Given", value: "65", icon: <BarChart2 size={12} /> },
      { label: "Usecases Built", value: "3", icon: <Zap size={12} /> },
      { label: "Tech Stack", value: "Vue/JS", icon: <Cloud size={12} /> },
      { label: "Cloud Platform", value: "Firebase", icon: <Cloud size={12} /> },
      { label: "Delivered", value: "7", icon: <Zap size={12} /> },
      { label: "Ongoing", value: "0", icon: <Zap size={12} /> },
    ],
    demoLink: "#demo-hr",
  },
];

/**
 * Projects Component: Displays a responsive grid of expandable product cards.
 * This component is designed to be imported into another file (e.g., App.jsx or App.tsx).
 */
export const Projects = () => {
  // State to manage which project cards are expanded. Key is ID, value is boolean.
  const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [id]: !prev[id], // Toggle the state for the specific project ID
    }));
  };

  return (
    <section id="projects" className="bg-gray-50 py-12 md:py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-2">Our Software Portfolio</h2>
        <p className="text-gray-500 text-center mb-10 text-lg">A selection of successful custom software solutions built for our clients.</p>

        {/* Product Grid - Responsive layout (1 col mobile, 2 col sm, 4 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {projectData.map((project) => {
            const isExpanded = expandedStates[project.id];
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between 
                           transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] 
                           border border-gray-200 text-sm" // Reduced card size and font
              >
                <div>
                  {/* Card Header: Project Name and Initial Metric */}
                  <div className="flex flex-row items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <span className="text-base font-bold text-indigo-600 leading-tight flex-shrink min-w-0">
                      {project.name}
                    </span>
                    {/* Initial Metric Badge (Only client count/key metric visible initially) */}
                    <div className="flex-shrink-0 ml-2">
                      <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        <span className="font-extrabold text-gray-900 mr-0.5 text-sm">{project.initialMetric.split(' ')[0]}</span>
                        {project.initialMetric.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-600 text-xs mb-3 min-h-[2.5rem] flex-grow">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Action Area (Demo Link and Expand Toggle) */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                  <a href={project.demoLink} className="w-2/3 py-1.5 px-3 bg-indigo-600 text-white font-semibold text-xs rounded-md transition-colors hover:bg-indigo-700 text-center">
                    View Demo &rarr;
                  </a>
                  <button
                    className={`p-1.5 rounded-full text-indigo-600 transition-transform duration-300 hover:bg-indigo-50 ${isExpanded ? 'transform rotate-180' : ''}`}
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${project.id}`}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                {/* Expanded Content (Hidden/Shown based on state) */}
                <div
                  id={`details-${project.id}`}
                  className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'h-auto max-h-screen pt-4 mt-3 border-t border-gray-200' : 'max-h-0 pt-0 mt-0'}`}
                  style={{ display: isExpanded ? 'block' : 'none' }} // Use style for display toggle
                >
                  <p className="text-gray-800 font-semibold mb-1 text-xs">Extended Description:</p>
                  <p className="text-gray-600 text-xs mb-3">
                    {project.extendedDescription}
                  </p>

                  {/* Expanded Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded-lg border border-gray-200 text-xs shadow-sm">
                        <div className="flex items-center text-indigo-600 font-bold mb-0.5">
                            <span className="text-lg mr-1 leading-none">{metric.value}</span>
                        </div>
                        <span className="text-gray-600 font-medium text-[0.65rem] uppercase tracking-wider">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action Button */}
        <div className="text-center mt-10">
          <button
            className="px-6 py-2 bg-white text-indigo-600 font-bold text-sm border-2 border-indigo-600 rounded-full transition-all hover:bg-indigo-600 hover:text-white shadow-md"
            onClick={() => console.log('This button would load more products via an API call.')}
          >
            Show More Projects (Demo)
          </button>
        </div>
      </div>
    </section>
  );
};

// Removed 'export default App' and changed 'const App' to 'export const Projects'
// This makes the component importable by another file like:
// import { Projects } from './Projects'; 
