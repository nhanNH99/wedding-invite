"use client";
import { motion } from "framer-motion";

export default function Timeline() {
  const timelineData = [
    { time: "11:00", title: "Đón khách", image: "/invite.png", side: "left" },
    { time: "11:30", title: "Lễ cưới", image: "/rings.png", side: "right" },
    { time: "12:00", title: "Tiệc rượu", image: "/wine.png", side: "left" },
    { time: "13:00", title: "Chụp ảnh", image: "/photo.png", side: "right" },
  ];

  return (
    <section className="mt-16 mb-8 px-4 sm:px-6">
      {/* Title - elegant style with overlapping fonts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          {/* TIMELINE - typewriter style - larger */}
          <h2 className="source-serif-4-bold text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase text-gray-600 mb-2">
            TIMELINE
          </h2>
          {/* Wedding - handwritten style overlapping at 60% from top */}
          <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="windsong text-3xl sm:text-4xl md:text-5xl font-normal italic"
              style={{ color: "#DAA520" }}
            >
              Wedding
            </span>
          </div>
        </div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4"></div>
      </motion.div>

      <div className="relative max-w-md mx-auto">
        {/* Line dọc giữa - solid line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300"
        />

        {/* Items */}
        <div className="relative py-8">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ time, title, image, side, index }) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative flex items-center mb-16 last:mb-0"
    >
      {/* Layout: Time --- Image --- Title hoặc Title --- Image --- Time */}
      {isLeft ? (
        <>
          {/* Time bên trái */}
          <div className="flex-1 flex justify-end pr-6 sm:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <div className="text-lg sm:text-xl font-bold text-gray-700">
                {time}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {title}
              </div>
            </motion.div>
          </div>

          {/* Đường nối nét đứt và Icon */}
          <div className="relative flex items-center">
            {/* Đường nét đứt từ timeline ra icon */}
            <div className="w-8 sm:w-12 border-t-2 border-dashed border-gray-300"></div>

            {/* Icon với background tròn */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15 + 0.4,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-gray-300 shadow-lg flex items-center justify-center z-10"
            >
              <img
                src={image}
                alt={title}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </motion.div>
          </div>

          {/* Phần phải trống */}
          <div className="flex-1 pl-6 sm:pl-8"></div>
        </>
      ) : (
        <>
          {/* Phần trái trống */}
          <div className="flex-1 pr-6 sm:pr-8"></div>

          {/* Đường nối nét đứt và Icon */}
          <div className="relative flex items-center flex-row-reverse">
            {/* Đường nét đứt từ timeline ra icon */}
            <div className="w-8 sm:w-12 border-t-2 border-dashed border-gray-300"></div>

            {/* Icon với background tròn */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15 + 0.4,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-gray-300 shadow-lg flex items-center justify-center z-10"
            >
              <img
                src={image}
                alt={title}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </motion.div>
          </div>

          {/* Title bên phải */}
          <div className="flex-1 flex justify-start pl-6 sm:pl-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="text-lg sm:text-xl font-bold text-gray-700">
                {time}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {title}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
