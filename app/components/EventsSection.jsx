"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function EventsSection() {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <section className="mt-10 text-center">
      {/* Event nhà gái */}
      <EventItem
        title="TIỆC CƯỚI NHÀ GÁI"
        time="11 GIỜ 00"
        date="08.11.2025"
        day="THỨ BẢY"
        lunar="(19 Tháng 09 Ất Tỵ)"
        place="NHÀ HÀNG WHITE SWANT 2"
        address="https://maps.app.goo.gl/wp2LjhxyhnJ8GZQm8"
        onShowQR={() => setShowQRModal(true)}
      />

      {/* Event nhà trai */}
      <EventItem
        title="TIỆC CƯỚI NHÀ TRAI"
        time="10 GIỜ 45"
        date="11.11.2025"
        day="THỨ BA"
        lunar="(22 Tháng 09 Ất Tỵ)"
        place="TƯ GIA NHÀ TRAI"
        address="https://maps.app.goo.gl/5LEKna5vPqqkBbyj7"
        onShowQR={() => setShowQRModal(true)}
      />

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-12"
      >
        <h4 className="source-serif-4-bold text-lg mb-6 text-gray-800">
          Tháng 11 - 2025
        </h4>
        <Calendar />
      </motion.div>

      {/* QR Modal */}
      {showQRModal && <QRModal onClose={() => setShowQRModal(false)} />}
    </section>
  );
}

function EventItem({
  title,
  time,
  date,
  day,
  lunar,
  place,
  address,
  onShowQR,
}) {
  const openGoogleMaps = () => {
    window.open(address, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mb-12 max-w-md mx-auto"
    >
      {/* Title ở giữa */}
      <h5 className="source-serif-4-bold text-base uppercase mb-4 text-gray-800 tracking-wide text-center">
        {title}
      </h5>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        {/* 3 cột layout - cột giữa lớn hơn */}
        <div className="grid grid-cols-5 gap-1 md:gap-2 mb-4">
          {/* Cột 1: Giờ và Thứ - Căn phải + Border phải (1/5) */}
          <div className="col-span-1 text-right pr-2 md:pr-3 border-r-2 border-gray-300">
            <p className="source-serif-4-normal text-xs text-gray-600 leading-tight">
              {time}
            </p>
            <p className="source-serif-4-normal text-xs text-gray-600 leading-tight mt-1">
              {day}
            </p>
          </div>

          {/* Cột 2: Ngày và ngày âm lịch - Center (3/5) */}
          <div className="col-span-3 text-center px-1 md:px-2">
            <p className="source-serif-4-bold text-2xl md:text-3xl text-gray-800 leading-tight">
              {date}
            </p>
            <p className="source-serif-4-normal text-xs text-gray-500 leading-tight">
              {lunar}
            </p>
          </div>

          {/* Cột 3: Địa chỉ - Căn trái + Border trái (1/5) */}
          <div className="col-span-1 text-left pl-2 md:pl-3 border-l-2 border-gray-300">
            <p className="source-serif-4-bold text-xs text-gray-800 leading-tight">
              {place}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onShowQR}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          >
            Mừng cưới
          </button>
          <button
            onClick={openGoogleMaps}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          >
            Xem chỉ đường
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Calendar() {
  // Tháng 11/2025 bắt đầu từ thứ 6 (ngày 1 là thứ 6)
  const firstDayOfMonth = 5; // 0 = Chủ nhật, 1 = Thứ 2, 2 = Thứ 3... 5 = Thứ 6
  const daysInMonth = 30;
  const emptyDays = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="max-w-xs mx-auto relative">
      {/* Background watercolor */}
      <div
        className="absolute inset-0 -m-4 opacity-20"
        style={{
          backgroundImage: "url(/watercolor-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "1rem",
        }}
      />

      {/* Calendar content */}
      <div className="grid grid-cols-7 gap-2 text-sm font-medium relative z-10">
        {/* Header */}
        {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"].map(
          (day) => (
            <div key={day} className="text-center text-gray-600 text-xs py-2">
              {day}
            </div>
          )
        )}

        {/* Empty cells for days before month starts */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-8 w-8"></div>
        ))}

        {/* Days */}
        {days.map((day) => {
          const isWeddingDay = day === 8 || day === 11; // Ngày 8 (nhà gái) và ngày 11 (nhà trai)
          return (
            <div key={day} className="relative flex justify-center">
              <div
                className={`h-8 w-8 flex items-center justify-center text-sm ${
                  isWeddingDay
                    ? "text-red-500 font-bold relative z-10"
                    : "text-gray-700"
                }`}
              >
                {day}
                {isWeddingDay && (
                  <>
                    {/* Heart Image Animation - dịch chuyển lên trên */}
                    <div
                      className="absolute w-12 h-12 -top-4 -left-2 flex items-center justify-center opacity-0"
                      style={{
                        animation: "heartImageAppear 1s ease-in-out forwards",
                        animationDelay: "1s",
                      }}
                    >
                      <img
                        src="/heart.png"
                        alt="Heart"
                        className="w-10 h-10 object-contain"
                        style={{
                          filter:
                            "drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QRModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-2xl border relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          ×
        </button>

        <div className="text-center">
          <h3 className="source-serif-4-bold text-lg mb-4 text-gray-800">
            Mừng cưới cho cô dâu chú rể
          </h3>

          {/* QR Code - sử dụng placeholder nếu không có ảnh */}
          <div className="mb-4">
            <div className="w-48 h-48 mx-auto border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
              <span className="text-gray-400 text-sm text-center">
                QR Code
                <br />
                Ngân hàng
                <br />
                <span className="text-xs">(Thay bằng ảnh QR thật)</span>
              </span>
            </div>
            {/* Uncomment khi có ảnh QR thật */}
            {/* <img 
              src="/qr-code.png" 
              alt="QR Code Banking" 
              className="w-48 h-48 mx-auto border border-gray-200 rounded-lg"
            /> */}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-1">
              <strong>Ngân hàng:</strong> Vietcombank
            </p>
            <p className="mb-1">
              <strong>Số TK:</strong> 1234567890
            </p>
            <p className="mb-1">
              <strong>Chủ TK:</strong> NGUYEN VAN A
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Quét mã QR để chuyển khoản mừng cưới
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
}
