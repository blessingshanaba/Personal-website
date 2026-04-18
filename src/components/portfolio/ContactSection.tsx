import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useSubmitContact } from '../../hooks/use-supabase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitContact.mutateAsync(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      // Error handled by mutation
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'blessshanaba02@gmail.com', href: 'mailto:blessshanaba02@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+234 8064027344', href: 'tel:+2348064027344' },
    { icon: MapPin, label: 'Location', value: 'Nigeria', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/blessingshanaba', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/ShanabaBlessing', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">Let's work together</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a key={info.label} href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Follow me on social media</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                      aria-label={social.label}>
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Available for freelance</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I'm currently accepting new projects. Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full p-12 rounded-2xl bg-card border border-border/50 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border/50">
                {submitContact.isError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                    Failed to send message. Please try again.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all`} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all`} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} text-foreground focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all`}>
                    <option value="">Select a subject</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none`} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={submitContact.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-full hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed">
                  {submitContact.isPending ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
