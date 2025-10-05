"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const PHOTOS = ["/hero1.jpg", "/hero1.jpg", "/hero1.jpg"];
  const NUMBERS = ["11", "11", "25"]; // ngày / tháng / năm

  return (
    <section className="relative pt-10 text-center -mx-4 sm:-mx-6 px-4 sm:px-6">
      {/* Background gradient - từ top đến 50% */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-200 via-gray-100 to-transparent pointer-events-none -z-10"></div>

      {/* Ảnh + số */}
      <div className="grid grid-cols-3 gap-2">
        {PHOTOS.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: i * 0.5 }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg shadow"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            {/* số hiển thị ở dưới ảnh */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.5 }}
              className="absolute bottom-2 left-0 right-0 flex justify-center"
            >
              <span className="font-serif text-white text-4xl md:text-5xl font-bold tracking-widest drop-shadow-lg">
                {NUMBERS[i]}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* SAVE THE DATE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-6"
      >
        <p className="font-serif text-base md:text-lg tracking-[0.1em] uppercase">
          <span className="text-1xl md:text-2xl">SAVE|</span>
          <span className="mx-2 text-2xl md:text-3xl">THE</span>
          <span className="text-1xl md:text-2xl">|Date</span>
        </p>
        <img
          src="/ring.png"
          alt="ring"
          className="mx-auto "
          style={{ width: "35%" }}
        />
      </motion.div>
    </section>
  );
}
