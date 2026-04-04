import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Blessing_Shanaba_CV.pdf';
    // In production, this would link to an actual PDF
    alert('CV download started! (In production, this would download the actual CV file)');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-400/3 dark:bg-violet-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Greeting */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-fade-in">
          <span className="text-primary font-medium text-sm md:text-base">
            Hi, I'm Blessing Shanaba
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8">
          <span className="text-foreground">I design & build</span>
          <br />
          <span className="text-gradient">brand identities</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
          Full-stack developer specializing in React, TypeScript, and design
          systems. I create clean, performant, and user-focused web
          applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleViewWork}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-full hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
          >
            View My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleDownloadCV}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-background border-2 border-border text-foreground font-semibold text-base rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02]"
          >
            <Download size={18} className="text-primary" />
            Download CV
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground mr-2">Find me on</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
