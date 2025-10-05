"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * Lightbox Component - Shared popup để xem ảnh phóng to
 *
 * Props:
 * - images: Array of image objects with src and alt properties
 *   Format: [{ src: "/path/to/image.jpg", alt: "Description" }, ...]
 *   OR: ["/path/to/image.jpg", ...] (for simple string array)
 * - currentIndex: Current image index
 * - onClose: Callback when closing lightbox
 * - onNext: Callback to navigate to next image
 * - onPrev: Callback to navigate to previous image
 * - showThumbnails: Show thumbnail navigation (default: true)
 * - showKeyboardHint: Show keyboard shortcuts hint (default: true)
 */
export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  showThumbnails = true,
  showKeyboardHint = true,
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Normalize image format (support both object and string array)
  const normalizeImage = (img) => {
    if (typeof img === "string") {
      return { src: img, alt: `Image ${currentIndex + 1}` };
    }
    return img;
  };

  const currentImage = normalizeImage(images[currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-white/10 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white/20"
        aria-label="Đóng"
      >
        ×
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-10 bg-white/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-white/20"
        aria-label="Ảnh trước"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-10 bg-white/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-white/20"
        aria-label="Ảnh tiếp"
      >
        ›
      </button>

      {/* Main image with animation */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
      </motion.div>

      {/* Image counter - chỉ hiển thị số thứ tự, không hiển thị tên ảnh */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="font-semibold">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails navigation (optional - chỉ hiện trên desktop) */}
      {showThumbnails && images.length > 1 && (
        <div className="hidden md:flex absolute bottom-20 left-1/2 transform -translate-x-1/2 gap-2 max-w-2xl overflow-x-auto px-4 scrollbar-hide">
          {images.map((img, idx) => {
            const normalizedImg = normalizeImage(img);
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to the clicked image
                  const diff = idx - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev();
                  }
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex
                    ? "border-white scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={normalizedImg.src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      {showKeyboardHint && (
        <div className="hidden sm:block absolute top-20 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
          <p>Sử dụng phím ← → để chuyển ảnh, ESC để đóng</p>
        </div>
      )}
    </motion.div>
  );
}
