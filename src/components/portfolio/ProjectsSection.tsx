import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowUpRight, Loader2 } from 'lucide-react';
import { useProjects, type Project } from '@/hooks/use-supabase';

const ProjectsSection: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            My Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Featured work
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills in building modern,
            scalable, and user-friendly applications.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
