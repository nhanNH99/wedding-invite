"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set wedding date - 11/11/2025
  const weddingDate = new Date("2025-11-11T11:30:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="mt-12 mb-16 px-4 sm:px-6">
      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-right mb-6 pr-4 sm:pr-8"
      >
        <h2
          className="windsong text-4xl sm:text-5xl md:text-6xl text-gray-600 italic"
          style={{ color: "#DAA520" }}
        >
          Wedding Countdown
        </h2>
      </motion.div>

      {/* Countdown boxes */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center gap-3 sm:gap-6 max-w-lg mx-auto"
      >
        <CountdownBox value={timeLeft.days} label="Ngày" />
        <HeartSeparator />
        <CountdownBox value={timeLeft.hours} label="Giờ" />
        <HeartSeparator />
        <CountdownBox value={timeLeft.minutes} label="Phút" />
        <HeartSeparator />
        <CountdownBox value={timeLeft.seconds} label="Giây" />
      </motion.div>

      {/* Until text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-4 pl-4 sm:pl-8"
      >
        <p className="source-serif-4-bold text-base sm:text-lg md:text-xl text-gray-700 font-bold">
          Until we officially become Mr. & Mrs.
        </p>
      </motion.div>
    </section>
  );
}

function CountdownBox({ value, label }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center group"
    >
      {/* Number box */}
      <div className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl min-w-[65px] sm:min-w-[85px] md:min-w-[100px] border border-gray-600/20 group-hover:shadow-gray-500/50 transition-all duration-300 group-hover:scale-105">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Number */}
        <div className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-none tabular-nums">
          {String(value).padStart(2, "0")}
        </div>

        {/* Corner decoration */}
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
      </div>

      {/* Label */}
      <div className="mt-2 text-xs sm:text-sm text-gray-700 font-semibold uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

function HeartSeparator() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex items-center justify-center"
    >
      <div className="text-gray-400 text-lg sm:text-xl">♡</div>
    </motion.div>
  );
}
