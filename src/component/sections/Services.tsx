import React, { useState } from 'react';
import { ChevronDown, Zap, Laptop, Smartphone, LayoutDashboard, LifeBuoy, Briefcase } from 'lucide-react';

/**
 * Service Data Structure
 * Structured to support the expandable card design with key performance indicators (KPIs)
 * for the company's core areas of expertise.
 */
const serviceData = [
  {
    id: 1,
    name: "AI-Driven Automation & Intelligence",
    icon: Zap,
    iconBgColor: "bg-indigo-100 text-indigo-600",
    shortDescription: "Implementing intelligent systems to automate processes, drive decisions, and maximize resource efficiency.",
    extendedDescription: "We specialize in developing custom AI/ML models that integrate seamlessly into existing workflows. Focus areas include predictive analytics, natural language processing, and deep learning for core business functions, leading to significant efficiency gains.",
    metrics: [
      { label: "Efficiency Gain", value: "95%", unit: "Target" },
      { label: "Error Reduction", value: "80%", unit: "Avg." },
      { label: "Implementation Time", value: "6-8", unit: "Weeks" },
      { label: "Supported Integrations", value: "15+", unit: "APIs" },
    ],
    link: "#expertise-ai",
  },
  {
    id: 2,
    name: "Enterprise Software Development",
    icon: Laptop,
    iconBgColor: "bg-blue-100 text-blue-600",
    shortDescription: "Building robust, scalable, and secure custom software applications tailored to complex enterprise needs.",
    extendedDescription: "From conception to deployment, we engineer high-performance software using modern architectural patterns (Microservices, Serverless). Our focus is on long-term maintainability, security, and scalability for mission-critical operations.",
    metrics: [
      { label: "Projects Completed", value: "30+", unit: "Successfully" },
      { label: "Preferred Methodologies", value: "Agile/Scrum", unit: "Focused" },
      { label: "Average Velocity", value: "250", unit: "Pts/Sprint" },
      { label: "Deployment Frequency", value: "Daily", unit: "CD/CI" },
    ],
    link: "#expertise-software",
  },
  {
    id: 3,
    name: "Web and Mobile App Development",
    icon: Smartphone,
    iconBgColor: "bg-sky-100 text-sky-600",
    shortDescription: "Creating beautiful, high-performing web platforms and native mobile applications for all major devices.",
    extendedDescription: "We deliver exceptional user experiences (UX/UI) across web and mobile platforms (iOS, Android). Our team ensures cross-browser compatibility, blazing-fast load times, and adherence to the highest accessibility standards for a flawless user journey.",
    metrics: [
      { label: "Platforms Supported", value: "Web/iOS/Android", unit: "All Major" },
      { label: "Frontend Framework", value: "React/Vue/Angular", unit: "Expertise" },
      { label: "Design Standard", value: "Tailwind/Shadcn", unit: "Library" },
      { label: "Performance Score", value: "90+", unit: "Lighthouse" },
    ],
    link: "#expertise-web-app",
  },
  {
    id: 4,
    name: "Chatbot & Interactive Dashboard Dev",
    icon: LayoutDashboard,
    iconBgColor: "bg-purple-100 text-purple-600",
    shortDescription: "Developing intuitive dashboards and conversational interfaces that transform raw data into actionable insights and efficient communication.",
    extendedDescription: "We design and build full-featured data visualization dashboards and contact center chatbots. Dashboards provide real-time, interactive views of KPIs, while chatbots leverage LLMs to offer 24/7 service and lead generation, maximizing data utility.",
    metrics: [
      { label: "Deflection Rate", value: "70%", unit: "Chatbot Avg." },
      { label: "Conversational Flows", value: "100+", unit: "Designed" },
      { label: "Real-time Metrics", value: "1s", unit: "Latency" },
      { label: "Custom Visualizations", value: "D3/Recharts", unit: "Libraries" },
    ],
    link: "#expertise-chatbot-dash",
  },
  {
    id: 5,
    name: "Support, Maintenance, & Cloud Ops",
    icon: LifeBuoy,
    iconBgColor: "bg-green-100 text-green-600",
    shortDescription: "Comprehensive 24/7 support and managed cloud operations to ensure maximum uptime and system health.",
    extendedDescription: "Our team provides proactive monitoring, rapid incident response, performance tuning, and continuous security audits. We manage your cloud infrastructure (AWS, GCP, Azure) to optimize resource usage and guarantee service reliability under strict SLAs.",
    metrics: [
      { label: "Uptime SLA", value: "99.99%", unit: "Guaranteed" },
      { label: "Response Time", value: "5", unit: "Minutes" },
      { label: "Security Compliance", value: "SOC 2/GDPR", unit: "Standard" },
      { label: "Ticket Resolution Rate", value: "90%", unit: "First Call" },
    ],
    link: "#expertise-support",
  },
  {
    id: 6,
    name: "IT Strategy & Consultation",
    icon: Briefcase,
    iconBgColor: "bg-amber-100 text-amber-600",
    shortDescription: "Strategic planning, technology roadmap development, and digital transformation advisory services.",
    extendedDescription: "We partner with leadership to define clear, effective technology strategies that align with business goals. Services include architecture review, cloud migration strategy, governance framework creation, and vendor selection, ensuring optimal ROI.",
    metrics: [
      { label: "Strategy Alignment", value: "100%", unit: "Goal Match" },
      { label: "Cost Optimization", value: "25%", unit: "Avg. Savings" },
      { label: "Roadmap Duration", value: "3-5", unit: "Years" },
      { label: "Client Satisfaction", value: "98%", unit: "Rating" },
    ],
    link: "#expertise-consultation",
  },
];

/**
 * Services Component: Displays a responsive grid of expandable service cards,
 * featuring the company's core areas of expertise.
 */
export const Services = () => {
  // State to manage which service cards are expanded.
  const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [id]: !prev[id], // Toggle the state for the specific service ID
    }));
  };

  return (
    // Updated heading and maintained requested background color bg-indigo-50
    <section id="services" className="relative bg-indigo-50 py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Updated Page Heading for two-line summary (20% reduction) */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
          Driving Digital Transformation with <span className="text-indigo-600">Expert Software Solutions</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Specializing in AI Automation, Custom Development, and Strategic IT Consultation for Future-Proof Growth.
        </p>

        {/* Service Grid - Adjusted for 6 items (2 rows of 3 on large screens) */}
        {/* Reduced gap size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {serviceData.map((service) => {
            const isExpanded = expandedStates[service.id];
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                // Reduced padding (p-6 -> p-4) and subtle hover change
                className="lg:col-span-1 sm:col-span-1 bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between 
                           transition-all duration-300 hover:shadow-xl hover:border-indigo-400 border border-gray-100 
                           hover:translate-y-[-2px] transform text-xs h-full" 
              >
                <div>
                  {/* Icon Area - Reduced size (w-12 h-12 -> w-10 h-10) */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${service.iconBgColor} shadow-md`}>
                      {/* Reduced Icon size (size={24} -> size={20}) */}
                      <IconComponent size={20} className="text-current" />
                  </div>
                  
                  {/* Service Name - Reduced font size (text-lg -> text-base) and reduced internal spacing */}
                  <div className="flex flex-row items-start border-b border-gray-100 pb-2 mb-2">
                    <span className="text-base font-bold text-gray-800 leading-snug">
                        {service.name}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-gray-600 text-xs mb-3 min-h-[3rem] flex-grow">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Action Area (Link and Expand Toggle) */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                  <a href={service.link} className="py-1.5 px-2.5 text-indigo-600 font-semibold text-xs rounded-full transition-colors hover:bg-indigo-50 hover:text-indigo-700 text-center flex-shrink-0">
                    Know more
                  </a>
                  <button
                    className={`p-1.5 rounded-full text-indigo-600 transition-transform duration-300 hover:bg-indigo-100 ${isExpanded ? 'transform rotate-180' : ''}`}
                    onClick={() => toggleExpand(service.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${service.id}`}
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>

                {/* Expanded Content (Hidden/Shown based on state) */}
                <div
                  id={`details-${service.id}`}
                  className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'h-auto max-h-screen pt-3 mt-2 border-t border-gray-200' : 'max-h-0 pt-0 mt-0'}`}
                  style={{ display: isExpanded ? 'block' : 'none' }}
                >
                  <p className="text-gray-800 font-semibold mb-2 text-xs uppercase tracking-wider">Our Commitment:</p>
                  <p className="text-gray-700 text-xs mb-3 leading-normal">
                    {service.extendedDescription}
                  </p>

                  {/* Expanded Metrics Grid - Reduced size */}
                  <div className="grid grid-cols-2 gap-2">
                    {service.metrics.map((metric, index) => (
                      <div key={index} className="bg-white p-2 rounded-lg border border-indigo-200 text-xs shadow-sm">
                        <div className="flex items-end text-indigo-700 font-extrabold mb-0.5">
                            {/* Reduced metric value font size (text-xl -> text-lg) */}
                            <span className="text-lg leading-none">{metric.value}</span>
                            <span className="ml-1 text-xs font-normal text-indigo-500">{metric.unit}</span>
                        </div>
                        <span className="text-gray-600 font-medium text-[0.6rem] uppercase tracking-wider">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Removed Footer Action Button as requested */}
      </div>
    </section>
  );
};
