import React from 'react';
import {
  Monitor,
  Smartphone,
  Palette,
  Database,
  Rocket,
  Shield,
  Code2,
  BarChart3,
} from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    icon: Monitor,
    title: 'Web Development',
    description:
      'Custom web applications built with React, Next.js, and TypeScript. Responsive, performant, and SEO-optimized.',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps using React Native. Native performance with a single codebase for iOS and Android.',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centered design with Figma. Wireframes, prototypes, and design systems that elevate your brand.',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    icon: Database,
    title: 'Backend Development',
    description:
      'Scalable APIs and microservices with Node.js, Python, and PostgreSQL. Secure and well-documented.',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    description:
      'Speed up your existing applications. Core Web Vitals optimization, caching strategies, and bundle analysis.',
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
  {
    icon: Shield,
    title: 'Security Audits',
    description:
      'Comprehensive security reviews for web applications. Vulnerability assessment and best practice implementation.',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Code2,
    title: 'Code Review & Consulting',
    description:
      'Expert code reviews, architecture consulting, and technical mentorship for development teams.',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: BarChart3,
    title: 'Analytics & SEO',
    description:
      'Data-driven growth strategies. Google Analytics setup, SEO optimization, and conversion tracking.',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            What I Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Services & expertise
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I offer end-to-end development services
            tailored to your business needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
