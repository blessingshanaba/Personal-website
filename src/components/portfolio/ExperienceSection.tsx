import React, { useState } from 'react';
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineItem {
  id: number;
  type: 'work';
  title: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Senior Frontend Developer',
    organization: 'TechVision Labs',
    period: 'Jan 2024 - Present',
    description: 'Leading frontend architecture and development for enterprise SaaS products.',
    achievements: [
      'Architected a micro-frontend system serving 100K+ daily users',
      'Reduced bundle size by 40% through code splitting and lazy loading',
      'Implemented comprehensive design system with 50+ components',
    ],
    current: true,
  },
  {
    id: 4,
    type: 'work',
    title: 'Junior Web Developer',
    organization: 'NSUK',
    period: 'Jan 2024 - May 2026',
    description: 'Started my professional journey building websites and web applications.',
    achievements: [
      'Developed 5 responsive websites for small businesses',
      'Learned modern JavaScript frameworks and best practices',
    ],
  },
];


const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            My Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Experience & Education
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and academic achievements.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                        item.current
                          ? 'bg-primary border-primary/20 text-primary-foreground'
                          : 'bg-card border-border text-muted-foreground'
                      }`}
                    >
                      {item.type === 'work' ? (
                        <Briefcase size={16} />
                      ) : (
                        <GraduationCap size={16} />
                      )}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? '' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full text-left"
                    >
                      <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-foreground">
                                {item.title}
                              </h3>
                              {item.current && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-primary font-medium text-sm">
                              {item.organization}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.period}
                            </p>
                          </div>
                          <div className="text-muted-foreground">
                            {isExpanded ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-3">
                          {item.description}
                        </p>

                        {/* Expandable achievements */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-96 mt-4' : 'max-h-0'
                          }`}
                        >
                          <ul className="space-y-2">
                            {item.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
