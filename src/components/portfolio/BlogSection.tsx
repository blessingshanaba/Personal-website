import React, { useState } from 'react';
import { Clock, ArrowRight, Tag, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/use-supabase';

const BlogSection: React.FC = () => {
  const { data: blogPosts = [], isLoading } = useBlogPosts(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const visiblePosts = blogPosts.slice(0, visibleCount);
  const hasMore = visibleCount < blogPosts.length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Blog
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Latest articles
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development, design, and
            the tech industry.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {/* Blog grid */}
        {!isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
                      <Tag size={12} />
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <a
                    href={`#blog-${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
                  >
                    Read More
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load more */}
        {!isLoading && hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(blogPosts.length)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-background border-2 border-border text-foreground font-semibold text-sm rounded-full hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              Load More Articles
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {!isLoading && blogPosts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
