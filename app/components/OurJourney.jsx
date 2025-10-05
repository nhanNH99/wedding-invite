"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "./Lightbox";

export default function OurJourney() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const journeyData = [
    {
      date: "07.05.2022",
      title: "Lần đầu gặp nhau",
      description:
        "Ngày ấy, giữa muôn vàn con người chúng ta chạm mặt nhau như một sự sắp đặt của định mệnh. Ánh mắt đầu tiên đã mở ra câu chuyện dài đầy yêu thương.",
      image: "/hero1.jpg",
    },
    {
      date: "20.10.2022",
      title: "Hẹn hò",
      description:
        "Những buổi hẹn nhẹ nhàng, tiếng cười, những lần nắm tay... đã viết nên từng trang kỷ niệm. Tình yêu lớn dần theo năm tháng và chúng ta biết rằng mình thuộc về nhau.",
      image: "/hero1.jpg",
    },
    {
      date: "11.11.2025",
      title: "Lễ thành hôn",
      description:
        "Sau hành trình đầy yêu thương hôm nay chúng ta chính thực gọi nhau là vợ chồng. Ngày vui này là khởi đầu cho một chặng đường mới, cùng nhau xây đắp hạnh phúc.",
      image: "/hero1.jpg",
    },
  ];

  const allImages = journeyData.map((item) => item.image);

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
    <section className="mt-12 mb-16">
      {/* Header với background xám full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="bg-gray-700 py-8 text-center text-white mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 shadow-lg"
      >
        {/* CHẶNG ĐƯỜNG - line 1, to hơn */}
        <h2 className="playfair-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase mb-2">
          CHẶNG ĐƯỜNG
        </h2>
        {/* của chúng tôi - line 2, nhỏ hơn */}
        <p className="playfair-display text-lg sm:text-xl md:text-2xl tracking-[0.15em] opacity-90">
          của chúng tôi
        </p>
      </motion.div>

      {/* Journey Items */}
      <div className="sm:px-6 max-w-4xl mx-auto space-y-12">
        {journeyData.map((item, index) => (
          <JourneyItem
            key={index}
            {...item}
            index={index}
            isLeft={index % 2 === 0}
            onImageClick={() => openLightbox(index)}
          />
        ))}
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

function JourneyItem({
  date,
  title,
  description,
  image,
  index,
  isLeft,
  onImageClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Zig-zag Layout - Text và Image xen kẽ trái phải */}
      <div className="flex flex-row items-center relative">
        {isLeft ? (
          // Pattern: Text (trái) | Image (phải)
          <>
            {/* Text Block - Left */}
            <div className="flex-1 w-2/3 flex items-center">
              <div className="text-justify w-full pe-8 sm:pe-8 relative">
                <div
                  className="absolute top-0 bottom-0 left-0 -mx-4 sm:-mx-6 right-1/3 w-full h-full"
                  style={{ backgroundColor: "oklch(0.81 0.04 260.08)" }}
                ></div>
                <div className="text-justify relative z-10">
                  {/* Date - chữ nhỏ, màu xám */}
                  <p className="text-sm sm:text-sm text-gray-500 font-sans mb-1 font-medium underline underline-offset-3">
                    {date}
                  </p>
                  {/* Title - to hơn, bold */}
                  <h3 className="text-sm sm:text-lg font-bold text-gray-800 font-sans mb-2">
                    {title}
                  </h3>

                  {/* Description - văn bản thoáng */}
                  <p className="text-xs sm:text-base text-gray-700 font-sans leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Block - Right */}
            <div className="flex-shrink-0 w-1/3 flex justify-center justify-end sm:justify-start relative z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-35 h-47 sm:w-56 sm:h-72 overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={onImageClick}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          // Pattern: Image (trái) | Text (phải)
          <>
            {/* Image Block - Left */}
            <div className="flex-shrink-0 w-1/3 flex justify-center sm:justify-end relative z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-35 h-47 sm:w-56 sm:h-72 overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={onImageClick}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Text Block - Right */}
            <div className="flex-1 w-2/3 flex items-center">
              <div className="text-left sm:text-right w-full ps-4 sm:ps-6 relative">
                <div
                  className="absolute top-0 bottom-0 -mx-2 sm:-mx-6 w-full h-full"
                  style={{ backgroundColor: "oklch(0.81 0.04 260.08)" }}
                ></div>
                <div className="text-justify relative z-10">
                  {/* Date - chữ nhỏ, màu xám */}
                  <p className="text-sm sm:text-sm text-gray-500 font-sans mb-1 font-medium underline underline-offset-3">
                    {date}
                  </p>
                  {/* Title - to hơn, bold */}
                  <h3 className="text-sm sm:text-lg font-bold text-gray-800 font-sans mb-2">
                    {title}
                  </h3>

                  {/* Description - văn bản thoáng */}
                  <p className="text-xs sm:text-base text-gray-700 font-sans leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
