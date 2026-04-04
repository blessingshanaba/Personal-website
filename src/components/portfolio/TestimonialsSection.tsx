import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Blessing delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise transformed our vision into reality. The web application he built has significantly improved our user engagement metrics.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Working with Blessing was a game-changer for our startup. He not only built a robust platform but also provided invaluable technical guidance. His code quality and architecture decisions have made our product incredibly maintainable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'Creative Labs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Blessing has an incredible ability to translate complex requirements into elegant solutions. He consistently delivered features ahead of schedule and the quality of his work speaks for itself. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Okafor',
    role: 'Founder',
    company: 'AfriPay',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Blessing built our entire payment platform from scratch. His understanding of both frontend and backend technologies is remarkable. The system handles thousands of transactions daily without any issues.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Design Director',
    company: 'Pixel Perfect Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'As a designer, I appreciate developers who respect the design. Blessing implemented our designs pixel-perfectly and even suggested UX improvements that enhanced the final product. A true professional.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            What clients say
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg">
            {/* Quote icon */}
            <div className="mb-6">
              <Quote size={40} className="text-primary/20" />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < current.rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground/20'
                  }
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 min-h-[120px]">
              "{current.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-bold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.role} at {current.company}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  className="p-2.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="p-2.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/20 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
