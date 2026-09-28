import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Heart, ZoomIn } from 'lucide-react';

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspect: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'walk',
    src: '/src/assets/images/gallery_couple_walk_1790598657232.jpg',
    title: 'Caminho a Dois',
    caption: '“Onde fores, irei; e onde ficares, ficarei.” — Ensaio pré-casamento',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'embrace',
    src: '/src/assets/images/gallery_couple_embrace_1790598672992.jpg',
    title: 'Amor & Cumplicidade',
    caption: 'A serenidade de quem encontrou no outro o seu lar.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'rings',
    src: '/src/assets/images/gallery_wedding_rings_1790598685214.jpg',
    title: 'Alianças Eternas',
    caption: 'Símbolo visível da nossa promessa sagrada diante de Deus.',
    aspect: 'aspect-square',
  },
  {
    id: 'venue',
    src: '/src/assets/images/gallery_reception_venue_1790598696827.jpg',
    title: 'Noite dos Sonhos',
    caption: 'O cenário onde celebraremos o nosso amor com todos os entes queridos.',
    aspect: 'aspect-[16/9]',
  },
];

export function PhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextPhoto = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % GALLERY_PHOTOS.length);
    }
  };

  const prevPhoto = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-12" id="galeria">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5b8070] font-semibold mb-2">
          <Camera className="w-3.5 h-3.5 text-[#5b8070]" />
          <span>Momentos Especiais</span>
          <Heart className="w-3.5 h-3.5 fill-[#5b8070]/20 text-[#5b8070]" />
        </div>
        <h2 className="font-script text-4xl sm:text-5xl text-[#0e3b31]">
          Nossa História em Imagens
        </h2>
        <p className="font-cormorant italic text-sm sm:text-base text-[#526f63] mt-1 max-w-md mx-auto">
          Um vislumbre do amor, dos sorrisos e dos passos que nos trouxeram até este dia inesquecível.
        </p>
      </div>

      {/* Grid of 4 photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GALLERY_PHOTOS.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-xl overflow-hidden bg-[#eae5d8] border border-[#d9d0bf] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Image Container with Fallback */}
            <div className={`w-full ${photo.aspect} relative overflow-hidden bg-gradient-to-tr from-[#e5dfd2] to-[#f4f0e6]`}>
              <img
                src={photo.src}
                alt={photo.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container in case of error
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Subtle hover overlay scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e3b31]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                <span className="font-cormorant font-semibold text-base leading-tight">
                  {photo.title}
                </span>
                <span className="text-[11px] text-[#e0ece5] line-clamp-1 mt-0.5">
                  {photo.caption}
                </span>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#fae596] font-medium">
                  <ZoomIn className="w-3 h-3" />
                  <span>Toque para ampliar</span>
                </div>
              </div>
            </div>

            {/* Quiet caption underneath */}
            <div className="p-3 bg-white border-t border-[#ede7db]">
              <h4 className="font-medium text-xs text-[#1e483d] truncate">{photo.title}</h4>
              <p className="text-[11px] text-[#6d8a7e] font-cormorant italic line-clamp-1 mt-0.5">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
          }}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[70vh] bg-black">
              <img
                src={GALLERY_PHOTOS[selectedIdx].src}
                alt={GALLERY_PHOTOS[selectedIdx].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Captions below image */}
            <div className="text-center mt-4 text-white max-w-lg">
              <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#fae596]">
                {GALLERY_PHOTOS[selectedIdx].title}
              </h3>
              <p className="font-cormorant italic text-sm sm:text-base text-[#e5ebe7] mt-1">
                {GALLERY_PHOTOS[selectedIdx].caption}
              </p>
              <div className="text-xs text-white/50 mt-2 font-mono tabular-nums">
                {selectedIdx + 1} / {GALLERY_PHOTOS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
