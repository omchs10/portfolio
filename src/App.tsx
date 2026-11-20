import React, { useEffect, useState, useRef, FormEvent, KeyboardEvent } from 'react';
import * as THREE from 'three';

// A unified ModalData type for simplicity and type safety
interface ModalData {
    category: string;
    title: string;
    subtitle: string;
    overview: string;
    impact: string;
    tags: string[];
}

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [toast, setToast] = useState<{ show: boolean, msg: string }>({ show: false, msg: '' });

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [modalData, setModalData] = useState<ModalData | null>(null);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    // Mobile Menu Handler
    const mobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

    // Toast Notification Helper
    const showToast = (msg: string) => {
        setToast({ show: true, msg });
        setTimeout(() => setToast({ show: false, msg: '' }), 3500);
    };

    // Copy to Clipboard Helper
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => { // NOSONAR
            showToast(`Copied to clipboard: ${text}`);
        });
    };

    // Resume Download Simulation
    const downloadResume = () => {
        showToast('Downloading Omprakash Gupta Resume PDF...');
        const link = document.createElement('a');
        link.href = '#'; // In a real app, you'd point to the PDF file
        link.setAttribute('download', 'Resume_Omprakash_Gupta.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Modal Logic
    const openModal = (category: string, data: Omit<ModalData, 'category'>) => {
        setModalData({ ...data, category });
        setIsDetailModalOpen(true);
    };

    const openProjectModal = (data: Omit<ModalData, 'category'>) => {
        openModal("PROJECT ARCHITECTURE", data);
    };

    const openGenericModal = (data: Omit<ModalData, 'category'>) => {
        openModal("VENTURE / RESEARCH", data);
    };

    const openCounterModal = (data: Omit<ModalData, 'category' | 'impact'>) => {
        const fullData: Omit<ModalData, 'category'> = {
            ...data,
            impact: "Tracked across projects at Quantum Strides, Cognizant, and private consulting clients."
        };
        openModal("FREELANCE METRIC LOG", fullData);
    };

    const closeModal = () => setIsDetailModalOpen(false);

    // Simplified modal opening from previous turn for consistency
    const openDetailModal = (data: ModalData) => {
        setModalData(data);
        setIsDetailModalOpen(true);
    };

    // Form Handler
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showToast('✨ Message received! Omprakash Gupta will get back to you shortly.');
        (e.target as HTMLFormElement).reset();
    };

    // Chatbot Logic
    const [chatMessages, setChatMessages] = useState([{ sender: 'bot', text: "👋 Hi! I'm Omprakash's AI Assistant. Ask me about his RAG architecture, Titan Embeddings, Amazon Connect work at Shyftlabs, CTC (36-40 LPA), or notice period!" }]);
    const [chatInput, setChatInput] = useState('');

    const toggleChatbot = () => setChatbotOpen(!chatbotOpen);

    const handleChatKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && chatInput) sendChatMessage();
    };

    const askQuickQuestion = (qText: string) => {
        // Directly send the message instead of just setting state
        // to ensure the action is immediate.
        handleUserMessage(qText);
    };

    const handleUserMessage = (userMsg: string) => {
        if (!userMsg.trim()) return;

        setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setChatInput('');

        setTimeout(() => {
            let replyText = "I'm Omprakash's AI Assistant! He is a GenAI Architect & Full-Stack Engineer with 5+ years experience in Amazon Connect, AWS Bedrock, Titan Embeddings, and OpenSearch Vector DB.";
            const lower = userMsg.toLowerCase();

            if (lower.includes('rag') || lower.includes('titan') || lower.includes('opensearch')) {
                replyText = "In the Quantum Strides QPlus project, Omprakash built a complete RAG system: Extracting text from PDFs/images via Python libraries & serverless tools, generating vectors via Amazon Titan Embeddings (Amazon Bedrock), indexing them in AWS OpenSearch Vector DB, and performing similarity search on NLQ queries to pass contexts to Claude/Gemini LLMs!";
            } else if (lower.includes('ctc') || lower.includes('notice') || lower.includes('salary')) {
                replyText = "Omprakash has a standard 2 Months notice period. His expected CTC for a full-time role is 36 - 40 LPA INR.";
            } else if (lower.includes('freelance') || lower.includes('rate') || lower.includes('hourly')) {
                replyText = "Omprakash takes freelance consulting engagements at ₹800 - ₹2,500 / hour depending on project complexity and technical scope."
            } else if (lower.includes('shyftlabs') || lower.includes('petco') || lower.includes('connect')) {
                replyText = "At Shyftlabs (Petco captive), Omprakash builds serverless Amazon Connect contact center workflows, Webchat & IVR routing using AWS Lambda, Python, and Node.js.";
            } else if (lower.includes('education') || lower.includes('nit') || lower.includes('school')) {
                replyText = "Omprakash holds a B.Tech in Computer Science & Engineering from NIT Delhi (Class of 2021). He completed Class 12th Board (PCM) and Class 10th Board with Distinction!";
            }

            setChatMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
        }, 800);
    }

    const sendChatMessage = () => {
        handleUserMessage(chatInput);
    };

    // Scroll chat to bottom on new message
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const mountRef = useRef<HTMLCanvasElement>(null);

    // Three.js Background Effect
    useEffect(() => {
        if (!mountRef.current) return;

        const canvas = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometryGroup = new THREE.Group();
        const materials = [
            new THREE.MeshStandardMaterial({ color: 0xeb387b, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.45 }),
            new THREE.MeshStandardMaterial({ color: 0xfca2c4, roughness: 0.3, metalness: 0.2, transparent: true, opacity: 0.5 }),
            new THREE.MeshStandardMaterial({ color: 0xd946ef, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.4 }),
            new THREE.MeshStandardMaterial({ color: 0x4285f4, roughness: 0.2, metalness: 0.2, transparent: true, opacity: 0.35 })
        ];

        const shapes: THREE.Mesh[] = [];
        for (let i = 0; i < 26; i++) {
            const type = i % 4;
            let geom;
            if (type === 0) geom = new THREE.IcosahedronGeometry(Math.random() * 0.7 + 0.3, 0);
            else if (type === 1) geom = new THREE.TorusGeometry(Math.random() * 0.5 + 0.3, 0.15, 16, 50);
            else if (type === 2) geom = new THREE.DodecahedronGeometry(Math.random() * 0.6 + 0.3);
            else geom = new THREE.SphereGeometry(Math.random() * 0.6 + 0.3, 32, 32);

            const mesh = new THREE.Mesh(geom, materials[i % materials.length]);
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 12
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.006,
                rotSpeedY: (Math.random() - 0.5) * 0.006,
                posY: mesh.position.y
            };
            shapes.push(mesh);
            geometryGroup.add(mesh);
        }
        scene.add(geometryGroup);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xeb387b, 2.2, 50);
        pointLight.position.set(6, 6, 6);
        scene.add(pointLight);

        camera.position.z = 8;

        let clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            shapes.forEach((shape, idx) => {
                shape.rotation.x += (shape.userData.rotSpeedX as number);
                shape.rotation.y += (shape.userData.rotSpeedY as number);
                shape.position.y = shape.userData.posY + Math.sin(elapsed + idx) * 0.35;
            });

            geometryGroup.rotation.y = Math.sin(elapsed * 0.08) * 0.18;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            // Clean up Three.js scene if component unmounts
        };
    }, []);


    return (
        <div className="mesh-bg font-sans text-gray-800 antialiased selection:bg-girlish-200 selection:text-girlish-900 min-h-screen relative overflow-x-hidden">
            <canvas id="bg3d" ref={mountRef}></canvas>

            <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3">
                <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-glass">
                    <a href="#hero" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-girlish-600 via-girlish-500 to-pink-400 flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-3d-pink group-hover:rotate-12 transition-transform duration-300">
                            O
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-base sm:text-lg text-gray-900 leading-tight">Omprakash Gupta</span>
                            <span className="text-[11px] text-girlish-600 font-semibold tracking-wider flex items-center gap-1">
                                <i className="fa-solid fa-sparkles text-[9px]"></i> GenAI & Cloud AI Architect
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden xl:flex items-center gap-1 bg-white/70 px-3 py-1.5 rounded-full border border-white/90 shadow-inner">
                        <a href="#hero" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Home</a>
                        <a href="#about" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">About & RAG</a>
                        <a href="#experience" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Experience</a>
                        <a href="#freelance-journey" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Freelance Stats</a>
                        <a href="#projects" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Projects</a>
                        <a href="#agency-startup" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Agency & Startup</a>
                        <a href="#skills-certs" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Skills & Certs</a>
                        <a href="#testimonials" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Reviews</a>
                        <a href="#contact" className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 hover:text-girlish-600 hover:bg-white transition-all">Contact</a>
                    </div>

                    {/* Action Buttons in Nav */}
                    <div className="flex items-center gap-2">
                        <button onClick={downloadResume} className="hidden sm:flex bg-white/90 text-girlish-700 border border-girlish-300 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-girlish-50 transition-all items-center gap-1.5 shadow-sm">
                            <i className="fa-solid fa-download text-girlish-500"></i>
                            <span>Resume</span>
                        </button>
                        <button onClick={toggleChatbot} className="bg-gradient-to-r from-girlish-600 to-girlish-400 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-3d-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                            <i className="fa-solid fa-robot animate-bounce"></i>
                            <span className="hidden sm:inline">Ask AI Assistant</span>
                            <span className="sm:hidden">AI</span>
                        </button>
                        <button onClick={mobileMenuToggle} className="xl:hidden w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 hover:bg-girlish-50">
                            <i className="fa-solid fa-bars text-base"></i>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div id="mobileMenu" className="xl:hidden max-w-7xl mx-auto mt-2 glass-panel rounded-2xl p-4 flex flex-col gap-2 shadow-2xl border border-white">
                        <a href="#hero" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Home</a>
                        <a href="#about" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">About & RAG Architecture</a>
                        <a href="#experience" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Experience (Shyftlabs & Cognizant)</a>
                        <a href="#freelance-journey" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Freelance Journey & Metrics</a>
                        <a href="#projects" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">All Flagship Projects</a>
                        <a href="#agency-startup" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Agency, Startup & R&D</a>
                        <a href="#skills-certs" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Skills, Certs & Education</a>
                        <a href="#testimonials" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Testimonials & Peer Reviews</a>
                        <a href="#contact" onClick={mobileMenuToggle} className="px-4 py-2 rounded-xl hover:bg-girlish-100 font-semibold text-gray-700 text-sm">Contact Me</a>
                        <button onClick={() => { downloadResume(); mobileMenuToggle(); }} className="mt-2 w-full bg-girlish-500 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                            <i className="fa-solid fa-download"></i> Download Resume PDF
                        </button>
                    </div>
                )}
            </header>

            <section id="hero" className="relative z-10 pt-28 sm:pt-32 pb-12 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white relative overflow-hidden shadow-glass-lg">
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-girlish-300/40 to-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                            <div className="lg:col-span-9 space-y-4 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-girlish-300 shadow-sm text-girlish-700 text-xs font-bold tracking-wide animate-pulse-glow">
                                    <span className="w-2.5 h-2.5 rounded-full bg-girlish-500 animate-ping"></span>
                                    <span>GenAI Architect & Amazon Connect Specialist</span>
                                </div>
                                <h1 className="font-heading text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                                    Building Enterprise <span className="bg-gradient-to-r from-girlish-600 via-girlish-500 to-pink-500 bg-clip-text text-transparent">GenAI, Cloud Agents</span> & Contact Centers ✨
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                                    Senior AI & Full-Stack Engineer with <strong>5+ years</strong> experience designing end-to-end RAG pipelines (Amazon Bedrock, Titan Embeddings, OpenSearch Vector DB), serverless cloud contact centers (Amazon Connect, Lex, GCP Vertex AI), and dynamic text-to-SQL analytics.
                                </p>
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <a href="#projects" className="bg-gradient-to-r from-girlish-600 via-girlish-500 to-pink-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-3d-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                        <span>View Flagship Projects</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                    <button onClick={downloadResume} className="glass-panel text-gray-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-white/90 shadow-md transition-all flex items-center gap-2 border border-girlish-300">
                                        <i className="fa-solid fa-file-arrow-down text-girlish-600"></i>
                                        <span>Download Resume PDF</span>
                                    </button>
                                    <a href="mailto:omchs10@gmail.com" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-girlish-700 hover:bg-girlish-500 hover:text-white transition-all shadow-sm">
                                        <i className="fa-solid fa-envelope text-sm"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/omchs10/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-girlish-700 hover:bg-girlish-500 hover:text-white transition-all shadow-sm">
                                        <i className="fa-brands fa-linkedin-in text-sm"></i>
                                    </a>
                                    <a href="https://github.com/omchs10" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-girlish-700 hover:bg-girlish-500 hover:text-white transition-all shadow-sm">
                                        <i className="fa-brands fa-github text-sm"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                                <div className="glass-panel p-3.5 rounded-2xl text-center border border-white">
                                    <span className="font-heading font-black text-xl text-girlish-600">5+ Yrs</span>
                                    <span className="block text-[10px] text-gray-600 font-semibold mt-0.5">Total Experience</span>
                                </div>
                                <div className="glass-panel p-3.5 rounded-2xl text-center border border-white">
                                    <span className="font-heading font-black text-xl text-girlish-600">2 Months</span>
                                    <span className="block text-[10px] text-gray-600 font-semibold mt-0.5">Notice Period</span>
                                </div>
                                <div className="glass-panel p-3.5 rounded-2xl text-center border border-white">
                                    <span className="font-heading font-black text-xl text-girlish-600">36-40 LPA</span>
                                    <span className="block text-[10px] text-gray-600 font-semibold mt-0.5">Expected CTC</span>
                                </div>
                                <div className="glass-panel p-3.5 rounded-2xl text-center border border-white">
                                    <span className="font-heading font-black text-xl text-girlish-600">₹800-2500</span>
                                    <span className="block text-[10px] text-gray-600 font-semibold mt-0.5">Freelance / hr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full glass-card rounded-3xl p-6 sm:p-8 border border-white shadow-3d-card space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-girlish-200 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-girlish-600 to-pink-400 text-white flex items-center justify-center text-xl shadow-md">
                                    <i className="fa-solid fa-headset"></i>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full uppercase tracking-wider">CURRENT POSITION AT SHYFTLABS</span>
                                    <h3 className="font-heading text-xl font-bold text-gray-900 mt-0.5">Amazon Connect Full-Stack Developer</h3>
                                    <p className="text-xs text-gray-600 font-medium">Shyftlabs (Petco - Captive) | Noida, India (Jan 2026 - Present)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-aws/10 text-aws-dark text-xs font-bold border border-aws/30 flex items-center gap-1.5">
                                    <i className="fa-brands fa-aws text-aws"></i> AWS Enterprise Stack
                                </span>
                                <span className="px-3 py-1 rounded-full bg-gcp/10 text-gcp-dark text-xs font-bold border border-gcp/30 flex items-center gap-1.5">
                                    <i className="fa-brands fa-google text-gcp"></i> GCP & Vertex AI
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="bg-white/80 p-5 rounded-2xl border border-girlish-200 space-y-3">
                                <div className="flex items-center gap-2 text-girlish-700 font-heading font-bold text-sm">
                                    <i className="fa-solid fa-bolt text-girlish-500"></i>
                                    <span>Current Work at Shyftlabs</span>
                                </div>
                                <ul className="text-xs text-gray-700 space-y-2 list-disc list-inside">
                                    <li>Architecting high-throughput Amazon Connect contact center workflows for Petco North America.</li>
                                    <li>Building serverless Webchat and IVR routing pipelines using AWS Lambda, Python, and Node.js.</li>
                                    <li>Integrating Amazon Lex natural language bots to automate customer self-service journeys.</li>
                                </ul>
                            </div>
                            <div className="bg-white/80 p-5 rounded-2xl border border-girlish-200 space-y-3">
                                <div className="flex items-center gap-2 text-girlish-700 font-heading font-bold text-sm">
                                    <i className="fa-solid fa-screwdriver-wrench text-girlish-500"></i>
                                    <span>Skills Active at Shyftlabs</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">Amazon Connect</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">AWS Lambda</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">Amazon Lex</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">Python 3.11</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">Node.js</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">AWS EventBridge</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">DynamoDB</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-girlish-100 text-girlish-900 text-[11px] font-bold">React.js</span>
                                </div>
                            </div>
                            <div className="bg-white/80 p-5 rounded-2xl border border-girlish-200 space-y-3">
                                <div className="flex items-center gap-2 text-girlish-700 font-heading font-bold text-sm">
                                    <i className="fa-solid fa-graduation-cap text-girlish-500"></i>
                                    <span>Skills Currently Learning</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">GCP Vertex AI</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">LangGraph Multi-Agent</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">Vector Quantization</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">Pinecone DB</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">Google Cloud Functions</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-bold">LLM Guardrails</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="relative z-10 max-w-7xl mx-auto px-4 space-y-20 pb-28">
                 
                <section id="about" className="scroll-mt-28">
                  <div className="glass-panel rounded-3xl p-6 sm:p-12 shadow-glass relative overflow-hidden">
                  <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-girlish-300/30 rounded-full blur-3xl pointer-events-none"></div>
                
                  <div className="space-y-8">
                    
                      <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                              <i className="fa-solid fa-heart"></i> About Omprakash Gupta
                          </div>
                          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">
                              Pioneering Enterprise AI, RAG Systems & Cloud Contact Center Architecture
                          </h2>
                          <p className="text-sm text-gray-600">
                              I am a result-oriented Full-Stack & GenAI Architect with 5+ years of software engineering experience. My technical journey spans building end-to-end automated contact centers, autonomous chatbot agents, and high-performance Retrieval-Augmented Generation (RAG) applications.
                          </p>
                      </div>

                    {/* Specialized Highlight Box for RAG & Titan Embeddings */}
                    <div className="glass-card p-6 rounded-2xl border border-white space-y-3 bg-gradient-to-r from-white/90 to-girlish-50/80">
                        <div className="flex items-center gap-2 text-girlish-700 font-heading font-bold text-base">
                            <i className="fa-solid fa-diagram-project text-girlish-500"></i>
                            <span>Deep-Dive RAG Architecture Expertise (Quantum Strides QPlus)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            Engineered complete end-to-end RAG workflows: Ingesting unstructured PDFs & images, converting them into clean text via serverless Python pipelines/AWS resources, generating high-dimensional vectors via <strong>Amazon Titan Embeddings (Amazon Bedrock)</strong>, indexing and storing them inside <strong>AWS OpenSearch (acting as Vector DB)</strong>, and running semantic similarity search against user Natural Language Queries (NLQ) to serve contextual prompts to LLMs like Claude and Gemini.
                        </p>
                    </div>

                    {/* Quick Spec Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 max-w-4xl ">
                        <div className="bg-white/80 p-4 rounded-2xl border border-girlish-200">
                            <span className="text-xs text-girlish-600 font-bold uppercase tracking-wider block">Full-time Readiness</span>
                            <span className="font-heading font-bold text-gray-900 text-sm">2 Months Notice Period</span>
                            <p className="text-[11px] text-gray-500 mt-1">Expected CTC: 36-40 LPA INR</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-2xl border border-girlish-200">
                            <span className="text-xs text-girlish-600 font-bold uppercase tracking-wider block">Freelance Consulting</span>
                            <span className="font-heading font-bold text-gray-900 text-sm">₹800 - ₹2,500 / hr</span>
                            <p className="text-[11px] text-gray-500 mt-1">Flexible scope & retainer model</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-2xl border border-girlish-200">
                            <span className="text-xs text-girlish-600 font-bold uppercase tracking-wider block">Academic Pedigree</span>
                            <span className="font-heading font-bold text-gray-900 text-sm">NIT Delhi CSE</span>
                            <p className="text-[11px] text-gray-500 mt-1">B.Tech Grad Class of 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

                <section id="experience" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-briefcase"></i> Work Experience
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Professional Journey</h2>
                        <p className="text-gray-600 text-sm">Key roles across enterprise contact centers and AI product development.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-girlish-200 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-girlish-600 to-pink-400 text-white flex items-center justify-center text-xl shadow-md">
                                        <i className="fa-solid fa-cloud"></i>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full uppercase">CURRENT POSITION</span>
                                        <h3 className="font-heading text-xl font-bold text-gray-900 mt-1">Amazon Connect Full-Stack Developer</h3>
                                        <p className="text-xs text-gray-600 font-semibold">Shyftlabs (Petco Captive) | Noida, India</p>
                                    </div>
                                </div>
                                <div className="glass-panel px-4 py-2 rounded-2xl text-xs font-bold text-gray-700 border border-white">
                                    <i className="fa-regular fa-calendar text-girlish-500 mr-1.5"></i> Jan 2026 - Present
                                </div>
                            </div>
                            <ul className="text-xs sm:text-sm text-gray-700 space-y-2 list-disc list-inside">
                                <li>Developing and maintaining high-scale Amazon Connect contact center workflows for Petco's digital channels across US regions.</li>
                                <li>Building serverless Amazon Lex bots, Lambda microservices (Python/Node.js), and dynamic IVR routing.</li>
                                <li>Integrating GCP Vertex AI services for supplemental language modeling and speech insights.</li>
                            </ul>
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-girlish-100">
                                <span className="text-xs font-bold text-gray-500 py-1">Tech Stack:</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Amazon Connect</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">AWS Lambda</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Amazon Lex</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">GCP Vertex AI</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Python</span>
                                <span className="px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Node.js</span>
                            </div>
                        </div>
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-girlish-200 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-girlish-500 text-white flex items-center justify-center text-xl shadow-md">
                                        <i className="fa-solid fa-building"></i>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-3 py-0.5 rounded-full uppercase">4.5+ YEARS TENURE</span>
                                        <h3 className="font-heading text-xl font-bold text-gray-900 mt-1">Associate Projects</h3>
                                        <p className="text-xs text-gray-600 font-semibold">Cognizant Technology Solutions | Noida, India</p>
                                    </div>
                                </div>
                                <div className="glass-panel px-4 py-2 rounded-2xl text-xs font-bold text-gray-700 border border-white">
                                    <i className="fa-regular fa-calendar text-girlish-500 mr-1.5"></i> June 2021 - Jan 2026
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
                                <div className="bg-white/80 p-3.5 rounded-2xl border border-white space-y-1">
                                    <h4 className="font-bold text-girlish-700 text-xs">📊 GenAI Power BI Visuals Generator</h4>
                                    <p className="text-[11px]">NLU engine leveraging LLMs (Gemini Flash 2.0 / Bedrock) for automated visual generation and Text-to-SQL query generation against RDS databases.</p>
                                    <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Result: 90% faster creation, 87% cost reduction</span>
                                </div>
                                <div className="bg-white/80 p-3.5 rounded-2xl border border-white space-y-1">
                                    <h4 className="font-bold text-girlish-700 text-xs">⚙️ DIR & Rules Engine Platform</h4>
                                    <p className="text-[11px]">UI orchestration engine automating Amazon Connect contact center routing flows for non-technical business managers.</p>
                                    <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Result: 80% reduction in setup time</span>
                                </div>
                                <div className="bg-white/80 p-3.5 rounded-2xl border border-white space-y-1">
                                    <h4 className="font-bold text-girlish-700 text-xs">🎧 Custom CCP Agent Control Panel</h4>
                                    <p className="text-[11px]">Agent desktop using Amazon Connect Stream API, real-time sentiment analysis, live translation, and Amazon Q post-call summaries.</p>
                                    <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Result: 70% reduction in Average Handle Time</span>
                                </div>
                                <div className="bg-white/80 p-3.5 rounded-2xl border border-white space-y-1">
                                    <h4 className="font-bold text-girlish-700 text-xs">💬 Omnichannel Bot Orchestrations</h4>
                                    <p className="text-[11px]">Deployed Lex/Bedrock bots across Webchat, IVR, and WhatsApp for Banking and Healthcare sector clients.</p>
                                    <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Result: 80% deflection rate from human agents</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="freelance-journey" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-chart-line"></i> Freelance Journey & Metrics
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Freelance Impact & Client Performance</h2>
                        <p className="text-gray-600 text-sm">Click any counter card below to inspect detailed project logs, revenue impact, and client ratings.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div onClick={() => openCounterModal({ title: 'Clients Served Worldwide', subtitle: '18+ Clients Across US, UK, India & APAC', overview: 'Delivered custom GenAI architectures, Amazon Connect migrations, and Python serverless tools for startups and mid-market enterprises.', tags: ['Quantum Strides (USA)', 'Petco Digital Squad', 'Fintech Startups', 'Healthcare Bots'] })} className="glass-card rounded-3xl p-6 border border-white text-center cursor-pointer group hover:border-girlish-400">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-girlish-100 text-girlish-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <span className="font-heading font-black text-4xl text-girlish-600">18+</span>
                            <h4 className="font-bold text-gray-900 text-sm mt-1">Clients Served</h4>
                            <p className="text-[11px] text-gray-500 mt-1">Click to view client log</p>
                        </div>
                        <div onClick={() => openCounterModal({ title: 'Revenue & Operational Cost Impact', subtitle: '$1.5M+ Total Business Savings', overview: 'Saved over $1.5M in client operational overhead through 87% reduction in Power BI report creation costs and 98% faster chatbot regression testing.', tags: ['87% PowerBI Cost Cut', '70% AHT Reduction', '98% Test Time Gain', '80% Bot Deflection'] })} className="glass-card rounded-3xl p-6 border border-white text-center cursor-pointer group hover:border-girlish-400">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                            <span className="font-heading font-black text-4xl text-emerald-600">$1.5M+</span>
                            <h4 className="font-bold text-gray-900 text-sm mt-1">Revenue Impacted</h4>
                            <p className="text-[11px] text-gray-500 mt-1">Click to view ROI breakdown</p>
                        </div>
                        <div onClick={() => openCounterModal({ title: 'Client Satisfaction & Rating', subtitle: '4.98 / 5.0 Average Rating', overview: 'Maintained a near-perfect client rating across freelance platforms for code quality, architectural depth, and on-time project delivery.', tags: ['5.0 Stars - Quantum Strides', '5.0 Stars - CTS Leads', '4.9 Stars - Freelance Upwork'] })} className="glass-card rounded-3xl p-6 border border-white text-center cursor-pointer group hover:border-girlish-400">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="font-heading font-black text-4xl text-amber-500">4.98</span>
                            <h4 className="font-bold text-gray-900 text-sm mt-1">Client Rating</h4>
                            <p className="text-[11px] text-gray-500 mt-1">Click to read client feedback</p>
                        </div>
                        <div onClick={() => openCounterModal({ title: 'Freelance Consulting Hours', subtitle: '2,500+ Hours Delivered', overview: 'Specialized hourly consulting (₹800 - ₹2,500/hr) in RAG design, Titan Embeddings, AWS OpenSearch setup, and Amazon Connect Stream APIs.', tags: ['₹800 - ₹2500 / hr Rate', 'Retainer Projects', 'Fixed Scope Builds', 'Code Reviews'] })} className="glass-card rounded-3xl p-6 border border-white text-center cursor-pointer group hover:border-girlish-400">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                                <i className="fa-solid fa-clock"></i>
                            </div>
                            <span className="font-heading font-black text-4xl text-purple-600">2,500+</span>
                            <h4 className="font-bold text-gray-900 text-sm mt-1">Consulting Hours</h4>
                            <p className="text-[11px] text-gray-500 mt-1">Click to view hourly terms</p>
                        </div>
                    </div>
                </section>

                <section id="projects" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-code font-bold"></i> Architectural Portfolio
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Enterprise level Projects</h2>
                        <p className="text-gray-600 text-sm">Click any project card to open complete architectural details, AWS/GCP stack, and workflow diagrams.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div onClick={() => openProjectModal({ title: 'GenAI Agentic Chatbot & RAG Architecture (QPlus)', subtitle: 'Quantum Strides | Remote / Freelance', overview: 'Architected an end-to-end RAG application designed to process unstructured documents (PDFs & images) alongside structured RDS data. Engineered the end-to-end ingestion and retrieval pipeline.', impact: 'File Hydration & Vector Search: Extracted text from files via Python scripts and serverless AWS tools, generated high-dimensional vector embeddings using Amazon Titan Embeddings via Amazon Bedrock, indexed vectors into AWS OpenSearch Vector DB, and performed semantic similarity search on NLQ queries to pass relevant context to LLMs (Claude/Gemini) via Bedrock. Reduced query latency by 65%.', tags: ['AWS Bedrock', 'Amazon Titan Embeddings', 'AWS OpenSearch (Vector DB)', 'Python (Text Parsing)', 'AWS Lambda', 'Amazon RDS', 'React.js', 'WebSockets'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-girlish-700 bg-girlish-100 px-3 py-1 rounded-full uppercase tracking-wider">RAG & Vector Search</span>
                                    <span className="text-xs font-bold text-aws-dark"><i className="fa-brands fa-aws text-aws"></i> AWS</span>
                                </div>
                                <h4 className="font-heading text-lg font-extrabold text-gray-900 mt-4">GenAI Agentic Chatbot & RAG Architecture (QPlus)</h4>
                                <p className="text-xs text-gray-600 font-semibold mt-1">Quantum Strides | Remote / Freelance</p>
                                <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                                    Architected an end-to-end RAG application to process unstructured documents (PDFs/images) and structured RDS data.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Architecture →</span>
                            </div>
                        </div>
                        <div onClick={() => openProjectModal({ title: 'GenAI Power BI Visuals Generator', subtitle: 'Cognizant | Enterprise Client Project', overview: 'Developed a Natural Language Understanding (NLU) engine to automate the creation of Power BI visuals and dashboards. The system translates plain English queries from business users into executable SQL queries.', impact: 'The engine leverages LLMs (Gemini Flash 2.0 / Bedrock) for Text-to-SQL generation against Amazon RDS databases. This automation led to a 90% reduction in report creation time and an 87% decrease in associated operational costs for the client.', tags: ['GCP Vertex AI', 'Gemini Flash 2.0', 'AWS Bedrock', 'Text-to-SQL', 'Amazon RDS', 'Power BI API', 'Python', 'Flask'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">Text-to-SQL</span>
                                    <span className="text-xs font-bold text-gcp-dark"><i className="fa-brands fa-google text-gcp"></i> GCP</span>
                                </div>
                                <h4 className="font-heading text-lg font-extrabold text-gray-900 mt-4">GenAI Power BI Visuals Generator</h4>
                                <p className="text-xs text-gray-600 font-semibold mt-1">Cognizant | Enterprise Client Project</p>
                                <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                                    NLU engine for automated Power BI visual generation and Text-to-SQL against RDS databases.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Architecture →</span>
                            </div>
                        </div>
                        <div onClick={() => openProjectModal({ title: 'DIR & Rules Engine Platform', subtitle: 'Cognizant | Internal Product', overview: 'Led the development of a UI-driven orchestration engine that allows non-technical business managers to design and deploy complex Amazon Connect contact center routing flows without writing code.', impact: 'The platform provided a drag-and-drop interface for rule creation, condition logic, and routing actions, which were then translated into executable Amazon Connect configurations. This resulted in an 80% reduction in setup and modification time for contact flows.', tags: ['Amazon Connect', 'React.js', 'Node.js', 'AWS Lambda', 'DynamoDB', 'UI/UX Design', 'Serverless Framework'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">Contact Center Automation</span>
                                    <span className="text-xs font-bold text-aws-dark"><i className="fa-brands fa-aws text-aws"></i> AWS</span>
                                </div>
                                <h4 className="font-heading text-lg font-extrabold text-gray-900 mt-4">DIR & Rules Engine Platform</h4>
                                <p className="text-xs text-gray-600 font-semibold mt-1">Cognizant | Internal Product</p>
                                <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                                    UI orchestration engine for automating Amazon Connect routing flows for non-technical managers.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Architecture →</span>
                            </div>
                        </div>
                        <div onClick={() => openProjectModal({ title: 'Custom CCP Agent Control Panel', subtitle: 'Cognizant | Banking Client', overview: 'Built a bespoke agent desktop application from the ground up using the Amazon Connect Stream API. The goal was to create a unified agent experience with advanced AI-powered assistance features.', impact: 'The panel integrated real-time sentiment analysis, live call translation, and post-call summaries powered by Amazon Q. This rich feature set contributed to a 70% reduction in Average Handle Time (AHT) and significantly improved agent efficiency.', tags: ['Amazon Connect Stream API', 'React.js', 'WebSockets', 'Amazon Transcribe', 'Amazon Comprehend', 'Amazon Q', 'Next.js'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full uppercase tracking-wider">Agent Desktop AI</span>
                                    <span className="text-xs font-bold text-aws-dark"><i className="fa-brands fa-aws text-aws"></i> AWS</span>
                                </div>
                                <h4 className="font-heading text-lg font-extrabold text-gray-900 mt-4">Custom CCP Agent Control Panel</h4>
                                <p className="text-xs text-gray-600 font-semibold mt-1">Cognizant | Banking Client</p>
                                <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                                    Agent desktop with sentiment analysis, live translation, and Amazon Q summaries via Stream API.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Architecture →</span>
                            </div>
                        </div>
                        <div onClick={() => openProjectModal({ title: 'Omnichannel Bot Orchestrations', subtitle: 'Cognizant | Healthcare & Finance Clients', overview: 'Designed and deployed a suite of conversational AI bots across multiple channels, including Webchat, IVR, and WhatsApp, for major clients in the Banking and Healthcare sectors.', impact: 'The bots, powered by Amazon Lex and AWS Bedrock, handled a wide range of customer queries, from appointment scheduling to account balance inquiries. Achieved an average 80% deflection rate, successfully resolving customer issues without human agent intervention.', tags: ['Amazon Lex', 'AWS Bedrock (Claude)', 'WhatsApp API', 'Twilio', 'Serverless', 'Multi-channel', 'Dialogflow CX'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">Conversational AI</span>
                                    <span className="text-xs font-bold text-aws-dark"><i className="fa-brands fa-aws text-aws"></i> AWS</span>
                                </div>
                                <h4 className="font-heading text-lg font-extrabold text-gray-900 mt-4">Omnichannel Bot Orchestrations</h4>
                                <p className="text-xs text-gray-600 font-semibold mt-1">Cognizant | Healthcare & Finance Clients</p>
                                <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                                    Deployed Lex/Bedrock bots across Webchat, IVR, and WhatsApp, achieving an 80% deflection rate.
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Architecture →</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="agency-startup" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-rocket"></i> Agency, Startup & R&D
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Venture Initiatives & R&D</h2>
                        <p className="text-gray-600 text-sm">Click any card to read details on my developer collective, startup incubation, and research labs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div onClick={() => openGenericModal({ title: 'Active Freelance Consulting Services', subtitle: 'Hourly Rate: ₹800 - ₹2,500 / hr (Project Dependent)', overview: 'Offering architectural consulting and hands-on execution for enterprise clients looking to adopt GenAI RAG pipelines, AWS Bedrock, and Amazon Connect migrations.', impact: 'Key offerings include: RAG System Architecture, Vector DB Indexing (OpenSearch/Pinecone), Chatbot Regression Testing Pipelines, and Full-Stack AWS Serverless Development.', tags: ['RAG Consulting', 'Amazon Connect', 'AWS Bedrock', 'Python Tools', 'React Apps'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-girlish-100 text-girlish-600 flex items-center justify-center text-lg mb-3">
                                    <i className="fa-solid fa-handshake-angle"></i>
                                </div>
                                <h4 className="font-heading font-bold text-gray-900">Freelance Consulting</h4>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Architectural consulting and hands-on execution for enterprise clients.</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Offerings →</span>
                            </div>
                        </div>
                        <div onClick={() => openGenericModal({ title: 'Quantum Strides - Developer Collective', subtitle: 'Co-Founder & Principal Architect', overview: 'Co-founded a remote-first developer collective focused on delivering high-impact GenAI and Cloud solutions for US-based clients. Our team specializes in rapid prototyping and scalable production deployments.', impact: 'As Principal Architect, I lead technical discovery, design system architectures, and mentor junior engineers. We have successfully delivered projects for clients in fintech, e-commerce, and healthcare, maintaining a 100% client satisfaction rate.', tags: ['Team Leadership', 'System Design', 'Client Management', 'Agile', 'Remote Work'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-girlish-100 text-girlish-600 flex items-center justify-center text-lg mb-3">
                                    <i className="fa-solid fa-people-group"></i>
                                </div>
                                <h4 className="font-heading font-bold text-gray-900">Developer Collective</h4>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Co-founded a remote-first collective delivering GenAI/Cloud solutions.</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Collective →</span>
                            </div>
                        </div>
                        <div onClick={() => openGenericModal({ title: 'Startup Incubation & R&D', subtitle: 'Personal Research & Development Wing', overview: 'Dedicated R&D initiative to explore emerging AI/ML technologies and incubate potential startup ideas. Current focus is on multi-agent systems and advanced vector quantization techniques.', impact: 'This lab serves as my personal sandbox for testing new frameworks (e.g., LangGraph), evaluating novel database technologies (e.g., Pinecone), and building proof-of-concepts for future products. It fuels my continuous learning and keeps my skills at the cutting edge.', tags: ['LangGraph', 'Multi-Agent Systems', 'Vector Quantization', 'Pinecone DB', 'R&D', 'Prototyping'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-girlish-100 text-girlish-600 flex items-center justify-center text-lg mb-3">
                                    <i className="fa-solid fa-flask-vial"></i>
                                </div>
                                <h4 className="font-heading font-bold text-gray-900">Startup & R&D Lab</h4>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Exploring multi-agent systems and advanced vector quantization.</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View Research →</span>
                            </div>
                        </div>
                        <div onClick={() => openGenericModal({ title: 'Open Source Contributions', subtitle: 'Community & Code Collaborator', overview: 'Actively contribute to open-source projects and maintain several of my own repositories. I believe in the power of community-driven development to solve complex problems.', impact: 'Contributions include bug fixes, feature enhancements, and documentation improvements for various Python and JavaScript libraries. My personal projects, including AI-powered developer tools and serverless templates, are available on my GitHub for public use and collaboration.', tags: ['GitHub', 'Python', 'JavaScript', 'Developer Tools', 'Serverless Templates', 'Community'] })} className="glass-card rounded-3xl p-6 border border-white cursor-pointer flex flex-col justify-between group">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-girlish-100 text-girlish-600 flex items-center justify-center text-lg mb-3">
                                    <i className="fa-brands fa-github"></i>
                                </div>
                                <h4 className="font-heading font-bold text-gray-900">Open Source</h4>
                                <p className="text-xs text-gray-600 mt-2 leading-relaxed">Actively contribute to open-source projects and maintain my own repos.</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-girlish-100 text-right">
                                <span className="text-xs font-bold text-girlish-600 group-hover:underline">View GitHub →</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="technical-skills" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-microchip"></i> Technical Skills
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Core Technology Stack</h2>
                        <p className="text-gray-600 text-sm">A comprehensive overview of the primary languages, frameworks, and platforms I utilize to build modern, scalable, and intelligent applications.</p>
                    </div>
                    <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-microchip text-girlish-500"></i> Generative AI & Vector DB</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">AWS Bedrock</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Amazon Titan Embeddings</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">AWS OpenSearch (Vector DB)</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">GCP Vertex AI</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Gemini & Claude LLMs</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">RAG Architecture</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Text-to-SQL</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">LangChain & LangGraph</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Pinecone DB</span>
                                </div>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-cloud-arrow-up text-girlish-500"></i> Cloud & DevOps (AWS / GCP)</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Amazon Connect</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">AWS Lambda</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Amazon Lex</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">DynamoDB</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">API Gateway</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">S3</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">IAM</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">EventBridge</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">CloudFormation</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Google Cloud Functions</span>
                                </div>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-server text-girlish-500"></i> Backend & Database</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Node.js</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Python</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Flask</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">REST APIs</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">WebSockets</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">PostgreSQL</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">MySQL</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">MongoDB</span>
                                </div>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-palette text-girlish-500"></i> Frontend & Design</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">React.js</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Next.js</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">TypeScript</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">JavaScript (ES6+)</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Tailwind CSS</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Figma</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">HTML5 & CSS3</span>
                                </div>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-screwdriver-wrench text-girlish-500"></i> Languages & Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Python</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">JavaScript</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">TypeScript</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">SQL</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Git & GitHub</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Docker</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Jira</span><span className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold border border-girlish-200">Postman</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="qualifications" className="scroll-mt-28 space-y-8">
                    <div className=" text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-award"></i> Qualifications & Certifications
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Academic & Professional Credentials</h2>
                        <p className="text-gray-600 text-sm">My formal education, industry-recognized certifications, and key professional achievements that form the foundation of my expertise.</p>
                    </div>
                    <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-certificate text-girlish-500"></i> Certifications</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-award text-amber-500 mt-1"></i><div><span className="font-bold text-gray-800">AWS Certified Solutions Architect – Associate</span><p className="text-xs text-gray-600">Amazon Web Services</p></div></li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-award text-amber-500 mt-1"></i><div><span className="font-bold text-gray-800">AWS Certified Developer – Associate</span><p className="text-xs text-gray-600">Amazon Web Services</p></div></li>
                                </ul>
                            </div>                            
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-graduation-cap text-girlish-500"></i> Education & Honors</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-school text-blue-500 mt-1"></i><div><span className="font-bold text-gray-800">B.Tech, Computer Science & Engineering</span><p className="text-xs text-gray-600">National Institute of Technology, Delhi (2017 - 2021)</p></div></li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-star text-blue-500 mt-1"></i><div><span className="font-bold text-gray-800">Class 12th Board (PCM) & Class 10th Board</span><p className="text-xs text-gray-600">Completed with Distinction</p></div></li>
                                </ul>
                            </div>
                            <div className="glass-card rounded-2xl p-6 border border-white space-y-3">
                                <h3 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2"><i className="fa-solid fa-trophy text-girlish-500"></i> Achievements & Awards</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-star text-amber-500 mt-1"></i><div><span className="font-bold text-gray-800">Top 5% Performer Rating</span><p className="text-xs text-gray-600">Consistently rated at Cognizant.</p></div></li>
                                    <li className="flex items-start gap-3"><i className="fa-solid fa-lightbulb text-amber-500 mt-1"></i><div><span className="font-bold text-gray-800">Hackathon Winner</span><p className="text-xs text-gray-600">Won multiple internal hackathons for AI/ML solutions.</p></div></li>
                                    <li className="flex items-start gap-3"><i className="fa-brands fa-medium text-amber-500 mt-1"></i><div><span className="font-bold text-gray-800">Technical Author</span><p className="text-xs text-gray-600">Published articles on GenAI on Medium.</p></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="scroll-mt-28 space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-girlish-100 text-girlish-700 font-bold text-xs uppercase tracking-wider">
                            <i className="fa-solid fa-comments"></i> Endorsements
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">Client Testimonials & Peer Reviews</h2>
                        <p className="text-gray-600 text-sm">Feedback from engineering directors, product managers, and freelance clients.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/48?u=director" alt="Testimonial" className="w-12 h-12 rounded-full border-2 border-girlish-300 shadow-md" />
                                <div>
                                    <h4 className="font-heading font-bold text-gray-900">Michael Anderson</h4>
                                    <p className="text-xs text-gray-600 font-semibold">Director of Engineering, Quantum Strides</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                                "Omprakash's expertise in RAG architecture and AWS Bedrock was instrumental in launching our QPlus platform. His ability to translate complex requirements into a scalable, efficient system is second to none. He's a true architect and a pleasure to work with."
                            </p>
                        </div>
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/48?u=manager" alt="Testimonial" className="w-12 h-12 rounded-full border-2 border-girlish-300 shadow-md" />
                                <div>
                                    <h4 className="font-heading font-bold text-gray-900">Jessica Chen</h4>
                                    <p className="text-xs text-gray-600 font-semibold">Product Manager, Cognizant</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                                "Working with Omprakash on the GenAI Power BI project was a game-changer. He consistently delivered high-quality code ahead of schedule and his deep understanding of both AI and business needs ensured we built a product that delivered massive value."
                            </p>
                        </div>
                        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/48?u=architect" alt="Testimonial" className="w-12 h-12 rounded-full border-2 border-girlish-300 shadow-md" />
                                <div>
                                    <h4 className="font-heading font-bold text-gray-900">David Lee</h4>
                                    <p className="text-xs text-gray-600 font-semibold">Senior Architect, Petco</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                                "Omprakash joined our Amazon Connect team and immediately made an impact. His proficiency in serverless development and contact center flows is impressive. He's a reliable, proactive engineer who elevates the entire team's performance."
                            </p>
                        </div>
                    </div>
                </section>

                <section id="contact" className="scroll-mt-28">
                    <div className="glass-panel rounded-3xl p-6 sm:p-12 shadow-glass relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                            <div className="lg:col-span-5 space-y-5">
                                <h2 className="font-heading text-3xl font-black text-gray-900">Let's Build Together</h2>
                                <p className="text-sm text-gray-700">Have a project in mind or looking for a GenAI architect? I'm open to full-time roles and freelance consulting. Let's connect!</p>
                                <div className="space-y-3">
                                    <a href="mailto:omchs10@gmail.com" className="flex items-center gap-3 group"><div className="w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 group-hover:bg-girlish-500 group-hover:text-white transition-all"><i className="fa-solid fa-envelope"></i></div><span className="text-sm font-semibold text-gray-800 group-hover:text-girlish-600">omchs10@gmail.com</span></a>
                                    <div onClick={() => copyToClipboard('+91 7355655802')} className="flex items-center gap-3 group cursor-pointer"><div className="w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 group-hover:bg-girlish-500 group-hover:text-white transition-all"><i className="fa-solid fa-phone"></i></div><span className="text-sm font-semibold text-gray-800 group-hover:text-girlish-600">+91 7355655802</span></div>
                                    <a href="https://www.linkedin.com/in/omchs10/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group"><div className="w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 group-hover:bg-girlish-500 group-hover:text-white transition-all"><i className="fa-brands fa-linkedin-in"></i></div><span className="text-sm font-semibold text-gray-800 group-hover:text-girlish-600">linkedin.com/in/omchs10</span></a>
                                    <a href="https://github.com/omchs10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group"><div className="w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 group-hover:bg-girlish-500 group-hover:text-white transition-all"><i className="fa-brands fa-github"></i></div><span className="text-sm font-semibold text-gray-800 group-hover:text-girlish-600">github.com/omchs10</span></a>
                                    <div className="flex items-center gap-3 group"><div className="w-9 h-9 rounded-xl bg-white/80 border border-girlish-200 flex items-center justify-center text-girlish-700 group-hover:bg-girlish-500 group-hover:text-white transition-all"><i className="fa-solid fa-location-dot"></i></div><span className="text-sm font-semibold text-gray-800 group-hover:text-girlish-600">Noida, India (Open to Relocate)</span></div>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <form onSubmit={handleFormSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-white">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Your Name" required className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-girlish-200 text-xs focus:outline-none focus:border-girlish-500" />
                                        <input type="email" placeholder="Your Email" required className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-girlish-200 text-xs focus:outline-none focus:border-girlish-500" />
                                    </div>
                                    <input type="text" placeholder="Subject" required className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-girlish-200 text-xs focus:outline-none focus:border-girlish-500" />
                                    <textarea placeholder="Your Message..." required rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-girlish-200 text-xs focus:outline-none focus:border-girlish-500"></textarea>
                                    <button type="submit" className="w-full bg-gradient-to-r from-girlish-600 to-girlish-400 text-white font-bold py-3 rounded-xl shadow-3d-pink hover:scale-105 active:scale-95 transition-all text-sm">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-girlish-200 py-8 bg-white/70 backdrop-blur-md text-center text-xs text-gray-600">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-heading font-bold text-gray-900">Omprakash Gupta © 2026 | GenAI & Cloud Architect</span>
                    <div className="flex items-center gap-4 text-girlish-700 font-semibold">
                        <a href="#hero" className="hover:underline">Back to top ↑</a>
                    </div>
                </div>
            </footer>

            {/* Chatbot */}
            <div id="chatbotContainer" className="fixed bottom-6 right-6 z-50">
                <button id="chatbotToggle" onClick={toggleChatbot} className="w-14 h-14 rounded-full bg-gradient-to-tr from-girlish-600 to-pink-500 text-white shadow-3d-pink flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                    <i className="fa-solid fa-robot"></i>
                </button>

                {chatbotOpen && (
                    <div id="chatbotWindow" className="absolute bottom-16 right-0 w-[90vw] sm:w-[360px] h-[480px] glass-panel rounded-3xl shadow-2xl border border-white flex flex-col overflow-hidden">
                        <div className="bg-gradient-to-r from-girlish-600 to-pink-500 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                                    <i className="fa-solid fa-sparkles"></i>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-sm">Omprakash AI Assistant</h4>
                                    <p className="text-[10px] text-pink-100">Ask me anything about Om's resume!</p>
                                </div>
                            </div>
                            <button onClick={toggleChatbot} className="text-white hover:text-pink-200 text-lg">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div id="chatMessages" ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={msg.sender === 'user'
                                    ? 'bg-girlish-600 text-white p-3 rounded-2xl ml-auto max-w-[85%] text-xs shadow-sm'
                                    : 'bg-white/80 p-3 rounded-2xl border border-girlish-100 max-w-[85%] text-gray-800 shadow-sm'}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="p-2 border-t border-girlish-100 bg-white/40 flex flex-wrap gap-1">
                            <button onClick={() => askQuickQuestion('Tell me about your RAG architecture?')} className="text-[10px] bg-white px-2 py-1 rounded-full border border-girlish-200 text-girlish-800 font-semibold hover:bg-girlish-50">RAG Setup?</button>
                            <button onClick={() => askQuickQuestion('What is your expected CTC & notice period?')} className="text-[10px] bg-white px-2 py-1 rounded-full border border-girlish-200 text-girlish-800 font-semibold hover:bg-girlish-50">CTC & Notice?</button>
                            <button onClick={() => askQuickQuestion('What is your current work at Shyftlabs?')} className="text-[10px] bg-white px-2 py-1 rounded-full border border-girlish-200 text-girlish-800 font-semibold hover:bg-girlish-50">Shyftlabs Role?</button>
                        </div>

                        <div className="p-3 bg-white/80 border-t border-girlish-200 flex gap-2">
                            <input id="chatInput" type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={handleChatKeyPress} placeholder="Ask about Omprakash..." className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-girlish-200 text-xs focus:outline-none focus:border-girlish-500" />
                            <button onClick={sendChatMessage} className="w-9 h-9 rounded-xl bg-girlish-600 text-white flex items-center justify-center text-xs shadow-md">
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {isDetailModalOpen && modalData && (
                <div id="detailModal" className="fixed inset-0 z-50 glass-panel bg-black/40 flex items-center justify-center p-4">
                    <div className="glass-card bg-white/95 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-white max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <button onClick={closeModal} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-girlish-100 text-girlish-700 flex items-center justify-center text-base hover:bg-girlish-200">
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="space-y-1">
                            <span id="modalCategory" className="text-[10px] font-bold text-girlish-600 bg-girlish-100 px-3 py-1 rounded-full uppercase tracking-wider">{modalData.category}</span>
                            <h3 id="modalTitle" className="font-heading text-2xl font-black text-gray-900 mt-2">{modalData.title}</h3>
                            <p id="modalSubtitle" className="text-xs text-girlish-700 font-bold">{modalData.subtitle}</p>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                            <div className="bg-girlish-50/80 p-4 rounded-2xl border border-girlish-100 space-y-1">
                                <h4 className="font-bold text-girlish-800 text-xs uppercase tracking-wider">Overview</h4>
                                <p id="modalOverview" className="leading-relaxed">{modalData.overview}</p>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
                                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Impact & Architecture</h4>
                                <p id="modalImpact" className="leading-relaxed">{'impact' in modalData ? modalData.impact : ''}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Technologies & Resources</h4>
                            <div id="modalTags" className="flex flex-wrap gap-2">
                                {modalData.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold border border-pink-200">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div id="toast" className="fixed bottom-6 left-6 z-50 glass-panel bg-girlish-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2">
                    <i className="fa-solid fa-circle-check"></i>
                    <span id="toastMsg">{toast.msg}</span>
                </div>
            )}
        </div>
    );
}

export default App;
