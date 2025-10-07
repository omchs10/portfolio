// import React, { useState } from 'react';
// import { Header } from './component/layout/Header.tsx';
// import { Footer } from './component/layout/Footer.tsx';
// import { Home } from './component/sections/Home.tsx';
// import { About } from './component/sections/About.tsx';
// import { Services } from './component/sections/Services.tsx';
// import { Projects } from './component/sections/Projects.tsx';
// import { Testimonials } from './component/sections/Testimonials.tsx';
// import { Careers } from './component/sections/Careers.tsx';
// import { Contact } from './component/sections/Contact.tsx';
// import { ChatModal } from './component/chatbot/ChatModal.tsx';
// import { MessageCircleIcon, ArrowUpIcon } from './component/icons/index.ts';
// import { useScrollToSection } from './hooks/useScrollToSection.ts';

// const App = () => {
//   const [showChatModal, setShowChatModal] = useState(false);
//   const { scrollToSection } = useScrollToSection();

//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-inter text-gray-900 antialiased">
//       <Header onNavLinkClick={scrollToSection} />

//       <main className="pt-[20px]">
//         <Home onButtonClick={() => scrollToSection('contact')} />
//         <About />
//         <Services />
//         <Projects />
//         <Testimonials />
//         <Careers />
//         <Contact />
//       </main>

//       <div
//         className="fixed bottom-[80px] right-6 bg-gray-400 text-white p-3 md:p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 z-50 group"
//         onClick={handleScrollToTop}
//         title="Goto Top"
//       >
//         <ArrowUpIcon className="w-3 h-3 md:w-3 md:h-3" />
//       </div>

//       <div
//         className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 md:p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 z-50"
//         onClick={() => setShowChatModal(true)}
//         title="Ask me Anything"
//       >
//         <MessageCircleIcon className="w-3 h-3 md:w-3 md:h-3" />
//       </div>

//       {showChatModal && <ChatModal onClose={() => setShowChatModal(false)} />}

//       <Footer />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useRef } from 'react';

// Inlined SVG Icons to avoid external dependencies
const DashboardIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="7" height="9" rx="1" ry="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" ry="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" ry="1" />
        <path d="M3 12h7v9H3z" />
    </svg>
);

const HistoryIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v5h5M3 3a10 10 0 0 1 18 0" />
        <path d="M21 21v-5h-5M21 21a10 10 0 0 1-18 0" />
    </svg>
);

const UploadIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);

const FileTextIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const TrashIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const RefreshCcwIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const PlayIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const DownloadIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronLeftIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronsLeftIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
  </svg>
);

const ChevronsRightIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
  </svg>
);

const MenuIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

const XIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const PlusIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ZapIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const HappyFaceIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

const UnhappyFaceIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

const FileIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
    </svg>
);

const DiscIcon = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const MessageCircleIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const FilterIcon = ({ size = 14, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const SlidersIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

// New Icons for Call Metrics
const ClockIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DatabaseIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const GlobeIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CalendarIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Utility function to generate dummy data
const generateDummyData = () => {
    const statuses = ['Processing', 'Processed', 'Failed', 'Uploading'];
    const fileTypes = ['Generic', 'Medical'];
    const lobs = ['Healthcare', 'Finance', 'Tech Support', 'Retail'];
    const languages = ['en', 'es', 'fr'];
    const topicsPool = [
        'Billing', 'Claim', 'Charge', 'Account', 'Payment', 'Insurance',
        'Support', 'Bug', 'Outage', 'Login', 'Password', 'Software',
        'Inquiry', 'Pricing', 'Subscription', 'Features', 'Discount', 'Shipping',
        'Appointment', 'Referral', 'Prescription', 'Refill', 'Doctor', 'Schedule'
    ];
    const hotTopicsPool = [
        'Urgent', 'Complaint', 'Fraud', 'Cancel', 'Refund', 'Escalation'
    ];
    const orgs = ['Acme Corp', 'Globex Inc.', 'Stark Industries'];
    const locations = ['New York', 'London', 'Tokyo', 'Mumbai'];
    const channels = ['Phone', 'Chat', 'Email'];
    const users = ['John Doe', 'Jane Smith', 'Peter Jones', 'Mary Williams'];

    const data = [];
    for (let i = 1; i <= 35; i++) {
        const sentimentScores = { positive: Math.random(), neutral: Math.random(), negative: Math.random() };
        const sum = sentimentScores.positive + sentimentScores.neutral + sentimentScores.negative;
        const normalizedScores = { positive: sentimentScores.positive / sum, neutral: sentimentScores.neutral / sum, negative: sentimentScores.negative / sum };
        const dominantSentiment = Object.keys(normalizedScores).reduce((a, b) => normalizedScores[a] > normalizedScores[b] ? a : b);
        const customerSentiment = dominantSentiment.charAt(0).toUpperCase() + dominantSentiment.slice(1);
        const agentSentiment = ['Positive', 'Negative', 'Neutral'][Math.floor(Math.random() * 3)];
        
        const type = fileTypes[Math.floor(Math.random() * fileTypes.length)];
        const lang = languages[Math.floor(Math.random() * languages.length)];
        const lob = lobs[Math.floor(Math.random() * lobs.length)];
        
        const generateTopics = (pool, count) => Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]);
        
        const customerTopics = generateTopics(topicsPool, Math.floor(Math.random() * 10) + 5);
        const agentTopics = generateTopics(topicsPool, Math.floor(Math.random() * 10) + 5);
        const customerHotTopics = generateTopics(hotTopicsPool, Math.floor(Math.random() * 3));
        const agentHotTopics = generateTopics(hotTopicsPool, Math.floor(Math.random() * 2));

        const uploadTime = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30); // Last 30 days
        data.push({
            id: i,
            fileName: `Transcript_${i}.wav`,
            fileType: type,
            lob: lob,
            customerOverallSentiment: customerSentiment,
            agentOverallSentiment: agentSentiment,
            customerTopicsCount: new Set(customerTopics).size,
            agentTopicsCount: new Set(agentTopics).size,
            uploadTime: uploadTime,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            language: lang,
            fileSize: `${(Math.random() * 10 + 2).toFixed(2)} MB`,
            conversationDuration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            transcript: `[00:00:10] Customer: Hello, I have a question about my recent medical bill. It seems incorrect. [00:00:25] Agent: I can help with that. Could you please provide your account number? [00:00:40] Customer: It's 12345. [00:00:50] Agent: Thank me. Let me check that for you. [00:01:15] Customer: Also, I'm worried about the service outage I experienced last week. [00:01:30] Agent: I understand. I'll check on that for you as well. [00:02:00] Customer: What's the status of my claim? [00:02:15] Agent: Let me pull that up. It seems to be in a pending state. I will expedite the process. [00:02:30] Customer: That's great, thanks! [00:02:45] Agent: My pleasure. Is there anything else I can assist you with today? [00:03:00] Customer: No, that's all. Thank you for your help. [00:03:10] Agent: You're welcome. Have a great day.`,
            summary: 'The customer called to dispute a charge on their medical bill. The agent successfully located the account and initiated a review of the charges.',
            memberInfo: { memberId: `M-${1000 + i}`, policyNumber: `P-${2000 + i}`, callReason: 'Billing Dispute' },
            sentimentsBreakdown: { customer: normalizedScores, agent: { positive: Math.random(), neutral: Math.random(), negative: Math.random() } },
            topics: { customer: customerTopics, agent: agentTopics },
            hotTopics: { customer: customerHotTopics, agent: agentHotTopics },
            org: orgs[Math.floor(Math.random() * orgs.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            channel: channels[Math.floor(Math.random() * channels.length)],
            uploadedBy: users[Math.floor(Math.random() * users.length)],
        });
    }
    return data;
};

// Reusable Metric Container Component
const MetricContainer = ({ icon, title, value, tooltip, onMenuClick, isActionable = false }) => (
    <div className={`tooltip-container flex-none w-60 ${isActionable ? 'cursor-pointer' : ''}`} onClick={isActionable ? onMenuClick : null}>
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-gray-200 h-32 w-full text-center transition-all duration-300 transform hover:scale-105">
            <div className="mb-2 h-8 w-8 flex items-center justify-center">{icon}</div>
            <div className="text-xl md:text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">{title}</div>
        </div>
        <span className="tooltip-text">{tooltip}</span>
    </div>
);

// New Reusable Component for Call Metrics
const CallMetric = ({ icon, title, value, onClick, isActionable = false }) => (
    <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-md border border-gray-200 flex-1 min-w-[140px] text-center ${isActionable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={isActionable ? onClick : null}>
        <div className="mb-1 h-7 w-7 flex items-center justify-center">{icon}</div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-sm font-semibold text-gray-800 mt-1">{value}</div>
    </div>
);


const getArcPath = (startPercent, endPercent, radius) => {
    const startAngle = startPercent * 2 * Math.PI;
    const endAngle = endPercent * 2 * Math.PI;
    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius + radius * Math.sin(endAngle);
    const largeArcFlag = endPercent - startPercent > .5 ? 1 : 0;
    return `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
};

// Reusable Pie Chart Component
const SentimentPieChart = ({ sentimentBreakdown, title, type, onActionRequest, onDirectInsight }) => {
    const { positive, neutral, negative } = sentimentBreakdown;
    const total = (positive || 0) + (neutral || 0) + (negative || 0);
    const handleAction = onActionRequest || ((e, ...args) => onDirectInsight(...args));
    
    if (total === 0) return <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px]"><p className="text-gray-500 text-sm">No data available.</p></div>;

    const positivePercent = (positive / total);
    const neutralPercent = (neutral / total);

    const legendData = [
        { label: 'Positive', color: '#22c55e', value: (positivePercent * 100).toFixed(1) },
        { label: 'Neutral', color: '#eab308', value: (neutralPercent * 100).toFixed(1) },
        { label: 'Negative', color: '#ef4444', value: ((1 - positivePercent - neutralPercent) * 100).toFixed(1) },
    ];
    
    const pieData = [
        { percent: positivePercent, color: '#22c55e', label: 'Positive' },
        { percent: neutralPercent, color: '#eab308', label: 'Neutral' },
        { percent: 1 - positivePercent - neutralPercent, color: '#ef4444', label: 'Negative' }
    ];

    let cumulativePercent = 0;

    return (
        <div className="flex flex-col items-center justify-start pt-4 w-full h-full min-h-[300px]">
          <h3 className="text-sm md:text-lg font-semibold mb-4 text-gray-700">{title}</h3>
            <svg viewBox="0 0 100 100" className="w-52 h-52">
                {pieData.map((slice, index) => {
                    if (slice.percent === 0) return null;
                    const path = getArcPath(cumulativePercent, cumulativePercent + slice.percent, 50);
                    cumulativePercent += slice.percent;
                    return (
                        <path key={index} d={path} fill={slice.color} className="cursor-pointer" onClick={(e) => handleAction(e, slice.label, `${type}OverallSentiment`, `${slice.label} ${type}`)} />
                    );
                })}
            </svg>
          <div className="flex flex-wrap justify-center mt-4 gap-x-4 gap-y-2">
            {legendData.map((item) => (
              <div key={item.label} onClick={(e) => handleAction(e, item.label, `${type}OverallSentiment`, `${item.label} ${type}`)} className={`flex items-center space-x-2 p-1 rounded-md cursor-pointer hover:bg-gray-100`}>
                <span className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></span>
                <span className="text-xs text-gray-700">{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
    );
};


// Reusable Topic Word Cloud Component
const WordCloud = ({ title, topics, isHotTopics = false, onAddTopic, onActionRequest, type }) => {
    const [wordData, setWordData] = useState([]);

    useEffect(() => {
        if (!topics || topics.length === 0) {
            setWordData([]);
            return;
        }

        const counts = topics.reduce((acc, topic) => {
            const key = isHotTopics ? topic.topic : topic;
            if (!acc[key]) {
                acc[key] = { count: 0, source: isHotTopics ? topic.source : null };
            }
            acc[key].count++;
            return acc;
        }, {});

        const total = topics.length;
        const processedData = Object.entries(counts).map(([word, data]) => ({
            text: word,
            value: (data.count / total) * 100,
            source: data.source
        })).sort((a, b) => b.value - a.value);

        setWordData(processedData);
    }, [topics, isHotTopics]);

    const getColor = (word) => {
        if (isHotTopics) {
            return word.source === 'customer' ? 'text-yellow-600' : 'text-red-600';
        }
        const colors = ['text-blue-600', 'text-indigo-600', 'text-purple-600', 'text-teal-600', 'text-sky-600'];
        const hash = word.text.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        return colors[Math.abs(hash) % colors.length];
    };

    const getFontSize = (percentage) => {
        const minSize = 12; // 0.75rem
        const maxSize = 36; // 2.25rem
        return `${minSize + (maxSize - minSize) * Math.sqrt(percentage / 100)}px`;
    };

    return (
        <div className="relative bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex-1 flex flex-col items-center justify-start min-h-[250px] text-center transition-all duration-300 transform hover:scale-105">
            <h3 className="text-sm md:text-lg font-semibold mb-2 text-gray-700">{title}</h3>
            {isHotTopics && (
                <div className="text-xs text-gray-500 mb-2 flex items-center space-x-4">
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span><span>Customer</span></span>
                    <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-red-400"></span><span>Agent</span></span>
                </div>
            )}
            <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 p-2 overflow-y-auto w-full">
                {wordData.length > 0 ? wordData.map((word, i) => (
                    <div key={i} className="relative group cursor-pointer" onClick={(e) => onActionRequest && onActionRequest(e, word.text, type, word.text)}>
                        <span className={`font-bold transition-colors duration-200 ${getColor(word)}`} style={{ fontSize: getFontSize(word.value), lineHeight: '1.2' }}>
                            {word.text}
                        </span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                            {word.value.toFixed(1)}%
                        </span>
                    </div>
                )) : <p className="text-gray-500 text-sm mt-8">No topics found.</p>}
            </div>
            {isHotTopics && onAddTopic && (
                <button onClick={onAddTopic} className="absolute bottom-2 right-2 p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors">
                    <PlusIcon />
                </button>
            )}
        </div>
    );
};

// Spinner for loading states
const Spinner = () => (
    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// Main App Component
const App = () => {
    const [page, setPage] = useState('dashboard');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayUploadModal, setDisplayUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [language, setLanguage] = useState('');
    const [lob, setLob] = useState('');
    
    // Filtering and Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterField, setFilterField] = useState(null);
    const [selectedLOB, setSelectedLOB] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');
    const [selectedFileType, setSelectedFileType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedCustomerSentiment, setSelectedCustomerSentiment] = useState('');
    const [selectedAgentSentiment, setSelectedAgentSentiment] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedChannel, setSelectedChannel] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [topNValue, setTopNValue] = useState(5);
    const [topNCategory, setTopNCategory] = useState('');
    
    const [activeTab, setActiveTab] = useState(0);
    
    // History Page State
    const [historySearchTerm, setHistorySearchTerm] = useState('');
    const [historySelectedLOB, setHistorySelectedLOB] = useState('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const [showFileDropdown, setShowFileDropdown] = useState(false);
    const [fileSearchTerm, setFileSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const metricsContainerRef = useRef(null);
    const individualMetricsRef = useRef(null);
    
    // Modal States
    const [displayAddHotTopicModal, setDisplayAddHotTopicModal] = useState(false);
    const [newHotTopic, setNewHotTopic] = useState('');
    const [hotTopicType, setHotTopicType] = useState('customer');
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);

    // Insights and Actions State
    const [optionsMenu, setOptionsMenu] = useState(null); // { x, y, value, field, title }
    const [showInsightsModal, setShowInsightsModal] = useState(false);
    const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
    const [insightsContent, setInsightsContent] = useState("");
    const [insightsTitle, setInsightsTitle] = useState("");
    const [isApplyingInsights, setIsApplyingInsights] = useState(false);
    const [applyInsightsStatus, setApplyInsightsStatus] = useState('');

    useEffect(() => {
        const dummyFiles = generateDummyData();
        setFiles(dummyFiles);
        setSelectedFile(dummyFiles[0] || null);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowFileDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);
    
    // Effect to close the options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setOptionsMenu(null);
        if (optionsMenu) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [optionsMenu]);

    const showOptions = (e, value, field, title) => {
        e.stopPropagation(); // Prevent the window click listener from firing immediately
        setOptionsMenu({
            x: e.clientX,
            y: e.clientY,
            value,
            field,
            title
        });
    };
    
    const scrollMetrics = (direction) => {
        if (metricsContainerRef.current) {
            const scrollAmount = 260;
            metricsContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollIndividualMetrics = (direction) => {
        if (individualMetricsRef.current) {
            const scrollAmount = 156;
            individualMetricsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const showUploadModal = () => {
        setUploadedFile(null);
        setFileType('');
        setLanguage('');
        setLob('');
        setUploadProgress(0);
        setUploading(false);
        setDisplayUploadModal(true);
    };

    const handleFileUpload = (e) => setUploadedFile(e.target.files[0]);
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setUploadedFile(e.dataTransfer.files[0]);
        }
    };

    const handleUploadButtonClick = () => {
        if (!uploadedFile || !fileType || !language || !lob) return;
        setUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setUploading(false);
                    setDisplayUploadModal(false);
                    const newFile = {
                        id: files.length + 1, fileName: uploadedFile.name, fileType, lob,
                        customerOverallSentiment: 'Processing', agentOverallSentiment: 'Processing',
                        customerTopicsCount: 0, agentTopicsCount: 0,
                        uploadTime: new Date(), status: 'Processing', language,
                        fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
                        conversationDuration: '-', transcript: 'Processing...', summary: 'Processing...',
                        memberInfo: 'Processing...', sentimentsBreakdown: {},
                        topics: { customer: [], agent: [] }, hotTopics: { customer: [], agent: [] }
                    };
                    setFiles(prevFiles => [newFile, ...prevFiles]);
                }, 500);
            }
        }, 300);
    };

    const deleteFile = (file) => {
        setFileToDelete(file);
        setShowDeleteConfirmModal(true);
    };

    const confirmDelete = () => {
        if (fileToDelete) {
            setFiles(files.filter(f => f.id !== fileToDelete.id));
            if (selectedFile && selectedFile.id === fileToDelete.id) setSelectedFile(null);
        }
        setFileToDelete(null);
        setShowDeleteConfirmModal(false);
    };

    const viewFile = (rowData) => {
        setSelectedFile(rowData);
        setActiveTab(1);
        setPage('dashboard');
    };

    const refreshFile = (rowData) => {
        setFiles(files.map(f =>
            f.id === rowData.id ? { ...f, status: 'Processing', customerOverallSentiment: 'Processing', agentOverallSentiment: 'Processing' } : f
        ));
    };

    const sortData = (field) => {
        const order = sortKey === field && sortOrder === 1 ? -1 : 1;
        setSortKey(field);
        setSortOrder(order);
    };

    const handleAddHotTopic = () => {
        if (!newHotTopic.trim()) return;
        const updatedFiles = files.map(file => {
            if (selectedFile && file.id === selectedFile.id) {
                const updatedHotTopics = {
                    ...file.hotTopics,
                    [hotTopicType]: [...(file.hotTopics[hotTopicType] || []), newHotTopic.trim()]
                };
                const updatedFile = { ...file, hotTopics: updatedHotTopics };
                setSelectedFile(updatedFile);
                return updatedFile;
            }
            return file;
        });
        setFiles(updatedFiles);
        setNewHotTopic('');
        setDisplayAddHotTopicModal(false);
    };

    const applyFilter = (value, field) => {
        setSearchTerm(value);
        setFilterField(field);
    };

    const clearFilter = () => {
        setSearchTerm('');
        setFilterField(null);
    };

    const overallFilteredFiles = files.filter(file => {
        const timePeriodMatch = () => {
            if (selectedTimePeriod === 'all') return true;
            const now = new Date();
            const fileDate = new Date(file.uploadTime);
            let startDate = new Date();
            if (selectedTimePeriod === 'today') {
                return fileDate.toDateString() === now.toDateString();
            }
            if (selectedTimePeriod === '7d') startDate.setDate(now.getDate() - 7);
            else if (selectedTimePeriod === '30d') startDate.setDate(now.getDate() - 30);
            return fileDate >= startDate;
        };

        let clickFilterMatch = true;
        if (filterField && searchTerm) {
            const fieldMap = {
                customerOverallSentiment: file.customerOverallSentiment,
                agentOverallSentiment: file.agentOverallSentiment,
                customerTopics: file.topics.customer,
                agentTopics: file.topics.agent,
                hotTopics: [...file.hotTopics.customer, ...file.hotTopics.agent],
            };
            const value = fieldMap[filterField];
            clickFilterMatch = Array.isArray(value) ? value.includes(searchTerm) : value === searchTerm;
        }
        
        const textSearchMatch = searchTerm && !filterField ? Object.values(file).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())) : true;

        return (
            (selectedLOB ? file.lob === selectedLOB : true) &&
            (selectedLanguage ? file.language === selectedLanguage : true) &&
            (selectedFileType ? file.fileType === selectedFileType : true) &&
            (selectedStatus ? file.status === selectedStatus : true) &&
            (selectedCustomerSentiment ? file.customerOverallSentiment === selectedCustomerSentiment : true) &&
            (selectedAgentSentiment ? file.agentOverallSentiment === selectedAgentSentiment : true) &&
            (selectedOrg ? file.org === selectedOrg : true) &&
            (selectedLocation ? file.location === selectedLocation : true) &&
            (selectedChannel ? file.channel === selectedChannel : true) &&
            (selectedUser ? file.uploadedBy === selectedUser : true) &&
            timePeriodMatch() &&
            clickFilterMatch &&
            textSearchMatch
        );
    });
    
    // Apply Top N filter separately after all other filters
    const finalFilteredFiles = (() => {
        if (!topNCategory || !topNValue) return overallFilteredFiles;

        const categoryMap = {
            customerTopics: file => file.topics.customer,
            agentTopics: file => file.topics.agent,
            customerSentiment: file => [file.customerOverallSentiment],
            agentSentiment: file => [file.agentOverallSentiment],
        };

        const getCategoryItems = categoryMap[topNCategory];
        if (!getCategoryItems) return overallFilteredFiles;

        const freqMap = overallFilteredFiles
            .flatMap(getCategoryItems)
            .reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});

        const topItems = Object.entries(freqMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topNValue)
            .map(entry => entry[0]);

        return overallFilteredFiles.filter(file => 
            getCategoryItems(file).some(item => topItems.includes(item))
        );
    })();


    const historyFilteredFiles = files.filter(file => {
        const searchMatch = Object.values(file).some(val =>
            String(val).toLowerCase().includes(historySearchTerm.toLowerCase())
        );
        const lobMatch = historySelectedLOB ? file.lob === historySelectedLOB : true;
        return searchMatch && lobMatch;
    });
    
    const sortedHistoryFiles = [...historyFilteredFiles].sort((a, b) => {
        if (!sortKey) return 0;
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (sortKey === 'uploadTime') {
            return (new Date(valA).getTime() - new Date(valB).getTime()) * sortOrder;
        }
        if (typeof valA === 'string') {
            return valA.localeCompare(valB) * sortOrder;
        }
        return (valA - valB) * sortOrder;
    });


    const totalFilesUploaded = finalFilteredFiles.length;
    const totalFileSize = finalFilteredFiles.reduce((sum, file) => sum + (parseFloat(file.fileSize) || 0), 0).toFixed(2);
    const totalCustomerTopics = finalFilteredFiles.reduce((sum, file) => sum + (file.topics?.customer?.length || 0), 0);
    const totalAgentTopics = finalFilteredFiles.reduce((sum, file) => sum + (file.topics?.agent?.length || 0), 0);
    const totalHappyCustomers = finalFilteredFiles.filter(f => f.customerOverallSentiment === 'Positive').length;
    const totalUnhappyCustomers = finalFilteredFiles.filter(f => f.customerOverallSentiment === 'Negative').length;

    const sentimentCounts = finalFilteredFiles.reduce((acc, file) => {
        acc.customer[file.customerOverallSentiment] = (acc.customer[file.customerOverallSentiment] || 0) + 1;
        acc.agent[file.agentOverallSentiment] = (acc.agent[file.agentOverallSentiment] || 0) + 1;
        return acc;
    }, { customer: {}, agent: {} });

    // --- LLM Insights Logic ---
    const summarizeDataForLLM = (data, source) => {
        if(source === 'individual') {
             return `
                File Name: ${data.fileName}
                LOB: ${data.lob}
                Customer Sentiment: ${data.customerOverallSentiment}
                Agent Sentiment: ${data.agentOverallSentiment}
                Top Customer Topics: ${[...new Set(data.topics.customer)].slice(0,3).join(', ')}
                Summary: ${data.summary}
            `;
        }

        if (data.length === 0) return "No data available for the current filters.";

        const total = data.length;
        const lobs = data.reduce((acc, item) => { acc[item.lob] = (acc[item.lob] || 0) + 1; return acc; }, {});
        const customerTopics = data.flatMap(item => item.topics.customer).reduce((acc, topic) => { acc[topic] = (acc[topic] || 0) + 1; return acc; }, {});
        
        const topLOB = Object.entries(lobs).sort((a,b) => b[1] - a[1])[0];
        const topTopics = Object.entries(customerTopics).sort((a,b) => b[1] - a[1]).slice(0, 3).map(t => t[0]);

        return `
            Total interactions: ${total}.
            Top LOB: ${topLOB ? `${topLOB[0]} (${((topLOB[1]/total)*100).toFixed(0)}%)` : 'N/A'}.
            Top 3 Customer Topics: ${topTopics.length > 0 ? topTopics.join(', ') : 'N/A'}.
        `;
    };

    const fetchLLMInsights = (context) => {
        console.log("Sending to LLM:", context);
        const { primaryFilter, activeFilters, dataSummary, source } = context;

        let prompt;
        if(source === 'individual'){
            prompt = `
            As a senior data analyst, provide concise, actionable insights for a single interaction.
            The user is asking for insights specifically about "${primaryFilter.title}" within this one interaction.
            Here is a summary of the interaction:
            ${dataSummary}
            Based on this information, what is a key observation about "${primaryFilter.title}" in this specific call?
            `;
        } else {
             prompt = `
                As a senior data analyst, provide concise, actionable insights based on the following data snapshot from an interaction analytics dashboard.
                The user is asking for insights specifically about "${primaryFilter.title}".
                Current active filters are:
                - Line of Business (LOB): ${activeFilters.lob || 'All'}
                - Language: ${activeFilters.language || 'All'}
                - Search Term: ${activeFilters.searchTerm || 'None'}
                Here is a summary of the data matching these criteria:
                ${dataSummary}
                Based on all this information, what are the key drivers and recommended actions related to "${primaryFilter.title}"? Structure your response in a few bullet points.
            `;
        }
        
        console.log("Generated Prompt:", prompt);

        return new Promise(resolve => {
            setTimeout(() => {
                let dummyResponse = "";
                if(source === 'individual'){
                     dummyResponse = `
                        <p class="mb-2">For this specific interaction about <strong>${primaryFilter.title}</strong>:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-600">
                            <li>The customer's sentiment was <strong>${context.data.customerOverallSentiment}</strong> while discussing this topic.</li>
                            <li>The agent's handling of the "${primaryFilter.title}" query appears to have been effective, as shown by the interaction summary.</li>
                            <li>This specific case seems well-handled, but monitoring the "${primaryFilter.title}" topic across all calls is recommended to spot wider trends.</li>
                        </ul>
                    `;
                }
                else if (primaryFilter.field.includes('Sentiment')) {
                    dummyResponse = `
                        <p class="mb-2">Analysis of interactions with <strong>${primaryFilter.value.toLowerCase()}</strong> sentiment reveals several key patterns:</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-600">
                            <li>The <strong>Finance LOB</strong> is disproportionately represented in this sentiment category, especially with the "${activeFilters.lob || 'All'}" filter applied.</li>
                            <li>The most frequently mentioned topics in these interactions are <strong>"Billing", "Charge", and "Payment"</strong>. This points towards a potential problem with the new billing system.</li>
                            <li>A recommendation would be to form a task force to review recent billing-related complaints from the Finance LOB to identify and rectify the root cause.</li>
                        </ul>
                    `;
                } else if (primaryFilter.field.includes('Topics')) {
                     dummyResponse = `
                        <p class="mb-2">Here are some insights regarding the topic "<strong>${primaryFilter.title}</strong>":</p>
                        <ul class="list-disc list-inside space-y-2 text-gray-600">
                            <li>This topic appears most frequently in the <strong>${activeFilters.lob || 'Tech Support'} LOB</strong>.</li>
                            <li>It has a strong correlation with <strong>negative sentiment</strong>, indicating it's a significant pain point for customers.</li>
                            <li>Consider creating a dedicated knowledge base article or agent script to handle queries about "<strong>${primaryFilter.title}</strong>" more efficiently.</li>
                        </ul>
                    `;
                } else {
                    dummyResponse = `<p>No specific insights pattern found for "${primaryFilter.title}". Consider refining your filters for a more detailed analysis.</p>`;
                }
                resolve(dummyResponse);
            }, 2500); // Simulate 2.5 second delay
        });
    };
    
    const generateInsights = async (value, field, title, source = 'overall') => {
        setShowInsightsModal(true);
        setIsGeneratingInsights(true);
        setInsightsTitle(`Insights for: ${title}`);
        
        const dataForSummary = source === 'individual' ? selectedFile : finalFilteredFiles;

        const context = {
            primaryFilter: { value, field, title },
            activeFilters: {
                lob: selectedLOB,
                language: selectedLanguage,
                searchTerm: searchTerm && !filterField ? searchTerm : null,
            },
            dataSummary: summarizeDataForLLM(dataForSummary, source),
            source: source,
            data: source === 'individual' ? selectedFile : null,
        };
        
        const llmResponse = await fetchLLMInsights(context);
        
        setInsightsContent(llmResponse);
        setIsGeneratingInsights(false);
    };

    const handleIndividualInsightRequest = (e, value, field, title) => {
        generateInsights(value, field, title, 'individual');
    };

    const handleApplyInsights = () => {
        setIsApplyingInsights(true);
        setApplyInsightsStatus('Applying...');
        setTimeout(() => {
            setApplyInsightsStatus('Workflow Initiated ✔');
            setTimeout(() => {
                setApplyInsightsStatus('');
                setIsApplyingInsights(false);
            }, 2000);
        }, 2000);
    };

    // --- End LLM Logic ---
    
    const FileDropdown = () => {
        const filteredForDropdown = files.filter(file => file.fileName.toLowerCase().includes(fileSearchTerm.toLowerCase()));
        return (
            <div className="relative w-[300px]" ref={dropdownRef}>
                <button onClick={() => setShowFileDropdown(!showFileDropdown)} className="w-full py-2 px-3 rounded-xl border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center">
                    {selectedFile ? selectedFile.fileName : 'Select a File'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${showFileDropdown ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {showFileDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                        <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
                            <input type="text" className="w-full py-1 pr-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search files..." value={fileSearchTerm} onChange={(e) => setFileSearchTerm(e.target.value)} />
                        </div>
                        {filteredForDropdown.length > 0 ? (
                            <ul>
                                {filteredForDropdown.map(file => (
                                    <li key={file.id} onClick={() => { setSelectedFile(file); setShowFileDropdown(false); }} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 text-sm text-gray-800">
                                        <span>{file.fileName}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <div className="p-2 text-gray-500 text-sm">No files found.</div>}
                    </div>
                )}
            </div>
        );
    };

    const parseTranscript = (transcript) => {
        if (!transcript) return [];
        const regex = /\[(\d{2}:\d{2}:\d{2})\]\s(Customer|Agent):\s(.*?(?=\[\d{2}:\d{2}:\d{2}\]|$))/g;
        const messages = [];
        let match;
        while ((match = regex.exec(transcript)) !== null) {
            messages.push({ timestamp: match[1], speaker: match[2], message: match[3].trim() });
        }
        return messages;
    };

    const getSentimentClass = (sentiment) => {
        const classes = { 'Positive': 'text-green-600', 'Negative': 'text-red-600', 'Neutral': 'text-yellow-600' };
        return `${classes[sentiment] || 'text-gray-500'} font-semibold`;
    };
    
    const uniqueLOBs = [...new Set(files.map(f => f.lob))];
    const uniqueLanguages = [...new Set(files.map(f => f.language))];
    const uniqueFileTypes = [...new Set(files.map(f => f.fileType))];
    const uniqueStatuses = [...new Set(files.map(f => f.status))];
    const uniqueOrgs = [...new Set(files.map(f => f.org))];
    const uniqueLocations = [...new Set(files.map(f => f.location))];
    const uniqueChannels = [...new Set(files.map(f => f.channel))];
    const uniqueUsers = [...new Set(files.map(f => f.uploadedBy))];

    const CustomerInsightsContainer = ({file}) => {
        if(!file) return null;
        const getInsightText = () => {
            if(file.customerOverallSentiment === 'Negative'){
                if(file.lob === 'Finance' && file.topics.customer.includes('Billing')){
                    return "Customer is unhappy due to a billing issue. Suggestion: Offer a one-time 10% discount on the disputed amount and schedule a follow-up call with a senior billing specialist to resolve the issue permanently.";
                }
                return "Customer sentiment is negative. Suggestion: Empathize with the customer's frustration and offer a direct line to a supervisor to ensure their issue is prioritized.";
            }
            if(file.customerOverallSentiment === 'Neutral'){
                return "Customer sentiment is neutral. Opportunity: Proactively offer a small complimentary service or feature to improve their experience and convert them to a positive sentiment.";
            }
            return "Customer sentiment is positive. Action: Thank the customer for their loyalty and consider sending a follow-up email with a thank you note to solidify the positive relationship.";
        };

        return (
            <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-200">
                <h4 className="text-sm md:text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <ZapIcon className="text-blue-600"/>
                    Insights for Customer
                </h4>
                <p className="text-gray-600 text-xs mb-4">{getInsightText()}</p>
                <div className="flex justify-end items-center">
                    {applyInsightsStatus && <span className="text-green-600 text-sm font-semibold mr-4">{applyInsightsStatus}</span>}
                    <button 
                        onClick={handleApplyInsights} 
                        disabled={isApplyingInsights}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isApplyingInsights && <Spinner />}
                        {isApplyingInsights ? 'Applying...' : 'Apply Insights'}
                    </button>
                </div>
            </div>
        )
    };

    return (
        <div className="flex h-screen w-full bg-gray-100 font-sans text-sm md:text-base">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
                body { font-family: 'Inter', sans-serif; }
                .tooltip-container { position: relative; }
                .tooltip-text { visibility: hidden; background-color: #374151; color: #fff; text-align: center; border-radius: 6px; padding: 4px 8px; position: absolute; z-index: 10; bottom: 125%; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.3s; white-space: nowrap; font-size: 0.75rem; }
                .tooltip-container:hover .tooltip-text { visibility: visible; opacity: 1; }
                .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 99; }
                .modal-content { background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 90%; max-width: 520px; padding: 24px; }
                .responsive-table-container { overflow-x: auto; }
                .scrollbar-container { overflow-y: auto; height: calc(100vh - 50px); }
                .chat-bubble-agent { background-color: #e0f2fe; border-radius: 1rem 1rem 1rem 0; }
                .chat-bubble-customer { background-color: #e5e7eb; border-radius: 1rem 1rem 0 1rem; }
            `}</style>
            
            <header className="fixed top-0 left-0 w-full h-[50px] bg-gray-100 text-gray-800 flex items-center justify-between px-4 z-50 shadow-sm border-b border-gray-200">
                <h1 className="text-xl font-bold">Interaction Analyzer</h1>
                <div className="tooltip-container mr-6">
                  <button onClick={showUploadModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-full shadow-lg transition-colors duration-200"><UploadIcon /></button>
                  <span className="tooltip-text">Upload Interactions</span>
                </div>
            </header>

            <div className="flex flex-grow w-full pt-[50px]">
                <div className={`flex flex-col flex-none h-full bg-gray-900 text-gray-100 py-4 px-2 shadow-lg transition-all duration-300 ${isNavCollapsed ? 'w-[45px]' : 'w-[150px]'}`}>
                    <div className="flex-grow space-y-4 pt-4">
                        <button onClick={() => { setPage('dashboard'); if (!isNavCollapsed) setIsNavCollapsed(true); }} className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-colors duration-200 ${page === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                            <DashboardIcon />
                            {!isNavCollapsed && <span className="text-sm font-medium">Dashboard</span>}
                        </button>
                        <button onClick={() => { setPage('history'); if (!isNavCollapsed) setIsNavCollapsed(true); }} className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-colors duration-200 ${page === 'history' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
                            <HistoryIcon />
                            {!isNavCollapsed && <span className="text-sm font-medium">History</span>}
                        </button>
                    </div>
                    <div className="flex-shrink-0 mt-auto">
                      <button onClick={() => setIsNavCollapsed(!isNavCollapsed)} className="w-full flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                          {isNavCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                          {!isNavCollapsed && <span className="text-sm font-medium">Collapse</span>}
                      </button>
                    </div>
                </div>

                <div className="flex-grow p-4 md:p-8 scrollbar-container">
                    <div className="text-lg md:text-2xl font-bold text-gray-800 mb-6">{page === 'dashboard' ? 'Dashboard' : 'Upload History'}</div>

                    {page === 'dashboard' ? (
                        <div>
                            <p className="text-gray-600 text-xs md:text-sm mb-4">Welcome to the Interaction Analyzer Dashboard. Use the tabs below to view either a summary of all uploaded interactions or a detailed analysis of a single file.</p>
                            <div className="flex flex-col space-y-4">
                              <div className="flex justify-start space-x-2">
                                <button onClick={() => setActiveTab(0)} className={`py-2 px-4 rounded-t-lg transition-colors duration-200 text-xs ${activeTab === 0 ? 'bg-white text-blue-600 font-semibold' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>Overall Dashboard</button>
                                <button onClick={() => setActiveTab(1)} className={`py-2 px-4 rounded-t-lg transition-colors duration-200 text-xs ${activeTab === 1 ? 'bg-white text-blue-600 font-semibold' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>Individual File</button>
                                <button onClick={showUploadModal} className={`py-2 px-4 rounded-t-lg transition-colors duration-200 text-xs bg-gray-200 text-gray-600 hover:bg-gray-300`}>Upload</button>
                              </div>
                              <div className="bg-white p-6 shadow-lg rounded-b-xl rounded-tr-xl">
                                {activeTab === 0 && (
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4 items-end text-xs md:text-sm">
                                            <div className="flex-1 min-w-[150px]">
                                                <label className="text-gray-500 text-xs font-bold">TIME PERIOD</label>
                                                <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={selectedTimePeriod} onChange={(e) => setSelectedTimePeriod(e.target.value)}>
                                                    <option value="all">All Time</option>
                                                    <option value="today">Today</option>
                                                    <option value="7d">Last 7 Days</option>
                                                    <option value="30d">Last 30 Days</option>
                                                </select>
                                            </div>
                                            <div className="flex-1 min-w-[150px]">
                                                <label className="text-gray-500 text-xs font-bold">LOB</label>
                                                <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={selectedLOB} onChange={(e) => setSelectedLOB(e.target.value)}>
                                                    <option value="">All LOBs</option>
                                                    {uniqueLOBs.map(lob => <option key={lob} value={lob}>{lob}</option>)}
                                                </select>
                                            </div>
                                            <div className="flex-1 min-w-[150px]">
                                                <label className="text-gray-500 text-xs font-bold">LANGUAGE</label>
                                                <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                                                    <option value="">All Languages</option>
                                                    {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative flex-grow">
                                                <input type="text" placeholder="Search interactions by keyword..." className="w-full py-2 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setFilterField(null); }} />
                                                {filterField && <button onClick={clearFilter} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">X</button>}
                                            </div>
                                            <div className="flex-none">
                                                <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold py-2">
                                                    <SlidersIcon size={16}/>
                                                    ADVANCED FILTERS
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {showAdvancedFilters && (
                                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                                                    <div>
                                                        <label className="text-gray-500 text-xs font-bold">ORGANIZATION</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueOrgs.map(o => <option key={o} value={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-500 text-xs font-bold">LOCATION</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-500 text-xs font-bold">CHANNEL</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueChannels.map(c => <option key={c} value={c}>{c}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-500 text-xs font-bold">UPLOADED BY</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueUsers.map(u => <option key={u} value={u}>{u}</option>)}
                                                        </select>
                                                    </div>
                                                     <div>
                                                        <label className="text-gray-500 text-xs font-bold">FILE TYPE</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedFileType} onChange={(e) => setSelectedFileType(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueFileTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-500 text-xs font-bold">STATUS</label>
                                                        <select className="w-full mt-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                            <option value="">All</option>
                                                            {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="col-span-2 md:col-span-2">
                                                        <label className="text-gray-500 text-xs font-bold">TOP N FILTER</label>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <input type="number" value={topNValue} onChange={(e) => setTopNValue(parseInt(e.target.value) || 0)} className="w-1/4 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
                                                            <select className="w-3/4 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" value={topNCategory} onChange={(e) => setTopNCategory(e.target.value)}>
                                                                <option value="">Select Category</option>
                                                                <option value="customerTopics">Customer Topics</option>
                                                                <option value="agentTopics">Agent Topics</option>
                                                                <option value="customerSentiment">Customer Sentiment</option>
                                                                <option value="agentSentiment">Agent Sentiment</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        

                                        <div className="border-t border-gray-200 my-4"></div>
                                        
                                        <div className="flex items-center overflow-hidden relative">
                                            <button onClick={() => scrollMetrics('left')} className="p-2 text-gray-600 hover:text-gray-800 transition-colors absolute left-0 z-10 bg-white/80 rounded-full shadow-md"><ChevronLeftIcon /></button>
                                            <div ref={metricsContainerRef} className="flex flex-nowrap overflow-x-hidden gap-4 py-4 px-10 md:px-14 scroll-smooth">
                                                <MetricContainer icon={<FileIcon size={26} className="text-blue-500" />} title="Total Files" value={totalFilesUploaded} tooltip="Total number of files uploaded to the system." />
                                                <MetricContainer icon={<DiscIcon size={26} className="text-indigo-500" />} title="Total Size (MB)" value={totalFileSize} tooltip="The cumulative size of all uploaded files in MB." />
                                                <MetricContainer icon={<HappyFaceIcon size={26} className="text-green-500" />} title="Happy Customers" value={totalHappyCustomers} tooltip="Click for options" onMenuClick={(e) => showOptions(e, 'Positive', 'customerOverallSentiment', 'Happy Customers')} isActionable={true} />
                                                <MetricContainer icon={<UnhappyFaceIcon size={26} className="text-red-500" />} title="Unhappy Customers" value={totalUnhappyCustomers} tooltip="Click for options" onMenuClick={(e) => showOptions(e, 'Negative', 'customerOverallSentiment', 'Unhappy Customers')} isActionable={true} />
                                                <MetricContainer icon={<MessageCircleIcon size={26} className="text-purple-500" />} title="Customer Topics" value={totalCustomerTopics} tooltip="Click for options on total customer topics" onMenuClick={(e) => showOptions(e, 'All', 'customerTopics', 'All Customer Topics')} isActionable={true}/>
                                                <MetricContainer icon={<MessageCircleIcon size={26} className="text-teal-500" />} title="Agent Topics" value={totalAgentTopics} tooltip="Click for options on total agent topics" onMenuClick={(e) => showOptions(e, 'All', 'agentTopics', 'All Agent Topics')} isActionable={true}/>
                                            </div>
                                            <button onClick={() => scrollMetrics('right')} className="p-2 text-gray-600 hover:text-gray-800 transition-colors absolute right-0 z-10 bg-white/80 rounded-full shadow-md"><ChevronRightIcon /></button>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                                            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex-1 flex flex-col items-center justify-center"><SentimentPieChart sentimentBreakdown={{positive: sentimentCounts.customer.Positive, neutral: sentimentCounts.customer.Neutral, negative: sentimentCounts.customer.Negative}} title="Customer Sentiments" type="customer" onActionRequest={showOptions} /></div>
                                            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex-1 flex flex-col items-center justify-center"><SentimentPieChart sentimentBreakdown={{positive: sentimentCounts.agent.Positive, neutral: sentimentCounts.agent.Neutral, negative: sentimentCounts.agent.Negative}} title="Agent Sentiments" type="agent" onActionRequest={showOptions} /></div>
                                        </div>
                                        
                                        <div className="flex flex-col md:flex-row gap-4 mt-8 items-start">
                                            <WordCloud title="Customer Topics" topics={finalFilteredFiles.flatMap(f => f.topics?.customer || [])} onActionRequest={showOptions} type="customerTopics" />
                                            <WordCloud title="Agent Topics" topics={finalFilteredFiles.flatMap(f => f.topics?.agent || [])} onActionRequest={showOptions} type="agentTopics" />
                                            <WordCloud title="Hot Topics" onAddTopic={() => setDisplayAddHotTopicModal(true)} topics={finalFilteredFiles.flatMap(f => [...(f.hotTopics?.customer?.map(t => ({ topic: t, source: 'customer' })) || []), ...(f.hotTopics?.agent?.map(t => ({ topic: t, source: 'agent' })) || [])])} isHotTopics={true} onActionRequest={showOptions} type="hotTopics" />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div>
                                        <p className="text-gray-600 text-xs md:text-sm mb-4">This view provides a deep dive into a single interaction. Click on any metric or topic to get AI-powered insights.</p>
                                        <div className="flex justify-center items-center gap-4 mb-6">
                                          <FileDropdown />
                                          <button onClick={() => setPage('history')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-colors duration-200 flex items-center gap-2"><HistoryIcon /> Upload History</button>
                                        </div>
                                        <div className="border-t border-gray-300 my-4"></div>
                                        {selectedFile && selectedFile.status === 'Processed' ? (
                                            <div className="space-y-6">
                                                <CustomerInsightsContainer file={selectedFile} />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"><h4 className="text-sm md:text-lg font-semibold text-gray-700 mb-2">Interaction Summary</h4><p className="text-gray-500 text-xs">{selectedFile.summary}</p></div>
                                                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"><h4 className="text-sm md:text-lg font-semibold text-gray-700 mb-2">Member Information</h4><p className="text-gray-500 text-xs"><strong>ID:</strong> {selectedFile?.memberInfo?.memberId}</p><p className="text-gray-500 text-xs"><strong>Policy:</strong> {selectedFile?.memberInfo?.policyNumber}</p><p className="text-gray-500 text-xs"><strong>Call Reason:</strong> {selectedFile?.memberInfo?.callReason}</p></div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="flex flex-col justify-center items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"><SentimentPieChart sentimentBreakdown={selectedFile.sentimentsBreakdown?.customer || {}} title="Customer Sentiments" type="customer" onDirectInsight={(e, val, field, title) => handleIndividualInsightRequest(e, val, field, title)} /></div>
                                                    <div className="flex flex-col justify-center items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"><SentimentPieChart sentimentBreakdown={selectedFile.sentimentsBreakdown?.agent || {}} title="Agent Sentiments" type="agent" onDirectInsight={(e, val, field, title) => handleIndividualInsightRequest(e, val, field, title)} /></div>
                                                </div>
                                                <div className="flex flex-col md:flex-row gap-4 mt-8 items-start">
                                                  <WordCloud title="Customer Topics" topics={selectedFile.topics?.customer || []} type="customerTopics" onActionRequest={(e, val, field, title) => handleIndividualInsightRequest(e, val, field, title)} />
                                                  <WordCloud title="Agent Topics" topics={selectedFile.topics?.agent || []} type="agentTopics" onActionRequest={(e, val, field, title) => handleIndividualInsightRequest(e, val, field, title)} />
                                                  <WordCloud title="Hot Topics" onAddTopic={() => setDisplayAddHotTopicModal(true)} topics={[...(selectedFile.hotTopics?.customer?.map(t => ({ topic: t, source: 'customer' })) || []), ...(selectedFile.hotTopics?.agent?.map(t => ({ topic: t, source: 'agent' })) || [])]} isHotTopics={true} type="hotTopics" onActionRequest={(e, val, field, title) => handleIndividualInsightRequest(e, val, field, title)} />
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
                                                    <h4 className="text-sm md:text-lg font-semibold text-gray-700 mb-4">Call Metrics</h4>
                                                    <div className="flex items-center overflow-hidden relative">
                                                        <button onClick={() => scrollIndividualMetrics('left')} className="p-2 text-gray-600 hover:text-gray-800 transition-colors absolute left-0 z-10 bg-gray-100 rounded-full shadow-lg"><ChevronLeftIcon /></button>
                                                        <div ref={individualMetricsRef} className="flex flex-nowrap overflow-x-hidden gap-4 py-4 px-10 md:px-14 scroll-smooth">
                                                           <CallMetric icon={<ClockIcon size={24} className="text-blue-500" />} title="Duration" value={selectedFile.conversationDuration} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.conversationDuration, 'duration', 'Call Duration')} />
                                                            <CallMetric icon={<DatabaseIcon size={24} className="text-indigo-500" />} title="File Size" value={selectedFile.fileSize} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.fileSize, 'fileSize', 'File Size')} />
                                                            <CallMetric icon={<GlobeIcon size={24} className="text-purple-500" />} title="Language" value={selectedFile.language.toUpperCase()} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.language, 'language', 'Language')} />
                                                            <CallMetric icon={<CalendarIcon size={24} className="text-teal-500" />} title="Upload Date" value={selectedFile.uploadTime.toLocaleDateString()} />
                                                            <CallMetric icon={<HappyFaceIcon size={24} className="text-green-500" />} title="Customer Sentiment" value={selectedFile.customerOverallSentiment} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.customerOverallSentiment, 'customerSentiment', 'Customer Sentiment')} />
                                                            <CallMetric icon={<HappyFaceIcon size={24} className="text-green-500" />} title="Agent Sentiment" value={selectedFile.agentOverallSentiment} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.agentOverallSentiment, 'agentSentiment', 'Agent Sentiment')} />
                                                            <CallMetric icon={<MessageCircleIcon size={24} className="text-yellow-500" />} title="Customer Topics" value={selectedFile.customerTopicsCount} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.customerTopicsCount, 'customerTopicsCount', 'Customer Topic Count')} />
                                                            <CallMetric icon={<MessageCircleIcon size={24} className="text-orange-500" />} title="Agent Topics" value={selectedFile.agentTopicsCount} isActionable onClick={(e) => handleIndividualInsightRequest(e, selectedFile.agentTopicsCount, 'agentTopicsCount', 'Agent Topic Count')} />
                                                        </div>
                                                        <button onClick={() => scrollIndividualMetrics('right')} className="p-2 text-gray-600 hover:text-gray-800 transition-colors absolute right-0 z-10 bg-gray-100 rounded-full shadow-lg"><ChevronRightIcon /></button>
                                                    </div>
                                                    <div className="mt-4"><h5 className="font-medium text-gray-600 mb-1">Audio Preview</h5><audio controls className="w-full"><source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />Your browser does not support the audio element.</audio></div>
                                                    <div className="mt-2 flex space-x-2">
                                                      <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full" ><PlayIcon /></button><span className="tooltip-text">Play</span></div>
                                                      <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg></button><span className="tooltip-text">Reduce Noise</span></div>
                                                      <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-4m4 0v4m4-8v8m4-4v4m4-8v8"></path></svg></button><span className="tooltip-text">Reduce Silence</span></div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
                                                    <h4 className="text-sm md:text-lg font-semibold text-gray-700 mb-2">Transcript</h4>
                                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                                        {parseTranscript(selectedFile.transcript).map((m, i) => <div key={i} className={`flex ${m.speaker === 'Customer' ? 'justify-end' : 'justify-start'}`}><div className={`p-3 max-w-[80%] text-sm leading-relaxed shadow-sm ${m.speaker === 'Customer' ? 'chat-bubble-customer' : 'chat-bubble-agent'}`}><p className="text-gray-900 font-semibold mb-1">{m.speaker}</p><p className="text-gray-800">{m.message}</p><p className="text-xs text-gray-500 text-right mt-1">{m.timestamp}</p></div></div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : <div className="text-center text-gray-500 mt-10"><p>{selectedFile ? `File Status: ${selectedFile.status}. Detailed analysis is not available.` : 'Please select a file to view its dashboard.'}</p></div>}
                                    </div>
                                )}
                              </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-600 text-xs md:text-sm mb-4">The Upload History section allows you to manage and track all your uploaded files. Use the search and filter options to find specific interactions and monitor their processing status.</p>
                            <div className="flex flex-wrap gap-4 mb-4 items-center text-xs md:text-sm">
                                <input type="text" placeholder="Search all content..." className="w-full sm:w-1/3 py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={historySearchTerm} onChange={(e) => setHistorySearchTerm(e.target.value)} />
                                <select className="w-full sm:w-1/5 py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={historySelectedLOB || ''} onChange={(e) => setHistorySelectedLOB(e.target.value)}>
                                    <option value="">Filter by LOB</option>
                                    {[...new Set(files.map(f => f.lob))].map(lob => <option key={lob} value={lob}>{lob}</option>)}
                                </select>
                                <div className="relative w-full sm:w-1/5"><input type="text" placeholder="Date Range" className="w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" /><CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /></div>
                            </div>
                            <div className="border-t border-gray-300 my-4"></div>
                            <div className="rounded-xl shadow-lg overflow-hidden bg-white responsive-table-container">
                                <table className="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['File Name', 'File Type', 'LOB', 'Customer Sentiment', 'Customer Topics', 'Agent Topics', 'Upload Time', 'Status', 'Actions'].map(header => <th key={header} className="px-4 py-2 text-left text-gray-500 font-bold uppercase tracking-wider" {...(header === 'File Name' || header === 'Upload Time' ? { onClick: () => sortData(header.toLowerCase().replace(/\s/g, '')), className: 'cursor-pointer' } : {})}>{header}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sortedHistoryFiles.slice(first, first + rows).map(file => (
                                            <tr key={file.id}>
                                                <td className="px-4 py-2 whitespace-nowrap text-blue-500 cursor-pointer" onClick={() => viewFile(file)}>{file.fileName}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">{file.fileType}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">{file.lob}</td>
                                                <td className={`px-4 py-2 whitespace-nowrap ${getSentimentClass(file.customerOverallSentiment)}`}>{file.customerOverallSentiment}</td>
                                                <td className="px-4 py-2 whitespace-nowrap"><div className="flex items-center justify-start"><span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center font-semibold">{file.customerTopicsCount}</span></div></td>
                                                <td className="px-4 py-2 whitespace-nowrap"><div className="flex items-center justify-start"><span className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center font-semibold">{file.agentTopicsCount}</span></div></td>
                                                <td className="px-4 py-2 whitespace-nowrap">{file.uploadTime.toLocaleString()}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">{file.status}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full" onClick={() => viewFile(file)}><FileTextIcon /></button><span className="tooltip-text">View Details</span></div>
                                                        <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full" onClick={() => deleteFile(file)}><TrashIcon /></button><span className="tooltip-text">Delete</span></div>
                                                        <div className="tooltip-container"><button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-full" onClick={() => refreshFile(file)}><RefreshCcwIcon /></button><span className="tooltip-text">Refresh</span></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center space-x-2 mb-2 sm:mb-0"><span className="text-gray-700">Rows per page:</span><select className="py-1 px-2 rounded-md border border-gray-300 text-sm" value={rows} onChange={(e) => { setRows(parseInt(e.target.value)); setFirst(0); }}><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select></div>
                                    <div className="flex-1 text-center mb-2 sm:mb-0"><p className="text-sm text-gray-700">Showing <span className="font-medium">{first + 1}</span> to <span className="font-medium">{Math.min(first + rows, historyFilteredFiles.length)}</span> of <span className="font-medium">{historyFilteredFiles.length}</span> results</p></div>
                                    <div><nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><button onClick={() => setFirst(0)} disabled={first === 0} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><ChevronsLeftIcon /></button><button onClick={() => setFirst(Math.max(0, first - rows))} disabled={first === 0} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><ChevronLeftIcon /></button><button onClick={() => setFirst(first + rows)} disabled={first + rows >= historyFilteredFiles.length} className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><ChevronRightIcon /></button><button onClick={() => setFirst(Math.floor((historyFilteredFiles.length - 1) / rows) * rows)} disabled={first + rows >= historyFilteredFiles.length} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"><ChevronsRightIcon /></button></nav></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {optionsMenu && (
                <div
                    className="absolute z-50 bg-white rounded-md shadow-lg border border-gray-200 p-2"
                    style={{ top: `${optionsMenu.y}px`, left: `${optionsMenu.x}px` }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul className="text-sm text-gray-700">
                        <li
                            className="px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                applyFilter(optionsMenu.value, optionsMenu.field);
                                setOptionsMenu(null);
                            }}
                        >
                            <FilterIcon size={14} className="text-gray-500" /> Apply as Filter
                        </li>
                        <li
                            className="px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                generateInsights(optionsMenu.value, optionsMenu.field, optionsMenu.title);
                                setOptionsMenu(null);
                            }}
                        >
                            <ZapIcon size={14} className="text-blue-500" /> See Insights
                        </li>
                    </ul>
                </div>
            )}

            {showInsightsModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <div className="flex justify-between items-center pb-3 border-b">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <ZapIcon className="text-blue-600" />
                                {insightsTitle}
                            </h2>
                            <button onClick={() => setShowInsightsModal(false)} className="text-gray-600 hover:text-gray-800"><XIcon /></button>
                        </div>
                        <div className="mt-4 min-h-[200px] flex items-center justify-center">
                            {isGeneratingInsights ? (
                                <div className="text-center">
                                    <Spinner />
                                    <p className="mt-2 text-gray-600">Generating AI-powered insights...</p>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: insightsContent }}></div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <button onClick={() => setShowInsightsModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {displayUploadModal && <div className="modal-backdrop"><div className="modal-content"><div className="flex justify-between items-center pb-3 border-b"><h2 className="text-xl font-bold text-gray-800">Upload Interaction</h2><button onClick={() => setDisplayUploadModal(false)} className="text-gray-600 hover:text-gray-800"><XIcon /></button></div><div className="space-y-4 mt-4"><p className="text-gray-500 text-sm">Select or drag and drop your transcript file.</p><div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50" onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById('fileInput').click()}>{uploadedFile ? <p>{uploadedFile.name}</p> : <><UploadIcon className="mx-auto h-12 w-12 text-gray-400" /><p className="mt-2">Drag and drop file here, or click to select</p></>}<input id="fileInput" type="file" className="hidden" onChange={handleFileUpload} accept=".wav,.csv" /></div>{uploadedFile && <div className="text-xs">Size: {(uploadedFile.size / (1024*1024)).toFixed(2)} MB</div>}<div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><select value={fileType} onChange={(e) => setFileType(e.target.value)} className="w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">File Type</option><option value="Generic">Generic</option><option value="Medical">Medical</option></select><select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Language</option><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option></select></div><select value={lob} onChange={(e) => setLob(e.target.value)} className="w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select LOB</option><option value="Healthcare">Healthcare</option><option value="Finance">Finance</option><option value="Tech Support">Tech Support</option><option value="Retail">Retail</option></select>{uploading && <div className="mt-4"><div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"><div className="bg-blue-600 h-full" style={{ width: `${uploadProgress}%` }}></div></div></div>}</div><div className="flex justify-end space-x-2 mt-6"><button onClick={() => setDisplayUploadModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl">Close</button><button onClick={handleUploadButtonClick} disabled={!uploadedFile || uploading || !fileType || !language || !lob} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50">Upload</button></div></div></div>}
            {displayAddHotTopicModal && <div className="modal-backdrop"><div className="modal-content"><div className="flex justify-between items-center pb-3 border-b"><h2 className="text-xl font-bold text-gray-800">Add Hot Topic</h2><button onClick={() => setDisplayAddHotTopicModal(false)} className="text-gray-600 hover:text-gray-800"><XIcon /></button></div><div className="space-y-4 mt-4"><div><label className="block text-sm font-medium">New Hot Topic</label><input type="text" className="mt-1 w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newHotTopic} onChange={(e) => setNewHotTopic(e.target.value)} /></div><div><label className="block text-sm font-medium">Topic Type</label><select value={hotTopicType} onChange={(e) => setHotTopicType(e.target.value)} className="mt-1 w-full py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="customer">Customer</option><option value="agent">Agent</option></select></div></div><div className="flex justify-end space-x-2 mt-6"><button onClick={() => setDisplayAddHotTopicModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl">Cancel</button><button onClick={handleAddHotTopic} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Add Topic</button></div></div></div>}
            {showDeleteConfirmModal && <div className="modal-backdrop"><div className="modal-content"><div className="flex justify-between items-center pb-3 border-b"><h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2><button onClick={() => setShowDeleteConfirmModal(false)} className="text-gray-600 hover:text-gray-800"><XIcon /></button></div><p className="text-gray-600 text-sm mt-4">Are you sure you want to delete "{fileToDelete?.fileName}"? This cannot be undone.</p><div className="flex justify-end space-x-2 mt-6"><button onClick={() => setShowDeleteConfirmModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl">Cancel</button><button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Delete</button></div></div></div>}
        </div>
    );
};

export default App;

