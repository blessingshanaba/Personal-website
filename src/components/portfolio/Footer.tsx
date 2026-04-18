import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, CheckCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile Development', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Consulting', href: '#services' },
    { label: 'Code Review', href: '#services' },
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Blessing Shanaba
            </a>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
              Full-stack developer crafting beautiful, performant web
              applications. Let's build something amazing together.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com/blessingshanaba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/ShanabaBlessing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:blessshanaba02@gmail.com"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border border-primary/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Stay in the loop
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Subscribe to my newsletter for the latest articles, tutorials, and
              project updates.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                <CheckCircle size={18} />
                Thanks for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Blessing Shanaba. All rights
            reserved.
          </p>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Built with
            <Heart size={14} className="text-red-500 fill-red-500 mx-1" />
            using React & Tailwind CSS
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
