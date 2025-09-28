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
        address="456 Đường DEF, Quận UVW, TP.HCM"
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
        address="123 Đường ABC, Quận XYZ, TP.HCM"
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
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(googleMapsUrl, "_blank");
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
        {/* 3 cột layout - responsive */}
        <div className="grid grid-cols-4 gap-1 md:gap-2 mb-4">
          {/* Cột 1: Giờ và Thứ - Căn phải + Border phải */}
          <div className="text-right col-start-1 col-end-1 pr-2 md:pr-3 border-r-2 border-gray-300">
            <p className="source-serif-4-normal text-xs text-gray-600 leading-tight">
              {time.replace("VÀO LÚC ", "")}
            </p>
            <p className="source-serif-4-normal text-xs text-gray-600 leading-tight mt-1">
              {day}
            </p>
          </div>

          {/* Cột 2: Ngày và ngày âm lịch - Center */}
          <div className="text-center px-1 md:px-2 col-span-2 col-start-2">
            <p className="source-serif-4-bold text-2xl md:text-3xl text-gray-800 leading-tight">
              {date}
            </p>
            <p className="source-serif-4-normal text-xs text-gray-500 leading-tight">
              {lunar}
            </p>
          </div>

          {/* Cột 3: Địa chỉ - Căn trái + Border trái */}
          <div className=" col-start-4 col-end-4 text-left pl-2 md:pl-3 border-l-2 border-gray-300">
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
  // Tháng 10/2025 bắt đầu từ thứ 4
  const firstDayOfMonth = 6; // 0 = Chủ nhật, 1 = Thứ 2, 2 = Thứ 3...
  const daysInMonth = 30;
  const emptyDays = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="max-w-xs mx-auto">
      <div className="grid grid-cols-7 gap-2 text-sm font-medium">
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
          const isWeddingDay = day === 8;
          return (
            <div key={day} className="relative flex justify-center">
              <div
                className={`h-8 w-8 flex items-center justify-center text-sm ${
                  isWeddingDay
                    ? "text-red-500 font-bold relative"
                    : "text-gray-700"
                }`}
              >
                {day}
                {isWeddingDay && (
                  <>
                    <div className="absolute inset-0 border-2 border-red-500 rounded-full"></div>
                    <span className="absolute -bottom-6 text-red-500 text-lg">
                      ♥
                    </span>
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
