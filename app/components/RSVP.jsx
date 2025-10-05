"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    attendance: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Chỉ cho phép nhập số cho phone
    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên của bạn");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: Thay YOUR_GOOGLE_SCRIPT_URL bằng URL của Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzD2IcOK6nb6dxpVrKUEbK8cH_bTTsPWy4ecFUrheiwFtes6dh43KEpOfoZ8ttN2cPNww/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
            attendance: formData.attendance,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      // Reset form
      setFormData({
        name: "",
        phone: "",
        message: "",
        attendance: "",
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12 mb-16 -mx-4 sm:-mx-6 px-4 sm:px-6 py-12 sm:py-16 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          {/* Title */}
          <h2 className="playfair-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Bạn sẽ đến chứ?
          </h2>

          {/* Description */}
          <div className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto space-y-3">
            <p>
              Đám cưới của chúng tôi sẽ trọn vẹn hơn khi có thêm lời chúc phúc
              và sự hiện diện của bạn.
            </p>
            <p>
              Xin hãy xác nhận sự có mặt của mình để chúng tôi đón tiếp bạn một
              cách chu đáo nhất nhé!
            </p>
            <p className="font-semibold text-gray-800 mt-4">Trân trọng!</p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200"
          >
            {/* Tên của Quý khách - Required */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
              >
                Tên của Quý khách <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên của bạn"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300 text-gray-800"
              />
            </div>

            {/* Số điện thoại - Only numbers */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                pattern="[0-9]*"
                inputMode="numeric"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300 text-gray-800"
              />
            </div>

            {/* Gửi những lời chúc tốt đẹp */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
              >
                Gửi những lời chúc tốt đẹp
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Viết lời chúc của bạn..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300 resize-none text-gray-800"
              ></textarea>
            </div>

            {/* Quý khách sẽ tham dự chứ? - Dropdown */}
            <div className="mb-8">
              <label
                htmlFor="attendance"
                className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
              >
                Quý khách sẽ tham dự chứ?
              </label>
              <select
                id="attendance"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300 text-gray-800 bg-white cursor-pointer"
              >
                <option value="">-- Vui lòng chọn --</option>
                <option value="yes">✓ Tôi sẽ đến</option>
                <option value="no">✗ Rất tiếc, tôi không thể đến</option>
                <option value="maybe">? Tôi chưa chắc chắn</option>
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full py-4 rounded-lg font-bold text-white text-base sm:text-lg transition-all duration-300 shadow-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang gửi...
                </span>
              ) : (
                "Gửi lời chúc"
              )}
            </motion.button>

            {/* Success/Error Message */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
              >
                ✓ Cảm ơn bạn! Lời chúc của bạn đã được gửi thành công.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
              >
                ✗ Có lỗi xảy ra. Vui lòng thử lại sau.
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Note about Google Sheets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-xs sm:text-sm text-gray-500"
        >
          <p>
            Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích tổ
            chức đám cưới.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
