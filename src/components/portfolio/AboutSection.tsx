import React from 'react';
import { MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '15+', label: 'Open Source Contributions' },
];

const techStack = [
  { name: 'React', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-700 dark:text-blue-300' },
  { name: 'Next.js', color: 'bg-gray-800/10 text-gray-800 dark:text-gray-300' },
  { name: 'Node.js', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  { name: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  { name: 'Python', color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' },
  { name: 'Docker', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Get to know me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69ce56f6a40b3f9c53a03a82_1775131749635_6c2dceea.png"
                alt="Blessing Shanaba"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10 hidden lg:block" />
          </div>

          {/* Content side */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              A passionate developer crafting{' '}
              <span className="text-gradient">digital experiences</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm Blessing Shanaba, a full-stack developer with over 5 years of experience
              building modern web applications. I specialize in creating intuitive,
              performant, and accessible digital products that make a real impact.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              My approach combines clean code architecture with thoughtful design,
              ensuring every project I deliver is both technically robust and
              visually compelling. I'm passionate about open source, design systems,
              and pushing the boundaries of what's possible on the web.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-medium text-foreground">5+ Years</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Degree</p>
                  <p className="text-sm font-medium text-foreground">B.Sc. Computer Sci.</p>
                </div>
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full ${tech.color} transition-all hover:scale-105`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
