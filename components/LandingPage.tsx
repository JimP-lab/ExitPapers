import React, { useRef, useState, useEffect } from 'react';
import { Shield, ArrowRight, Zap, FileCheck, Lock, Play, Pause } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Scroll-based autoplay logic
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // Play when element is visible
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch((error) => {
                console.log("Autoplay prevented or pending:", error);
                setIsPlaying(false);
              });
          }
        } else {
          // Pause when element is not visible
          videoElement.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video container is visible
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    console.error('Video loading error:', {
      error: video.error,
      errorCode: video.error?.code,
      errorMessage: video.error?.message,
      src: video.currentSrc,
      networkState: video.networkState,
      readyState: video.readyState
    });
    setVideoError(true);
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoError(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">ExitPapers</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onEnterApp}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onEnterApp}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Online • v1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
          Military Exit Protocols, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Digitized & Secured.
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Replace physical slips with AI-generated, cryptographically secure digital exit papers. 
          Streamline command operations and enhance base security.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Deploy System
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Soldier Portal
          </button>
        </div>

        {/* Video Preview Section - Laptop Style */}
        <div ref={containerRef} className="relative mx-auto max-w-5xl mt-12 scroll-mt-24">
           {/* Ambient Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-3xl rounded-full -z-10"></div>
           
           <div className="relative">
              {/* Laptop Screen Frame (Bezel) */}
              <div className="bg-slate-800 rounded-t-xl md:rounded-t-2xl p-2 md:p-3 shadow-2xl border border-slate-700">
                {/* Screen Content */}
                <div 
                  className="relative rounded-lg overflow-hidden bg-black aspect-video group"
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(isPlaying ? false : true)}
                >
                  {videoError ? (
                    // Fallback UI when video fails to load
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                      <div className="text-center p-8">
                        <Shield className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                        <h3 className="text-xl font-bold mb-2">ExitPapers System Preview</h3>
                        <p className="text-slate-400 text-sm mb-4">Video preview temporarily unavailable</p>
                        <button
                          onClick={onEnterApp}
                          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                          View Live Demo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      loop 
                      muted 
                      playsInline
                      preload="metadata"
                      onError={handleVideoError}
                      onLoadedData={handleVideoLoad}
                    >
                      {/* FIXED: Added leading slash and multiple source formats for better compatibility */}
                      <source src="/attachments/ExitPapers-Preview.webm" type="video/webm"/>    
                      {/* Fallback message for browsers that don't support video tag */}
                      Your browser does not support the video tag.
                    </video>
                  )}
                  
                  {/* Controls Overlay */}
                  {!videoError && (
                    <button
                      onClick={togglePlay}
                      className={`absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] transition-all duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      <div className={`
                        flex items-center justify-center w-16 h-16 md:w-20 md:h-20 
                        rounded-full bg-slate-900/90 text-white border border-slate-700/50 shadow-2xl
                        transition-all duration-300 transform
                        hover:scale-110 hover:bg-emerald-600 hover:border-emerald-500
                      `}>
                        {isPlaying ? <Pause className="w-6 h-6 md:w-8 md:h-8 fill-current" /> : <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Laptop Base */}
              <div className="relative mx-auto w-full">
                <div className="bg-gradient-to-b from-slate-700 to-slate-900 h-3 md:h-4 rounded-b-lg shadow-lg mx-4 md:mx-8 border-t border-slate-600/50" />
                <div className="bg-slate-800 h-2 md:h-3 rounded-b-xl opacity-50 mx-12 md:mx-24" />
              </div>
           </div>

           <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
             <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : videoError ? 'bg-red-500' : 'bg-slate-400'}`}></div>
             {videoError ? 'Video Unavailable' : (isPlaying ? 'Live System Preview' : 'Preview Paused')}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Command Control Features</h2>
            <p className="text-slate-500 mt-4">Built for efficiency in high-stakes environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Protocol Generation</h3>
              <p className="text-slate-600 leading-relaxed">
                Utilizes Gemini AI to instantly draft formal military exit statements tailored to each soldier's rank and the specific command post requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Verification</h3>
              <p className="text-slate-600 leading-relaxed">
                Every exit paper comes with a unique QR code and digital signature, allowing gate guards to verify authenticity in seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Roster Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Commanders can bulk import rosters, toggle approvals instantly, and revoke access with a single click from the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
              <div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">0s</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Paper Wait Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">100%</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Digital Audit Trail</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">AES</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest">Encryption Standard</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">24/7</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest">System Uptime</p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Shield className="w-6 h-6 text-slate-900" />
             <span className="font-bold text-lg text-slate-900">ExitPapers</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2025 ExitPapers Military Systems. All rights reserved. Restricted Access.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-900">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-900">Security</a>
            <a href="#" className="text-slate-400 hover:text-slate-900">Contact Command</a>
          </div>
        </div>
      </footer>
    </div>
  );
};