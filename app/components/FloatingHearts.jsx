"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Tạo tim mới mỗi 1-2 giây (tăng tần suất)
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        // Vị trí ngẫu nhiên từ trái sang phải
        left: Math.random() * 100,
        // Kích thước ngẫu nhiên
        size: 20 + Math.random() * 30,
        // Độ mờ ngẫu nhiên
        opacity: 0.3 + Math.random() * 0.4,
        // Thời gian bay ngẫu nhiên
        duration: 5 + Math.random() * 5,
        // Độ xoay ngẫu nhiên
        rotation: -20 + Math.random() * 40,
        // Màu ngẫu nhiên (đỏ, hồng)
        color: Math.random() > 0.5 ? "#ff6b9d" : "#ff1744",
      };

      setHearts((prev) => [...prev, newHeart]);

      // Xóa tim sau khi animation kết thúc
      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, (newHeart.duration + 1) * 1000);
    }, 1000 + Math.random() * 1000); // Random 1-2 giây (tăng từ 2-4 giây)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              bottom: -50,
              left: `${heart.left}%`,
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              bottom: "110%",
              opacity: [0, heart.opacity, heart.opacity, 0],
              scale: [0, 1, 1, 0.8],
              rotate: heart.rotation,
              x: [0, -30, 30, 0, -20, 20, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: heart.duration,
              ease: "easeOut",
              x: {
                duration: heart.duration,
                repeat: 0,
                ease: "easeInOut",
              },
            }}
            style={{
              position: "absolute",
              fontSize: `${heart.size}px`,
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill={heart.color}
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
