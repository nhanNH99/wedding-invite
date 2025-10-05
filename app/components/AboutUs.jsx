"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "./Lightbox";

export default function AboutUs() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const allImages = [
    "/bride1.png",
    "/bride2.png",
    "/bride3.png",
    "/groom1.png",
    "/groom2.png",
    "/groom3.png",
  ];

  const openLightbox = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
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
  return (
    <section className="mt-12 mb-16 px-4 sm:px-6">
      {/* Title centered on divider line */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative flex items-center justify-center mb-8"
      >
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-300"></div>

        {/* Title */}
        <div className="px-6">
          <h2 className="source-serif-4-bold text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-gray-800 whitespace-nowrap">
            Về chúng tôi
          </h2>
        </div>

        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
      </motion.div>

      {/* About Cards */}
      <div className="space-y-12">
        {/* Cô dâu */}
        <AboutCard
          name="HỒNG PHÚC"
          title="Về cô dâu"
          description="Em là một cô gái luôn tin vào điều kỳ diệu của tình yêu, và Em đã tìm thấy điều kỳ diệu ấy ở anh. Anh là người làm cho nụ cười của em trở nên trọn vẹn và giúp em vững tin hơn trên mọi chặng đường. Anh không chỉ là người yêu, mà còn là người bạn thân nhất, là nguồn năng lượng tích cực giúp em thêm yêu cuộc sống này. Bằng tất cả tình yêu và sự chân thành, Em đã sẵn sàng cùng anh xây đắp một tổ ấm hạnh phúc."
          images={["/bride1.png", "/bride2.png", "/bride3.png"]}
          alignment="left"
          onImageClick={openLightbox}
        />

        {/* Chú rể */}
        <AboutCard
          name="HIỀN NHÂN"
          title="Về chú rể"
          description="Anh là một người đàn ông may mắn khi tìm thấy một nửa hoàn hảo của đời mình. Em là ánh sáng, là niềm vui, và là tất cả những gì anh hằng mong ước. Anh hứa sẽ là chỗ dựa vững chãi, là bờ vai để em tựa vào suốt cuộc đời này. Đối với anh, kết hôn không chỉ là lời hứa, mà còn là hành trình cùng nhau vun đắp những điều tốt đẹp nhất cho gia đình nhỏ của Chúng mình."
          images={["/groom1.png", "/groom2.png", "/groom3.png"]}
          alignment="right"
          onImageClick={openLightbox}
        />
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

function AboutCard({
  name,
  title,
  description,
  images,
  alignment,
  onImageClick,
}) {
  const isBride = alignment === "right";
  const allImages = [
    "/bride1.png",
    "/bride2.png",
    "/bride3.png",
    "/groom1.png",
    "/groom2.png",
    "/groom3.png",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      {/* Title and Name - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mb-3"
      >
        <p className="playfair-display text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">
          {title}
        </p>
        <h3 className="playfair-display text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {name}
        </h3>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <div className="relative max-w-2xl mx-auto overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${
                isBride ? "/bride-bg.png" : "/groom-bg.png"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Overlay để text dễ đọc hơn */}
          <div className="absolute inset-0 bg-opacity-80"></div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8">
            <p className="source-serif-4-normal text-sm sm:text-base leading-relaxed text-gray-800 text-justify">
              {description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Images section with staggered heights */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="flex gap-4 items-end max-w-md">
          {images.map((src, index) => {
            // For bride (left): middle image higher
            // For groom (right): middle image lower
            let heightClass = "aspect-[3/4]";
            let marginClass = "";

            if (index === 1) {
              // Middle image
              if (isBride) {
                marginClass = "-mb-8"; // Higher
              } else {
                marginClass = "mb-8"; // Lower
              }
            }

            const globalImageIndex = allImages.findIndex((img) => img === src);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index + 0.8 }}
                viewport={{ once: true }}
                className={`${heightClass} ${marginClass} w-28 sm:w-32 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
                onClick={() => onImageClick(globalImageIndex)}
              >
                <img
                  src={src}
                  alt={`${name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
