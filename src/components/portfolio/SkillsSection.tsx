import React, { useState } from 'react';
import { Code2, Server, Wrench, Palette } from 'lucide-react';

type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design';

interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 92, category: 'frontend' },
  { name: 'JavaScript (ES6+)', level: 95, category: 'frontend' },
  { name: 'HTML5 / CSS3', level: 98, category: 'frontend' },
  { name: 'Tailwind CSS', level: 94, category: 'frontend' },
  { name: 'Vue.js', level: 78, category: 'frontend' },
  { name: 'Node.js / Express', level: 90, category: 'backend' },
  { name: 'Python / Django', level: 82, category: 'backend' },
  { name: 'PostgreSQL', level: 88, category: 'backend' },
  { name: 'MongoDB', level: 85, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },
  { name: 'REST API Design', level: 92, category: 'backend' },
  { name: 'Git / GitHub', level: 95, category: 'tools' },
  { name: 'Docker', level: 82, category: 'tools' },
  { name: 'AWS / Vercel', level: 85, category: 'tools' },
  { name: 'CI/CD Pipelines', level: 78, category: 'tools' },
  { name: 'Figma', level: 88, category: 'design' },
  { name: 'UI/UX Design', level: 85, category: 'design' },
  { name: 'Design Systems', level: 90, category: 'design' },
  { name: 'Responsive Design', level: 95, category: 'design' },
];

const categories = [
  { id: 'frontend' as SkillCategory, label: 'Frontend', icon: Code2 },
  { id: 'backend' as SkillCategory, label: 'Backend', icon: Server },
  { id: 'tools' as SkillCategory, label: 'DevOps & Tools', icon: Wrench },
  { id: 'design' as SkillCategory, label: 'Design', icon: Palette },
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            My Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Technical expertise
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use
            to bring ideas to life.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            All Skills
          </button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-5 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
