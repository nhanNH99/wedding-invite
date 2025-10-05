"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ThankYou() {
  return (
    <section className="mt-12 -mx-4 sm:-mx-6">
      {/* Image Container with Text Overlay */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/thank-you.jpg"
          alt="Hiền Nhân & Hồng Phúc"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Animated Text Content - positioned at 20% from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-x-0 bottom-[20%] px-6 sm:px-8 text-center z-10"
        >
          {/* Names */}
          <h2 className="playfair-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Hiền Nhân & Hồng Phúc
          </h2>

          {/* Thank You Message */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-light tracking-wide drop-shadow-md">
            Cảm ơn bạn đã chúc phúc cho chúng tôi!
          </p>

          {/* Optional Decorative Element */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="h-[2px] bg-white/80 mx-auto mt-6 sm:mt-8"
          />
        </motion.div>
      </div>
    </section>
  );
}
