import React, { useRef, useState, useEffect } from 'react';
import { Shield, ArrowRight, Zap, FileCheck, Lock, Play, Pause } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Scroll-based visibility logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    console.error('Video loading error details:', {
      src: video.currentSrc,
      networkState: video.networkState,
      readyState: video.readyState,
      error: video.error ? {
          code: video.error.code,
          message: video.error.message
      } : 'No specific error object'
    });
    
    if (video.networkState === 3 || video.error) {
       setVideoError(true);
    }
  };

  const handleVideoCanPlay = () => {
    setVideoError(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 overflow-x-hidden">
      {/* Zenvoice-style Background Blurs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">ExitPapers</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onEnterApp}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={onEnterApp}
              className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-slate-200 transition-all hover:-translate-y-0.5"
            >
              Get started free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-xs font-bold uppercase tracking-[0.1em] mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Trusted by Field Commanders
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95] max-w-5xl mx-auto">
          The ultimate <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-500">
            exit paper system
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
          Create Digital Secure Exit Papers and Streamline Your Command Process.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-emerald-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            Start Creating
            <ArrowRight className="w-6 h-6" />
          </button>
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-100 rounded-2xl font-bold text-xl transition-all shadow-sm flex items-center justify-center gap-3"
          >
            Watch Demo
          </button>
        </div>

        {/* Premium Video Section - Framed Browser/Dashboard Window with Vimeo Embed */}
        <div ref={containerRef} className="relative mx-auto max-w-6xl mt-12 scroll-mt-32">
           {/* Ambient Lighting */}
           <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90%] h-[120%] bg-emerald-500/10 blur-[100px] rounded-full -z-10 animate-pulse-slow"></div>
           
           <div className="relative group transition-transform duration-700 ease-out hover:scale-[1.01]">
              {/* Browser/SaaS Window Frame - Zenvoice Aesthetic */}
              <div className="bg-[#fcfcfc] rounded-[2rem] p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15),0_0_1px_1px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
                
                {/* Window Header Dots */}
                <div className="flex gap-2 mb-3 px-4 pt-1">
                  <div className="w-3 h-3 rounded-full bg-red-400/30"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/30"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/30"></div>
                </div>

                {/* Video Container - Vimeo Platform Preview with Quality and Control settings */}
                <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-900 aspect-video shadow-inner">
                  {/* 
                    Vimeo Embed optimized:
                    - controls=1: Enables native pause, play, volume, and progress bar
                    - quality=auto: Ensures fast load with scaling up to max available quality
                    - dnt=1: Do not track for privacy and performance
                    - app_id: Provided in user template for optimal delivery
                  */}
                  <iframe
                    ref={iframeRef}
                    className="absolute inset-0 w-full h-full border-0"
                    src="https://player.vimeo.com/video/1148413840?badge=0&autopause=0&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=1&quality=auto&dnt=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    title="ExitPapers Platform Preview"
                    loading="lazy"
                  ></iframe>
                  
                  <video 
                    ref={videoRef} 
                    className="hidden" 
                    onError={handleVideoError} 
                    onCanPlay={handleVideoCanPlay}
                  />
                </div>
              </div>

              {/* Decorative floating shadow */}
              <div className="absolute -bottom-10 left-10 right-10 h-20 bg-black/5 blur-[40px] rounded-[100%] pointer-events-none"></div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Mission Critical Features</h2>
            <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">Everything you need to modernize military leave management without compromising protocol.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Digital Protocol </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Instantly draft formal military exit statements tailored to each soldier's rank.
              </p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Digital Verification</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Secure QR codes and digital signatures allow gate guards to verify authenticity in real-time.
              </p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Secure Rosters</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Bulk import rosters and manage approvals from a high-performance central command dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full translate-x-[50%]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x-0 md:divide-x divide-slate-800">
              <div className="px-6">
                <p className="text-5xl font-black text-emerald-400 mb-3 tracking-tighter">0s</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Wait Time</p>
              </div>
              <div className="px-6">
                <p className="text-5xl font-black text-emerald-400 mb-3 tracking-tighter">100%</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Audit Trail</p>
              </div>
              <div className="px-6">
                <p className="text-5xl font-black text-emerald-400 mb-3 tracking-tighter">AES</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Secured</p>
              </div>
              <div className="px-6">
                <p className="text-5xl font-black text-emerald-400 mb-3 tracking-tighter">24/7</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Uptime</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-16 text-center shadow-3xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to modernize <br />your command?</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">Get started today and see why top field units choose ExitPapers for their digital protocol.</p>
          <button 
            onClick={onEnterApp}
            className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-emerald-900/40 transition-all transform hover:scale-105"
          >
            Deploy ExitPapers Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fafafa] border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
             <div className="flex items-center gap-2.5 mb-6">
                <Shield className="w-8 h-8 text-slate-900" />
                <span className="font-bold text-2xl text-slate-900 tracking-tighter">ExitPapers</span>
             </div>
             <p className="text-slate-500 leading-relaxed text-sm">
               The gold standard in military exit paper management. Securing perimeters through intelligence and automation.
             </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Product</span>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Features</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Security</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Enterprise</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Company</span>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">About</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Careers</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Legal</span>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400 uppercase tracking-[0.2em]">
          <span>© 2025 ExitPapers Military Systems</span>
          <span>Restricted Access Protocol Active</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
