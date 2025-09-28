"use client";

import { motion } from "framer-motion";

export default function NameSection() {
  return (
    <section className=" text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center"
      >
        <img
          src="/ornament.png"
          alt="Wedding Ornament"
          className="max-w-xs md:max-w-md"
        />
      </motion.div>

      {/* Names */}
      <motion.h3
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className=" source-serif-4-normal text-xl md:text-3xl font-bold uppercase"
      >
        NGÔ HIỀN NHÂN
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="windsong text-2xl md:text-3xl italic"
      >
        and
      </motion.p>

      <motion.h3
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="source-serif-4-normal text-xl md:text-3xl font-bold uppercase"
      >
        NGUYỄN THỊ HỒNG PHÚC
      </motion.h3>

      {/* Invitation text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <p className="mt-3 source-serif-4-normal uppercase text-sm md:text-3xl text-[var(--muted)]">
          Trân trọng kính mời
        </p>
        <p className="windsong text-4xl md:text-5xl text-[var(--muted)]">
          Quý khách
        </p>
        <p className="mt-3 source-serif-4-normal text-sm md:text-2xl text-[var(--muted)] uppercase">
          Đến dự lễ thành hôn của gia đình chúng tôi!
        </p>
      </motion.div>
    </section>
  );
}
