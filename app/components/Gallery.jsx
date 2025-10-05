"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Cấu trúc gallery: 8 ảnh
  // Cột 1: ảnh ngang (1), ảnh dọc (2), ảnh ngang (3)
  // Cột 2: ảnh dọc (4), ảnh dọc (5)
  // Cột 3: ảnh ngang (6), ảnh dọc (7), ảnh ngang (8)
  const galleryImages = [
    { src: "/hero1.jpg", alt: "Khoảnh khắc 1", type: "landscape", column: 1 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 2", type: "portrait", column: 1 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 3", type: "landscape", column: 1 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 4", type: "portrait", column: 2 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 5", type: "portrait", column: 2 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 6", type: "landscape", column: 3 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 7", type: "portrait", column: 3 },
    { src: "/hero1.jpg", alt: "Khoảnh khắc 8", type: "landscape", column: 3 },
  ];

  // Tạo flat array cho lightbox navigation
  const allImages = galleryImages;

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  // Nhóm ảnh theo cột
  const column1Images = galleryImages.filter((img) => img.column === 1);
  const column2Images = galleryImages.filter((img) => img.column === 2);
  const column3Images = galleryImages.filter((img) => img.column === 3);

  return (
    <section className="mt-12 mb-16">
      {/* Header với design sáng tạo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-12 relative"
      >
        {/* Decorative background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-200/30 via-gray-300/20 to-gray-200/30 rounded-full blur-3xl -z-10"></div>

        {/* Main title */}
        <h2 className="playfair-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Khoảnh Khắc Ngọt Ngào
        </h2>

        {/* Subtitle with hearts */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            className="text-gray-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.span>
          <p className="text-gray-600 text-sm sm:text-base font-light tracking-wider">
            Những kỷ niệm đẹp nhất của chúng tôi
          </p>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 0.3,
            }}
            className="text-gray-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.span>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-[2px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-gray-400 to-gray-400 rounded-full"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="h-[2px] w-8 bg-gray-400 rounded-full"></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="h-[2px] w-16 sm:w-20 bg-gradient-to-l from-transparent via-gray-400 to-gray-400 rounded-full"></div>
        </div>
      </motion.div>

      {/* Gallery Grid với bố cục 3 cột - áp dụng cho cả mobile và desktop */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {/* Cột 1: ảnh ngang, ảnh dọc, ảnh ngang */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {column1Images.map((image, idx) => {
            const globalIndex = galleryImages.indexOf(image);
            return (
              <GalleryItem
                key={globalIndex}
                image={image}
                index={globalIndex}
                onImageClick={() => openLightbox(globalIndex)}
              />
            );
          })}
        </div>

        {/* Cột 2: 2 ảnh dọc */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {column2Images.map((image, idx) => {
            const globalIndex = galleryImages.indexOf(image);
            return (
              <GalleryItem
                key={globalIndex}
                image={image}
                index={globalIndex}
                onImageClick={() => openLightbox(globalIndex)}
              />
            );
          })}
        </div>

        {/* Cột 3: ảnh ngang, ảnh dọc, ảnh ngang */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {column3Images.map((image, idx) => {
            const globalIndex = galleryImages.indexOf(image);
            return (
              <GalleryItem
                key={globalIndex}
                image={image}
                index={globalIndex}
                onImageClick={() => openLightbox(globalIndex)}
              />
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={selectedImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}

function GalleryItem({ image, index, onImageClick }) {
  // Định nghĩa aspect ratio cho từng loại ảnh
  const getAspectClass = (type) => {
    switch (type) {
      case "landscape":
        return "aspect-[4/3]"; // Ảnh ngang: tỷ lệ 4:3
      case "portrait":
        return "aspect-[3/4]"; // Ảnh dọc: tỷ lệ 3:4
      default:
        return "aspect-square"; // Mặc định: ảnh vuông
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-xl shadow-lg cursor-pointer ${getAspectClass(
        image.type
      )}`}
      onClick={onImageClick}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
      />

      {/* Decorative border overlay */}
      <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-300 rounded-xl pointer-events-none"></div>

      {/* Gradient overlay với hiệu ứng động */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700/0 via-gray-600/0 to-gray-800/0 group-hover:from-gray-700/20 group-hover:via-gray-600/10 group-hover:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white font-medium text-sm sm:text-base text-center drop-shadow-lg">
              {image.alt}
            </p>
          </div>
        </div>
      </div>

      {/* Icon zoom với animation xoay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
        <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-2xl group-hover:rotate-90 transition-transform duration-500">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/60 transition-all duration-300 rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/60 transition-all duration-300 rounded-bl-lg"></div>
    </motion.div>
  );
}
