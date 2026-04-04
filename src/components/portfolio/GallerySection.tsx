import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    alt: 'Coding workspace',
    category: 'Workspace',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=600&fit=crop',
    alt: 'Design mockup on tablet',
    category: 'Design',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&h=400&fit=crop',
    alt: 'Web design process',
    category: 'Process',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
    alt: 'Mobile app design',
    category: 'Mobile',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop',
    alt: 'UI design components',
    category: 'Design',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop',
    alt: 'Team collaboration',
    category: 'Team',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=600&fit=crop',
    alt: 'Wireframing session',
    category: 'Process',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    alt: 'Analytics dashboard',
    category: 'Dashboard',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    alt: 'Code on screen',
    category: 'Workspace',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=600&fit=crop',
    alt: 'Mobile UI design',
    category: 'Mobile',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
    alt: 'Responsive web design',
    category: 'Design',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
    alt: 'Design tools',
    category: 'Workspace',
  },
];

const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section id="gallery" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Behind the scenes
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A visual journey through my work, workspace, and creative process.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Maximize2 size={24} className="text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div
            className="max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentIndex].src.replace('w=600', 'w=1200').replace('h=400', 'h=800').replace('h=600', 'h=800')}
              alt={galleryImages[currentIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium">
                {galleryImages[currentIndex].alt}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
